import axios from "axios";
import { PATH } from "../../constant";

export async function getAllCourses(){
    return (await axios.get(`${PATH}/course/getCourses`)).data;
}

export async function getCourseById(id){
    return (await axios.get(`${PATH}/course/getCourse/${id}`)).data;
}

export async function deleteCourseById(id){
    await axios.delete(`${PATH}/course/deleteCourse/${id}`);
}