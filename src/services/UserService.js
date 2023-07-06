// import axios from "axios"
import axios from "./customize-axios";

const featchAllUser = (page) =>{
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {name, job})
}

const putUpdateUser = (name, job, id) => {
    return axios.put(`/api/users/${id}`, {name, job})
}

const deleteUser = (id) => {
    return axios.delete (`/api/users/${id}`);
}

export { featchAllUser, postCreateUser, putUpdateUser, deleteUser } 