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
  Link as MuiLink,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import * as Yup from "yup";

import { register } from "../../state/slices/userSlice";

// The Sign Up page
export default function Register(props) {
  // State
  const [showPassword, setShowPassword] = useState(false);

  // React Redux hooks
  const dispatch = useDispatch();

  // Handler for when the sign up form is submitted
  const handleSubmit = (values) => {
    const data = {
      username: values.email,
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password
    };

    dispatch(register(data));
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        paddingTop: "125px"
      }}
    >
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h1">Sign up</Typography>
            <Typography>Create your Define account</Typography>
          </Stack>
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
            {({errors, touched}) => (
              <Form style={{ width: "100%" }}>
                <Stack
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "100%" }}
                >
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={12} sm={6}>
                      <Field 
                        as={TextField}
                        name="firstName"
                        label="First name"
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
                    Sign up
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
          <Stack
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Already have an account?</Typography>
            <MuiLink component={ReactRouterLink} to="/login" underline="none">
              <Typography>Sign in instead</Typography>
            </MuiLink>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
