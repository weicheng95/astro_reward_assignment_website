// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

export default () => axios.create({
  baseURL: "https://no5ywgxhsi.execute-api.ap-southeast-1.amazonaws.com/dev",
});
