import axios from "axios";
import { PATH } from "../../constant";

export async function getAllUsers() {
  try {
    const res = await axios.get(`${PATH}/users/getUsers`).then((res) => {
      if (res.data) {
        return res.data;
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(id) {
  return (await axios.delete(`${PATH}/users/deleteUsers/${id}`)).status;
}

export async function getUserById(id) {
  return (await axios.get(`${PATH}/users/getUsers/${id}`)).data;
}
