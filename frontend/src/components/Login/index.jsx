import {
  Grid,
  Link as MuiLink,
  Stack,
  Typography
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

import LoginForm from "./LoginForm";

// The Login page
export default function Login(props) {
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
            <Typography variant="h1">Login</Typography>
            <Typography>Access your Define account</Typography>
          </Stack>
          <LoginForm />
          <Stack
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Don't have an account? <MuiLink component={ReactRouterLink} to="/register" underline="hover">Sign up</MuiLink></Typography>
            <Typography><MuiLink component={ReactRouterLink} to="/forgot-my-password" underline="hover">Forgot my password</MuiLink></Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
