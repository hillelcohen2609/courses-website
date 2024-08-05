/**
 * 
 * 
    "id": 1,
    "name": "Java Programming",
    "description": "Learn the basics of Java programming",
    "price": 100.0,
    "lecturer": {
      "id": 1,
      "name": "John Doe",
      "address": "123 Main St, Cityville",
      "phone": "555-1234",
      "subject": "Computer Science",
      "yearsOfExperience": 10
    },
    "category": {
      "id": 1,
      "name": "Technology",
      "description": "Courses related to technology and software development"
    }
 */

import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/coursesController/courses";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../api/coursesController/category";


export default function CoursePage() {
  const [courseList , setCourseList] = useState([]);
  const [category , setCategory] = useState([]);

  const navigate = useNavigate();

  const init = ()=>{
    getAllCourses().then(res=>setCourseList(res)).catch(err=>console.log(err));
    getAllCategories().then(res=>setCategory(res)).catch(err=>console.log(err));
  }

  useEffect(()=>{
   init();
  },[])

  const filterCat = (nid)=>{
    const newList = courseList.filter((item)=>item.category.id===nid);
    setCourseList(newList);

  }

  console.log(category);

  return (
    <Grid container spacing={1} padding={"1rem"}>
      <Grid item xs={12}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
      <Button variant="outlined" onClick={init} >נקה בחירה</Button>
      <Typography variant="h4" textAlign={"right"}>:סנן לפי</Typography>
      </Stack>
      </Grid>
      <Grid item xs={12} marginBottom={"2vh"}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        {
          category&&category.map((item)=>{
            return(
              <Button  variant="contained" key={item.id} onClick={()=>filterCat(item.id)}>{item.name}</Button>
            )
          })
        }
      </Stack>
      </Grid>
      {
        courseList.map((course)=>{
          return(
            <Grid key={course.id} item xs={3} >
              <Stack alignItems={"center"} sx={{backgroundColor:"white",padding:"1rem" ,borderRadius:"5px"}} textAlign={"center"} >
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS40NEm-WVgjpquWjwe3pFK3mHILzS7fzud-g&s" alt="computer image"/>
              <Typography marginTop={"2vh"} variant="h6" color={"black"}>{course.name}</Typography>
              <Typography>price: {course.price}$</Typography>
              <Button variant="contained" sx={{width:"70%" ,margin:"3vh 0"}} onClick={()=>{
                navigate("/course",{ state: { id:course.id } })
              }}>more details</Button>
              </Stack>
          </Grid>
          )

        })
      }
    </Grid>
  )
}
