import axios from "axios";

export const getDoctor = async () => {
    const {data} =await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors");
    return data;
};

export const deleteDoctor = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/doctors/${id}`);
    return data;
};

export const createDoctor = async (doctor) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/doctors` , doctor);
    return data;
}

export const updateDoctorFunc = async (doctor) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/doctors/${doctor.id}`, doctor);
    return data;
};

