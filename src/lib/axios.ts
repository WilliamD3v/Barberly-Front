import axios from "axios";

/* https://barberly-back.vercel.app */
/* http://localhost:5000/ */
const URL = "https://barberly-back.vercel.app/";

export default axios.create({
  baseURL: URL,
});
