import axios from "axios";
import { 
  Form,
  Formik,
  Field
} from "formik";
import {
  Button,
  Stack,
  TextField
} from "@mui/material";
import * as Yup from "yup";

// The form on the Forgot My Password page
const ForgotMyPasswordForm = (props) => {
  // Props
  const { setSubmitted } = props;

  // Handler for when form is submitted
  const handleSubmit = async (values) => {
    setSubmitted(true);

    const data = {
      email: values.email
    }

    try {
      await axios.post("/api/password-reset-email/", data);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <Formik
      initialValues={{
        email: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
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
              error={touched.email && errors.email ? true : false}
              helperText={touched.email && errors.email ? errors.email : ""}
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
        </Form>
      )}
    </Formik>
  )
}

export default ForgotMyPasswordForm;
