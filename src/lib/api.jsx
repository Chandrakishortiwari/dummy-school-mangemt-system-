const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const getAuthToken = () => localStorage.getItem("authToken");

// makeRequest function
const makeRequest = async (endpoint, options = {}, skipJsonHeader = false) => {
  const token = getAuthToken();
  const headers = { ...(options.headers || {}) };
  
  if (!skipJsonHeader) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();s
};

// ===== API Export =====
export const api = {
  auth: {
    // Registration
    register: (data) => makeRequest("/auth/register", { method: "POST", body: JSON.stringify(data) }),

    // Login
    login: (data) => makeRequest("/auth/login", { method: "POST", body: JSON.stringify(data) }),

    // Get logged-in user profile
    // getProfile: () => makeRequest("/auth/profile"),

    // // Forget password
    // forgetPassword: (data) => makeRequest("/auth/forgetpassword", { method: "POST", body: JSON.stringify(data) }),

    // // Verify OTP
    // verifyOTP: (data) => makeRequest("/auth/verifyotp", { method: "POST", body: JSON.stringify(data) }),

    // // Reset password
    // resetPassword: (data) => makeRequest("/auth/changepassword", { method: "POST", body: JSON.stringify(data) }),
  },
   
};