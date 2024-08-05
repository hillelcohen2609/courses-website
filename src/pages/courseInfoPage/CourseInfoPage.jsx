import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCourseById, getCourseById } from "../../api/coursesController/courses";
import { Button, Stack, Typography } from "@mui/material";
import { UserContext } from "../../context/Context";

/**
 * 
 * {
  "id": 4,
  "name": "Health and Wellness",
  "description": "Courses related to health and wellness",
  "price": 120.0,
  "lecturer": {
    "id": 3,
    "name": "Emily Johnson",
    "address": "789 Oak St, Villagetown",
    "phone": "555-9101",
    "subject": "Health Science",
    "yearsOfExperience": 5
  },
  "category": {
    "id": 3,
    "name": "Health",
    "description": "Courses related to health and wellness"
  }
}
 */

export default function CourseInfoPage() {
    const [courseInfo,setCourseInfo] = useState();

    const {userId  , isAdmin  } = useContext(UserContext);

    const navigate = useNavigate();

    const location = useLocation();
    const {id} = location.state || {};

    useEffect(()=>{
        getCourseById(id).then(res=>setCourseInfo(res))
    },[])

    console.log(courseInfo);
  return (
    <>{
        courseInfo&&(
            <Stack width={"70%"} margin={"auto"} sx={{backgroundColor:"white",borderRadius:"8px"}} padding={"2rem"}>
        <Typography variant="h3" sx={{color:"black"}} textAlign={"center"}>{courseInfo.name}</Typography>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
            <Stack spacing={1}>
            <Typography variant="h5" sx={{color:"black"}}>{courseInfo.description}</Typography>
            <Typography marginTop={"5vh"} variant="h5" fontWeight={"bold"} sx={{color:"black"}}>lecturer details:</Typography>
            <Typography variant="h5" sx={{color:"black"}}>name: {courseInfo.lecturer.name}</Typography>
            <Typography variant="h5" sx={{color:"black"}}>adress: {courseInfo.lecturer.address}</Typography>
            <Typography variant="h5" sx={{color:"black"}}>phone: {courseInfo.lecturer.phone}</Typography>
            <Typography variant="h5" sx={{color:"black"}}>subject: {courseInfo.lecturer.subject}</Typography>
            <Typography variant="h5" sx={{color:"black"}}>experience: {courseInfo.lecturer.subject} yearsOfExperience</Typography>
       
            </Stack>
            <Stack>
                <img height={"350px"}  src="https://images.pexels.com/photos/2770371/pexels-photo-2770371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            </Stack>
         </Stack>
         {
            isAdmin&&
            <Button sx={{margin:"auto"}} variant="contained" onClick={()=>{
                deleteCourseById(courseInfo.id);
                navigate("/courses");
                
            }}>delete course</Button>
         }

    </Stack>
        )
    }
    </>
  )
}
