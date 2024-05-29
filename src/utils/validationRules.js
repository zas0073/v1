export const usernameRules = [
  (v) => !!v || "Username is required",
  (v) => (v && v.length >= 3) || "Username must be at least 3 characters",
];

export const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
];
