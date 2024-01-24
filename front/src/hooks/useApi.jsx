import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

function getRequestHeaders(token = null, withBody = false) {
  return {
    "Content-Type": withBody ? "application/json" : undefined,
    Authorization: token != null ? `Bearer ${token}` : undefined,
  };
}

const apiClient = {
  get: function (url, token = null) {
    return axiosInstance.get(url, {
      headers: getRequestHeaders(token),
    });
  },
  post: function (url, data = null, token = null) {
    return axiosInstance.post(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  put: function (url, data = null, token = null) {
    return axiosInstance.put(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  patch: function (url, data = null, token = null) {
    return axiosInstance.patch(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  delete: function (url, token = null) {
    return axiosInstance.delete(url, {
      headers: getRequestHeaders(token),
    });
  },
};


export default function useApi() {
  const { user } = useAuth();
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [user]);

  function login(email, password) {
    return apiClient.post("auth/login", { email, password }, token);
  }

  function getLoggedInUser(id, accessToken = null) {
    return apiClient.get(`users/${id}`, accessToken ?? token);
  }

  function getUsers(selectedFilter, searchInput) {
    return apiClient.get(
      `users?skill=${selectedFilter ?? ""}&search=${searchInput ?? ""}`,
      token
    );
  }
  
  function getUsersOnly(selectedFilter, searchInput) {
    return apiClient.get(
      `users/users-only?skill=${selectedFilter ?? ""}&search=${
        searchInput ?? ""
      }`,
      token
    );
  }

  function getUser(id) {
    return apiClient.get(`users/${id}`, token);
  }

  
function addUser(userData) {
  return apiClient.post("auth/register", userData);  // Assurez-vous que l'URL est correcte
}

  function updatePassword(id, data) {
    return apiClient.patch(`users/updatePassword/${id}`, { ...data }, token);
  }

  function updateUser(id, data) {
    return apiClient.patch(`users/${id}`, { ...data }, token);
  }

  function deleteUser(id) {
    return apiClient.delete(`users/${id}`, token);
  }

  return {
    login,
    getLoggedInUser,
    getUsers,
    getUsersOnly,
    getUser,
    addUser,
    updateUser,
    updatePassword,
    deleteUser,
  };
}
