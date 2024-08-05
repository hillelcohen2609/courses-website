import axios from "axios";
import { PATH } from "../../constant";

export async function getAllCategories(){
   return await (await axios.get(`${PATH}/category/getCategory`)).data;
}