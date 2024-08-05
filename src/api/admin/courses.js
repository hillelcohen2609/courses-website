import axios from "axios";
import { PATH } from "../../constant";

export async function getAllLecturer() {
  return await axios.get(`${PATH}/lecturer/getLecturer`);
}

export async function addANewCourse(newCourse) {
  console.log(newCourse);
  return await axios.post(`${PATH}/course/addCourse`, newCourse);
}
