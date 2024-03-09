import axios from "axios";
import {CREATETASK, LOGIN, REGISTER} from "./apiConstants";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};

export const signUp = async (data) => {
  return axios.post(REGISTER, data);
};

export const createTask = async (data) => {
  return axios.post(CREATETASK, data);
};
