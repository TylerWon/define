import {
  Grid,
  Link as MuiLink,
  Stack,
  Typography
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

// A component that extracts the shared elements between the Login and Sign Up page
export default function LoginAndRegister(props) {
  const { children, title, description, question, answer, route} = props;

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
            <Typography variant="h1">{title}</Typography>
            <Typography>{description}</Typography>
          </Stack>
          {children} 
          <Stack
            alignItems="center"
            justifyContent="center"
          >
            <Typography>{question}</Typography>
            <MuiLink component={ReactRouterLink} to={route} underline="none">
              <Typography>{answer}</Typography>
            </MuiLink>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
