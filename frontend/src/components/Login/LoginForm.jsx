import {
  Field,
  Form,
  Formik
} from "formik";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { selectUser, login } from "../../state/slices/userSlice";

// The form where the user enters their information on the Login page
export default function LoginForm(props) {
  // State
  const [showPassword, setShowPassword] = useState(false);

  // React Redux hooks
  const dispatch = useDispatch();

  // Handler for when the login form is submitted
  const handleSubmit = (values) => {
    const data = {
      email: values.email,
      password: values.password
    };

    dispatch(login(data));
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        password: Yup.string()
          .required("Required")
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({errors, touched}) => (
        <Form style={{ width: "100%" }}>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <Field 
              as={TextField}
              name="email"
              label="Email"
              type="email"
              error={touched.email && errors.email ? true : false}
              helperText={touched.email && errors.email ? errors.email : ""}
              required
              fullWidth
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              error={touched.password && errors.password ? true : false}
              helperText={touched.password && errors.password ? errors.password : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              required
              fullWidth
            />
            <Button 
              variant="contained" 
              type="submit" 
              fullWidth
            >
              Login
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
