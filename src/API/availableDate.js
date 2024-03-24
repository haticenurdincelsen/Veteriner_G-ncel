import axios from "axios";

export const getAvailableDate= async () => {
    const {data} = await axios.get (
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/available-dates");
    return data;
};

export const createAvailableDate = async (availableDate) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/available-dates` , availableDate);
    return data;
};

export const deleteAvailableDate= async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/available-dates/${id}`
    );
    return data;
}

export const updateAvailableDateFunc = async (availableDate) => {   
    const {data} =await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/api/v1/available-dates/${availableDate.id}`, availableDate);
    return data;
};

