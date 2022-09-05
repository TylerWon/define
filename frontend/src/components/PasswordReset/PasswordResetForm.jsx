import axios from "axios";
import { 
  Form,
  Formik,
  Field
} from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// The form on the Password Reset page
const PasswordResetForm = (props) => {
  // Props
  const { setPasswordUpdated, setInvalidCredentials, uid, token } = props;

  // State
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // React Router hooks
  const navigate = useNavigate();

  // Handler for when form is submitted
  // If password update successful, set passwordUpdated to true and navigate to Login page after a timeout
  // Else password update failed because of invalid credentials (i.e. uid and/or token invalid), so set invalid
  // credentials to true
  const handleSubmit = async (values) => {
    setSubmitted(true);

    const data = {
      new_password: values.newPassword,
      uid: uid,
      token: token
    }

    try {
      await axios.post("/api/password-reset-update/", data);

      setPasswordUpdated(true);
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch(e) {
      setInvalidCredentials(true);
    } finally {
      setSubmitted(false);
    }
  }

  return (
    <Formik
      initialValues={{
        newPassword: ""
      }}
      validationSchema={Yup.object({
        newPassword: Yup.string()
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
            excludeEmptyString: true,
            message: "Must contain 8 characters: one uppercase, one lowercase, one number and one special case character"
          })
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
              name="newPassword"
              type={showPassword ? "text" : "password"}
              label="New password"
              error={touched.newPassword && errors.newPassword ? true : false}
              helperText={touched.newPassword && errors.newPassword ? errors.newPassword : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
              fullWidth
            />
            {!submitted ?
              <Button
                variant="contained"
                type="submit"
                fullWidth
              >
                Submit
              </Button>            
            :
              <CircularProgress />
            }
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default PasswordResetForm;
