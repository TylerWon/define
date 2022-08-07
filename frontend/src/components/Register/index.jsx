import {
  Grid,
  Link as MuiLink,
  Stack,
  Typography
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

import SignUpForm from "./SignUpForm";

// The Sign Up page
export default function Register(props) {
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
          <SignUpForm />
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
