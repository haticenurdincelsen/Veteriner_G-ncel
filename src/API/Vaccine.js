// Vaccine.js
import axios from "axios";

export const getAllVaccines = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccines");
  return data;
};

export const createVaccine = async (vaccine) => {
  const { data } = await axios.post(
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccines", vaccine);
  return data;
};

export const updateVaccine = async (vaccine) => {
  const { data } = await axios.put(
    import.meta.env.VITE_APP_BASE_URL + `/api/v1/vaccines/${vaccine.id}`, vaccine);
  return data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete(
    import.meta.env.VITE_APP_BASE_URL + `/api/v1/vaccines/${id}`);
  return data;
};
