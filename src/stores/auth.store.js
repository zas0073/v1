// store.js
import { defineStore } from "pinia";
// import axios from "@/service/axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    menu: [
      {
        title: "",
        type: "folder",
        children: [
          {
            title: "화면정보관리",
            type: "menu",
            to: "manage-screen-info",
          },
          {
            title: "메뉴구조관리",
            type: "menu",
            to: "menu-structure-management",
          },
          {
            title: "권한관리",
            type: "menu",
            to: "role-management",
          },
          {
            title: "공통코드",
            type: "menu",
            to: "common-code",
          },
          {
            title: "화면1",
            type: "menu",
            to: "stock-efriend",
          },
          {
            title: "화면2",
            type: "menu",
            to: "coin-upbit",
          },
        ],
      },
    ],
    isAuthenticated: false,
    userId: JSON.parse(localStorage.getItem("userId")),
    returnUrl: null,
    token: JSON.parse(localStorage.getItem("token")),
    refreshingToken: false,
    refreshTokenQueue: [],
  }),
  actions: {
    setSideMenu(menu) {
      this.sideMenu = menu;
    },
    async login(param) {
      try {
        const token = await axios.post("/login", JSON.stringify(param), {
          headers: {
            "Content-Type": `application/json;charset=utf-8`,
          },
        });

        if (token.status === 200) {
          this.isAuthenticated = true;
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token.data.obj}`;

          if (param.rememberId) {
            localStorage.setItem("userId", JSON.stringify(param.id));
          } else {
            localStorage.removeItem("userId");
            this.userId = null;
          }
        }

        this.token = token.data.obj;
        return token;
      } catch (err) {
        this.isAuthenticated = false;
        throw err;
      }
    },

    async logout() {
      try {
        return await axios.post("/do-logout", {
          headers: {
            "Content-Type": `application/json;charset=utf-8`,
          },
        });
      } catch (err) {
        throw err;
      }
    },

    async signUp(param) {
      try {
        return await axios.post("/register", JSON.stringify(param));
      } catch (err) {
        throw err;
      }
    },

    async refreshToken() {
      try {
        const token = await axios.post("/login/refresh");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.data.obj}`;

        this.token = token.data.obj;
        return token;
      } catch (err) {
        throw err;
      }
    },

    async deleteToken() {
      this.token = null;
      this.isAuthenticated = false;
    },
  },
  persist: {
    storage: localStorage,
    paths: ["token", "userId", "isAuthenticated", "menu"],
  },
});
