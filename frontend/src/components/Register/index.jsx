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
      <Grid item xs={10} sm={6} md={5} lg={4} xl={3}>
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
          <Typography>Already have an account? <MuiLink component={ReactRouterLink} to="/login" underline="hover">Sign in</MuiLink></Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
