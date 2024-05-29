import { useAuthStore } from "@/stores";
import axios from "axios";
import { router } from "@/router";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    const auth = useAuthStore();
    config.headers.token = auth.token;
    config.headers.Authorization = `Bearer ${auth.token}`;
    return config;
  },
  function (error) {
    console.error("request", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    switch (error.response.status) {
      case 401: {
        const authStore = useAuthStore();
        const originalRequest = error.config;

        if (error.response.data.result === "TOKEN_EXPIRED") {
          if (!authStore.refreshingToken) {
            authStore.refreshingToken = true;

            try {
              const refreshedToken = await authStore.refreshToken();
              originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;

              // Retry the original request with the new token
              return axios(originalRequest);
            } catch (err) {
              console.error("Failed to refresh token:", err);
              authStore.logout(); // Log out the user if token refresh fails
              router.push({ name: "login" }); // Redirect to the login page
              return Promise.reject(err);
            } finally {
              authStore.refreshingToken = false;
            }
          } else {
            // Wait for the token to be refreshed and then retry the original request
            try {
              await new Promise((resolve) => {
                const interceptors = axios.interceptors.response.use(
                  function (response) {
                    // Remove the interceptor to prevent multiple calls
                    axios.interceptors.response.eject(interceptors);
                    resolve(response);
                    return response;
                  },
                  function (err) {
                    // reject(err);
                    return Promise.reject(err);
                  }
                );

                authStore.refreshTokenQueue.push(interceptors);
              });
              return axios(originalRequest);
            } catch (err) {
              return Promise.reject(err);
            }
          }
        } else if (error.response.data.result === "UNAUTHORIZED") {
          // Handle UNAUTHORIZED error
          // authStore.logout();
          authStore.deleteToken();
          router.push({ name: "login" }); // Redirect to the login page
        }
        break;
      }
      case 403: {
        router.push({ name: "accessDenied" });
        break;
      }
      case 404: {
        router.push({ name: "notfound" });
        break;
      }
      case 500: {
        router.push({ name: "error" });
        break;
      }
      default: {
        break;
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
