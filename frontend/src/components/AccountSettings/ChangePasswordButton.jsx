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
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup"

// The change password button on the Account Settings page
export default function ChangePasswordButton(props) {
  // Props
  const { user } = props;

  // State
  const [showDialog, setShowDialog] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  // Handler for when the dialog closes
  // Resets dialog related state variables to initial values
  const handleDialogClose = () => {
    setShowDialog(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
  }

  // Handler for when change password form is submitted
  //
  // Calls API to change the User's password
  // If password change is successful, resets dialog related state variables to initial values and notifies the User
  // that their password has been changed
  //
  // Otherwise, password change failed because the current password does not match the stored password so set 
  // passwordDoesNotMatch to true
  const handleSubmit = async (values) => {
    const data = {
      current_password: values.currentPassword,
      new_password: values.newPassword
    }

    try {
      await axios.patch(`/api/users/${user.id}/password/`, data);

      handleDialogClose();
      setShowSnackbar(true);
    } catch(e) {
      setPasswordDoesNotMatch(true);
    }
  }

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
      >
        <Grid item xs={12} md={2}>
          <Typography>Password</Typography>
        </Grid>
        <Grid item xs={12} md="auto">
          <Button variant="outlined" onClick={() => setShowDialog(true)}>Change password</Button>
        </Grid>
      </Grid>
      <Dialog 
        open={showDialog}
        onClose={handleDialogClose} 
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>  
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: ""
            }}
            validationSchema={Yup.object({
              currentPassword: Yup.string()
                .required("Required"),
              newPassword: Yup.string()
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
            {({ errors, handleChange, touched }) => 
              <Form>
                <Stack
                  spacing={4}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "100%", padding: "1%" }}
                >
                  <Typography variant="h4">Change password</Typography>
                  <Stack
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: "100%" }}
                  >
                    <Field
                      as={TextField}
                      name="currentPassword"
                      label="Current password"
                      type={showCurrentPassword ? "text" : "password"}
                      error={touched.currentPassword && errors.currentPassword || passwordDoesNotMatch ? true : false}
                      helperText={
                        touched.currentPassword && errors.currentPassword ? 
                          errors.currentPassword 
                        :
                          passwordDoesNotMatch ?
                            "Password did not match the stored current password"
                          :
                            ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                              {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      onChange={(e) => {
                        handleChange(e);
                        if (passwordDoesNotMatch) setPasswordDoesNotMatch(false);
                      }}
                      required
                      fullWidth
                    />
                    <Field
                      as={TextField}
                      name="newPassword"
                      label="New password"
                      type={showNewPassword ? "text" : "password"}
                      error={touched.newPassword && errors.newPassword || passwordDoesNotMatch ? true : false}
                      helperText={touched.newPassword && errors.newPassword ? errors.newPassword : ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                              {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      onChange={(e) => {
                        handleChange(e);
                        if (passwordDoesNotMatch) setPasswordDoesNotMatch(false);
                      }}
                      required
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            }
          </Formik>
        </DialogContent>
      </Dialog>
      <Snackbar 
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        message="Password updated"
      />
    </>
  )
}
