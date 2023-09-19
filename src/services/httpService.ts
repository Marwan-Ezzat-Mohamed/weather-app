import axios from "axios";

const httpService = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
};
export default httpService;
