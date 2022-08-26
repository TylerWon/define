import {
  Form,
  Formik,
  Field
} from "formik";
import {
  Button,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";

import { updateUser } from "../../state/slices/userSlice";

// The form on the Account Settings page where the user can update their information
export default function UserInfoForm(props) {
  // Props
  const { dispatch, user } = props;

  // State
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isEmailInUse, setIsEmailInUse] = useState(false);

  // Constants
  const INITIAL_FORM_VALUES = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }

  // Gets the info that the User changed in the form
  // Returns an Object with key/values pairs of the form fields that changed
  const getChangedInfo = (values) => {
    const ret = {};

    if (values.firstName !== INITIAL_FORM_VALUES.firstName) ret["first_name"] = values.firstName;
    if (values.lastName !== INITIAL_FORM_VALUES.lastName) ret["last_name"] = values.lastName;
    if (values.email !== INITIAL_FORM_VALUES.email) {
      ret["username"] = values.email;
      ret["email"] = values.email;
    }

    return ret;
  }

  // Dispatches the updateUser action creator to update the User's information
  // If update is successful, show success notification
  // Otherwise, update failed because email is already in use so set isEmailInUse to true
  const dispatchUpdateUser = async (changedInfo, user) => {
    const data = {
      id: user.id,
      ...changedInfo
    }

    try {
      await dispatch(updateUser(data)).unwrap()
      setShowSnackbar(true);
    } catch(e) {
      setIsEmailInUse(true);
    }
  }

  // Handler for when the form is submitted
  // Gets the info that the User changed in the form, then updates the User's information
  const handleSubmit = (user, values) => {
    const changedInfo = getChangedInfo(values);

    dispatchUpdateUser(changedInfo, user);
  }

  // A labeled Formik Field that takes a text input
  const LabeledField = (props) => {
    // Props
    const { errors, label, name, touched } = props;

    return (
      <Stack
        alignItems="flex-start"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Typography>{label}</Typography>
        <Field 
          as={TextField}
          name={name}
          type="text"
          error={touched[name] && errors[name] ? true : false}
          helperText={touched[name] && errors[name] ? errors[name] : ""}
          required
          fullWidth
        />
      </Stack>
    )
  }

  return (
    <>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required("Required"),
          lastName: Yup.string()
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required")
        })}
        onSubmit={(values) => handleSubmit(user, values)}
      >
        {({ touched, errors, handleChange }) => 
          <Form style={{ width: "100%" }}>
            <Stack
              spacing={6}
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                justifyContent="flex-start"
              >
                <Grid item xs={12} sm="auto">
                  <Typography variant="h1">Account settings</Typography>
                </Grid>
                <Grid item xs={12} sm={true}>
                  <Stack
                    alignItems={{ xs: "flex-start", sm: "flex-end" }}
                    justifyContent="center"
                    sx={{ width: "100%" }}
                  >
                    <Button variant="contained" type="submit">Save changes</Button>
                  </Stack>
                </Grid>
              </Grid>
              <Stack
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%" }}
              >
                <LabeledField errors={errors} label="First name" name="firstName" touched={touched} />
                <LabeledField errors={errors} label="Last name" name="lastName" touched={touched} />
                <Stack
                  alignItems="flex-start"
                  justifyContent="center"
                  sx={{ width: "100%" }}
                >
                  <Typography>Email</Typography>
                  <Field 
                    as={TextField}
                    name="email"
                    type="email"
                    error={touched.email && errors.email || isEmailInUse ? true : false}
                    helperText={
                      touched.email && errors.email ? 
                        errors.email 
                      : isEmailInUse ? 
                          "Email is already associated with an account" 
                          : ""
                    }
                    onChange={(e) => {
                      handleChange(e);
                      if (isEmailInUse) setIsEmailInUse(false);
                    }}
                    required
                    fullWidth
                  />
                </Stack>
              </Stack>
            </Stack>
          </Form>
        }
      </Formik>
      <Snackbar 
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        message="User information updated"
      />
    </>
  )
}
