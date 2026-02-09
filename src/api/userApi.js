import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // adjust if needed
});

// get users list
export const fetchUsers = (orgName) =>
  API.get("/management/users/", {
    params: { org_name: orgName },
  });

// signup user
export const signupUser = (payload) =>
  API.post("/management/signupUser/", payload);

// toggle admin
export const toggleAdmin = (userId, makeAdmin) =>
  API.patch(`/management/users/${userId}/role`, {
    role: makeAdmin ? "ADMIN" : "USER",
  });
