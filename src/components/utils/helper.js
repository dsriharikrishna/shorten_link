// ✅ Get full user object from localStorage
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

// ✅ Get user's name (fallback to "User")
export const getUserName = () => {
  const user = getUser();
  return user?.name || "User";
};

// ✅ Get user ID
export const getUserId = () => {
  const user = getUser();
  return user?.id || null;
};

// ✅ Get user role
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

// ✅ Check if user has a specific role
export const hasRole = (role) => {
  const user = getUser();
  return user?.role === role;
};

// ✅ Check if user is logged in
export const isUserLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// ✅ Get token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("token") || null;
};

// ✅ Save user and token to localStorage
export const saveUserToStorage = ({ user, token }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

// ✅ Update user data in localStorage (e.g., after profile update)
export const updateStoredUser = (updatedUser) => {
  localStorage.setItem("user", JSON.stringify(updatedUser));
};

// ✅ Clear user and token (logout)
export const clearAuthData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
