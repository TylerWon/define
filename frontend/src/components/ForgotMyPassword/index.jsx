import {
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useState } from "react";

import ForgotMyPasswordForm from "./ForgotMyPasswordForm";

// The Forgot My Password page
const ForgotMyPassword = (props) => {
  // State
  const [submitted, setSubmitted] = useState(false);

  return (
    <Grid
      container
      spacing={5}
      alignItems="center"
      justifyContent="center"
      sx={{ 
        width: "100%", 
        padding: "125px 0px 125px"
      }}
    >
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h1">Forgot my password</Typography>     
      </Grid>
      <Grid item xs={10} sm={6} md={5} lg={4} xl={3}>    
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {!submitted ?
            <>
              <Typography sx={{ textAlign: "center" }}>
                Tell us the email address associated with your Define account, and we’ll send you an email with a 
                link to reset your password.
              </Typography>
              <ForgotMyPasswordForm setSubmitted={setSubmitted} />
            </>
          :
            <>
              <Typography sx={{ textAlign: "center" }}>
                We've emailed you instructions for resetting your password, if an account exists with the email you 
                entered. It should arrive in your inbox shortly.
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                If you do not receive the email, please make sure you entered the email address you registered with, 
                and check your spam folder.
              </Typography>
            </>
          }
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ForgotMyPassword;
