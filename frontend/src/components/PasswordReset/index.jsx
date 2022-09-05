import axios from "axios";
import {
  CircularProgress,
  Grid,
  Link as MuiLink,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useParams } from "react-router-dom";

import PasswordResetForm from "./PasswordResetForm";

// The Password Reset page
const PasswordReset = (props) => {
  // State
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [loading, setLoading] = useState(true);

  // React Router hooks
  const params = useParams();

  // Calls API to check if the password reset url is valid
  // If password reset url is valid, do nothing
  // Else the url is invalid so set invalidCredentials to true
  // Finally set loading to true
  const checkPasswordResetUrl = async (uid, token) => {
    const data = {
      uid: uid,
      token: token
    }

    try {
      await axios.post("/api/password-reset-check/", data);
    } catch(e) {
      setInvalidCredentials(true);
    } finally {
      setLoading(false);
    } 
  }

  // Effect: Check if password reset url is valid
  useEffect(() => {
    checkPasswordResetUrl(params.uid, params.token);
  }, [])

  return (
    <>
      {!loading ?   
        <Grid
          container
          rowSpacing={5}
          alignItems="center"
          justifyContent="center"
          sx={{ 
            width: "100%", 
            padding: "125px 0px 25px"
          }}
        >

          <Grid item xs={10} sm={8} md={6} lg={5} xl={4}>
            <Stack
              spacing={4}
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <Typography variant="h1">Password reset</Typography>
              <Stack
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%" }}
              >
                {!invalidCredentials ?
                  !passwordUpdated ?
                    <PasswordResetForm 
                      setPasswordUpdated={setPasswordUpdated}
                      setInvalidCredentials={setInvalidCredentials}
                      uid={params.uid} 
                      token={params.token}  
                    />
                  :
                    <>
                      <Typography sx={{ textAlign: "center" }}>
                        Your password was reset successfully. Redirecting to login page...
                      </Typography>
                      <CircularProgress />
                    </>
                :
                  <Typography sx={{ textAlign: "center" }}>
                    This password reset link is invalid, possibly because it has already been used. If you would still like 
                    to reset your password, request a new link <MuiLink component={ReactRouterLink} to="/forgot-my-password" underline="hover">here</MuiLink>.
                  </Typography>
                }
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      :
        null
      }
    </>
  )
}

export default PasswordReset;
