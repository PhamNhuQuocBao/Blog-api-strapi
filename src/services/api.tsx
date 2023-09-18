import axios from "axios";
import { DataBlog } from "../components/Form";

const API = axios.create({
  baseURL: "http://localhost:1337/api",
});

const endpointBlog = "/blogs?populate=*";

export const getAllBlog = async () => {
  try {
    const res = await API.get(`${endpointBlog}`);

    if (res.status === 200) {
      console.log(res.data.data[3].attributes.image.data);
      
      return res.data;
    }
  } catch (err) {
    throw new Error(err as string);
  }
};

export const add = async (blog: DataBlog) => {
  try {
    const res = await API.post(`${endpointBlog}`, {
      data: blog,
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    throw new Error(err as string);
  }
};

export const update = async (id: number, blog: DataBlog) => {
  try {
    const res = await API.put(`${endpointBlog}/${id}`, { data: blog });

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    throw new Error(err as string);
  }
};

export const remove = async (id: number) => {
  try {
    const res = await API.delete(`${endpointBlog}/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    throw new Error(err as string);
  }
};
