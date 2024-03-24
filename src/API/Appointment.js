import axios from "axios";

// Randevu verilerini çekme işlemi
export const getAppointment = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/appointments");
    return data;
};

// Randevu silme işlemi
export const deleteAppointment = async (id) => {
    const { data } = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL +   `/api/v1/appointments/${id}`);
    return data;
};

// Yeni randevu oluşturma işlemi
export const createAppointment = async (appointment) => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/appointments", appointment);
    return data;
};

// Randevu güncelleme işlemi
export const updateAppointment = async (appointment) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/appointments/${appointment.id}`, appointment);
    return data;
};

// Doktor bilgilerini çekme işlemi
export const getDoctor = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors");
    return data;
};

// Hayvan bilgilerini çekme işlemi
export const getAnimals = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals");
    return data;
};

