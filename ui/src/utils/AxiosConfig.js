/*eslint-disable */
import axios from "axios";
import { getToken } from "../utils/Auth";
let ip = "https://localhost:44362/api";

let httpClient = axios.create({
  baseURL: ip,
});

export default httpClient;
