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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { register } from "../../state/slices/userSlice";

// The form where the user enters their information on the Sign Up page
export default function SignUpForm(props) {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailInUse, setIsEmailInUse] = useState(false);

  // React Router hooks
  const navigate = useNavigate();

  // React Redux hooks
  const dispatch = useDispatch();

  // Handler for when the sign up form is submitted
  // If registration is successful, navigate to Profile page
  // Otherwise, registration failed because email is already in use so set isEmailInUse to true
  const handleSubmit = async (values) => {
    const data = {
      username: values.email,
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password
    };

    try {
      await dispatch(register(data)).unwrap();
      navigate("/profile");
    } catch(e) {
      setIsEmailInUse(true);
    }
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .required("Required"),
        lastName: Yup.string()
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        password: Yup.string()
          .matches(
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            { 
              message: "Must contain 8 characters: one uppercase, one lowercase, one number and one special case character", 
              excludeEmptyString: true 
            }
          )
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
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              justifyContent="center"
            >
              <Grid item xs={12} sm={6}>
                <Field 
                  as={TextField}
                  name="firstName"
                  label="First name"
                  type="text"
                  error={touched.firstName && errors.firstName ? true : false}
                  helperText={touched.firstName && errors.firstName ? errors.firstName : ""}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field 
                  as={TextField}
                  name="lastName"
                  label="Last name"
                  type="text"
                  error={touched.lastName && errors.lastName ? true : false}
                  helperText={touched.lastName && errors.lastName ? errors.lastName : ""}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Field 
              as={TextField}
              name="email"
              label="Email"
              type="email"
              error={touched.email && errors.email || isEmailInUse ? true : false}
              helperText={
                touched.email && errors.email ? 
                  errors.email 
                : isEmailInUse ? 
                    "Email is already associated with an account" 
                  : 
                    ""
              }
              onChange={(e) => {
                handleChange(e);
                if (isEmailInUse) setIsEmailInUse(false);
              }}
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
              Sign up
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
