import axios from "./axios";

const csrf = () => axios.get("/sanctum/csrf-cookie")

export default csrf