import MenuBookIcon from '@mui/icons-material/MenuBook';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import {
  Avatar,
  Button,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "../../state/slices/userSlice";

// The section on the Profile page that displays info about the User
export default function UserInfo(props) {
  // React Redux hooks
  const user = useSelector(selectUser);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      bgcolor="bgSecondary.main"
      sx={{ 
        width: "100%",
        padding: "150px 0px 25px"
      }}
    >
      <Grid item xs={10} md={8} xl={6}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Avatar sx={{ minWidth: "200px", minHeight: "200px" }} />
          </Grid>
          <Grid item xs={12} sm={true}>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                alignItems="center"
                justifyContent="flex-start"
              >
                <Grid item xs={true}>
                  <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
                </Grid>
                <Grid item>
                  <Link to="/account/settings" style={{ textDecoration: "none" }}>
                    <Button variant="outlined">Settings</Button>
                  </Link>
                </Grid>
              </Grid>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ width: "100%" }}
              >
                <WatchLaterIcon />
                <Typography>Joined {user.dateJoined}</Typography>
              </Stack>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ width: "100%" }}
              >
                <MenuBookIcon />
                <Typography>{user.words.length} words saved</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
