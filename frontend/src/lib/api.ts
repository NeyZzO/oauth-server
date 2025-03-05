import {Axios} from "axios";

const axios = new Axios({
    baseURL: "http://localhost:3000/auth",
    withCredentials: true,
});

export default axios;