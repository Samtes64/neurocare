import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3003/api",
});

export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

export const getAllTreatments = async (token) =>
  API.get("/treatment/getalltreatments", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getDashboardDetails = async (token) =>
  API.get("/patient/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getDoneTasks = async (token, date) =>
  await API.get(`/patient/donetask${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addDoneTask = async (token, data) =>
  await API.post(`/tasks/adddonetask`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addPayment = async () => {
  await API.get("/payment/addpayment");
};

export const getAllTherapists = async (token) => {
  await API.get(`/therapist/getalltherapists`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
