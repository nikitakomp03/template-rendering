import api from "./axios";

export const makeAdmin = (data) => {
  return api.post("/management/makeAdmin", data);
};

export const removeAdmin = (data) => {
  return api.post("/management/removeAdmin", data);
};
