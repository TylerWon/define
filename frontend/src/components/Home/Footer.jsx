import { 
  Link,
  Stack, 
  Typography 
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// The footer for the Home page
export default function Footer(props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="flex-start"
      bgcolor="black"
      sx={{ padding: "0.5%" }}
    >
      <Typography color="white">Created by Tyler Won</Typography>
      <Link href="https://github.com/TylerWon" target="_blank" rel="noopener">
        <GitHubIcon fontSize="large" sx={{ color: "white" }}/>
      </Link>
      <Link href="https://www.linkedin.com/in/tyler-won-315907234/" target="_blank" rel="noopener">
        <LinkedInIcon fontSize="large" sx={{ color: "white" }}/>
      </Link>
    </Stack>
  )
}
