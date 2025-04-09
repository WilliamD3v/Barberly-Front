import axios from "axios";

/* https://barberly-back.vercel.app */
/* http://localhost:5000/ */
const URL = "http://localhost:5000/";

export default axios.create({
  baseURL: URL,
});
