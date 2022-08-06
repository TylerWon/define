import { 
  Grid,
  Link,
  Stack, 
  Typography 
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// The footer for the Home page
export default function Footer(props) {
  return (
    <Grid
      container
      position="absolute"
      bottom="0px"
      alignItems="center"
      justifyContent="flex-start"
      bgcolor="black"
      sx={{ 
        width: "100%", 
        padding: "0.5%"
      }}
    >
      <Grid item>
        <Typography color="white">Created by Tyler Won</Typography>
      </Grid>
      <Grid item sx={{ marginLeft: "10px" }}>
        <Link href="https://github.com/TylerWon" target="_blank" rel="noopener">
          <GitHubIcon fontSize="large" sx={{ color: "white" }}/>
        </Link>
      </Grid>
      <Grid item sx={{ marginLeft: "10px" }}>
        <Link href="https://www.linkedin.com/in/tyler-won-315907234/" target="_blank" rel="noopener">
          <LinkedInIcon fontSize="large" sx={{ color: "white" }}/>
        </Link>
      </Grid>
    </Grid>
  )
}
