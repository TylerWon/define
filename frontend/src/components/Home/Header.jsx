import {
  Grid,
  Stack,
  Typography
} from "@mui/material";

import home from "../../../static/images/home.jpg";
import WordSearchBar from "../lib/WordSearchBar";

// The header for the Home page
export default function Header(props) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ 
        backgroundImage: `url(${home})`,
        backgroundSize: "cover", 
        backgroundPosition: "center center",
        height: "100vh"
      }}
    >
      <Grid item xs={10} md={8} lg={6} xl={4}>
        <Stack
          spacing={5}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Stack
            spacing={2}
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography variant="h1" color="white">Expand your vocabulary one word at a time</Typography>
            <Typography color="white">Find and save definitions for over 150,000 words</Typography>
          </Stack>
          <WordSearchBar autoFocus={true} initialValue="" />
        </Stack>
      </Grid>
    </Grid>
  )
}
