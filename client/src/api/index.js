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

export const getTherapistById = async (token, id) =>
  await API.get(`/therapist/gettherapistbyid${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const setTherapistForPatient = async (token, id) =>
  await API.post(
    `/therapist/settherapistforpatient${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
export const getMessages = (from, to) => API.get(`/messages/${from}/${to}`);

export const updateTherapistProfile = async (token, data) =>
  API.put("/therapist/updatetherapist", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTherapistByUserId = async (token) =>
  API.get(`/therapist/gettherapistbyuserid`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Document Management
export const uploadDocument = async (token, formData) =>
  API.post("/documents/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const getDocumentsByTherapist = async (token) =>
  API.get("/documents/self", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getDocumentsById = async (token, therapistId) =>
  API.get(`/documents/byId/${therapistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const downloadDocuments = async (token, therapistId) =>
  API.get(`/documents/download/${therapistId}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob", // Ensure the response is treated as a blob
  });

export const deleteDocument = async (token, documentId) =>
  API.delete(`/documents/${documentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const hasDocument = async (token, therapistId) =>
  API.get(`/documents/hasDocument/${therapistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllTreatmentCategories = async (token) =>
  API.get("/treatment-categories", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTreatmentsByCategory = async (token, categoryId) =>
  API.get(`/treatment/byCategory/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPatientsForTherapist = async (token) =>
  API.get("/therapist/patients", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTask = async (token, taskData) =>
  API.post("/therapistassignedtasks", taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });



export const getAssignedTasksForPatient = async (token) => {
  try {
    const response = await API.get('/therapistassignedtasks/patient', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Assuming the API returns an object with a `data` property
  } catch (error) {
    throw error; // Throw the error for the component to catch and handle
  }
};

export const updateDiagnosis = async (token, data) =>
  API.put("/patient/update-diagnosis", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const createAppointment = async (token, appointmentData) =>
    API.post("/appointment", appointmentData, {
      headers: { Authorization: `Bearer ${token}` },
    });