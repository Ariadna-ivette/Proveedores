import axios from "axios";

const ENDPOINT_PATH = "";

export default {
    register(email, password) {
        const user = {
            email,
            password
        };
        return axios.post(ENDPOINT_PATH + "register", user);
    }
};