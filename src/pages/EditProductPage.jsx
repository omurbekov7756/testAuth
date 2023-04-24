import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useProductContext } from "../contexts/ProductContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useParams } from "react-router-dom";

const theme = createTheme();

function EditProductPage() {
  const { slug } = useParams();

  const [formValue, setFormValue] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const { categories, getCategories, oneProduct, getOneProduct, editProduct } =
    useProductContext();

  function handleChange(e) {
    const obj = {
      ...formValue,
      [e.target.name]: e.target.value,
    };
    setFormValue(obj);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    editProduct(slug, data);
  }

  useEffect(() => {
    getCategories();
    getOneProduct(slug);
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setFormValue(oneProduct);
    }
  }, [oneProduct]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit product
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={(e) => handleChange(e)}
              value={formValue.title}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formValue.description}
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              id="description"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formValue.price}
              margin="normal"
              required
              fullWidth
              type="number"
              name="price"
              label="Price"
              id="price"
            />
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                label="Category"
                name="category"
                onChange={(e) => handleChange(e)}
                value={formValue.category}
              >
                {categories.map((item) => {
                  return (
                    <MenuItem key={item.slug} value={item.slug}>
                      {item.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              type="file"
              name="main_image"
              id="image"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditProductPage;
