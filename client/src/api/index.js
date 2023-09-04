import axios from "axios";
import { sleep } from "../utils";
export const axiosFetch = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});


export const uploadImage = async (formData) => {
  return axiosFetch.post("/", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const getImages = async (search = "") => {
  //  await sleep(8000)
  return axiosFetch("/" + `?search=${search}`);
};



export const deleteImage = async ({key, id}) => {  
  return axiosFetch.delete(`/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {key},
  });
};

