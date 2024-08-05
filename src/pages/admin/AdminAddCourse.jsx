import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addANewCourse, getAllLecturer } from "../../api/admin/courses";
import { getAllCategories } from "../../api/coursesController/category";
import { Add } from "@mui/icons-material";

export default function AdminAddCourse() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState(null);
  const [lecturer, setLecturer] = useState(null);

  const [lecturerList, setLecturerList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getAllLecturer().then((res) => {
      if (res.data) {
        setLecturerList(res.data);
      }
    });
    getAllCategories().then((res) => {
      if (res) {
        setCategoryList(res);
      }
    });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = categoryList.find(
      (category) => category.id === event.target.value
    );
    setCategory(selectedCategory);
  };

  const handleLecturerChange = (event) => {
    const selectedLecturer = lecturerList.find(
      (lecturer) => lecturer.id === event.target.value
    );
    setLecturer(selectedLecturer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      category,
      description,
      name,
      lecturer,
      price,
    };
    //console.log("Form Data Submitted:", formData);
    addANewCourse(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("הקורס נוסף בהצלחה👌");
        } else {
          alert("קרתה תקלה");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("קרתה תקלה");
      })
      .finally(() => {
        setCategory(null);
        setDescription("");
        setLecturer(null);
        setPrice("");
        setName("");
      });
  };

  return (
    <Stack
      width={"70%"}
      margin={"auto"}
      borderRadius={"7px"}
      bgcolor={"white"}
      padding={"5rem"}
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          margin="normal"
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Course Name"
          placeholder="Enter course name"
          required
        />

        <TextField
          fullWidth
          margin="normal"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          label="Course Description"
          placeholder="Enter course description"
          multiline
          rows={4}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          label="Course Price"
          placeholder="Enter course price"
          required
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={category ? category.id : ""}
            onChange={handleCategoryChange}
            label="Category"
          >
            {categoryList.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="lecturer-label">Lecturer</InputLabel>
          <Select
            labelId="lecturer-label"
            id="lecturer"
            name="lecturer"
            value={lecturer ? lecturer.id : ""}
            onChange={handleLecturerChange}
            label="Lecturer"
          >
            {lecturerList.map((lecturer) => (
              <MenuItem key={lecturer.id} value={lecturer.id}>
                {lecturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack marginTop={"1rem"} justifyContent="center" alignItems="center">
          <Button
            sx={{ width: "70%" }}
            startIcon={<Add />}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            add course
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
