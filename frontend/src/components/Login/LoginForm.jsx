import {
  Field,
  Form,
  Formik
} from "formik";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { login } from "../../state/slices/userSlice";

// The form where the user enters their information on the Login page
export default function LoginForm(props) {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  // React Router hooks
  const navigate = useNavigate();
  
  // React Redux hooks
  const dispatch = useDispatch();

  // Handler for when the login form is submitted
  // If login is successful, navigate to Profile page
  // Otherwise, login failed because credentials are invalid so set invalidCredentials to true
  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password
    };

    try {
      await dispatch(login(data)).unwrap();
      navigate("/profile");
    } catch(e) {
      setInvalidCredentials(true);
    }
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
      {({errors, touched, handleChange}) => (
        <Form style={{ width: "100%" }}>
          <Stack
            spacing={3}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <Field 
              as={TextField}
              name="email"
              label="Email"
              type="email"
              error={touched.email && errors.email || invalidCredentials ? true : false}
              helperText={
                touched.email && errors.email ? 
                  errors.email 
                : 
                  invalidCredentials ?
                    "Incorrect email or password"
                  : 
                    ""
              }
              onChange={(e) => {
                handleChange(e);
                if (invalidCredentials) setInvalidCredentials(false);
              }}
              required
              fullWidth
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              error={touched.password && errors.password || invalidCredentials? true : false}
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
              onChange={(e) => {
                handleChange(e);
                if (invalidCredentials) setInvalidCredentials(false);
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
