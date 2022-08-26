import { Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../state/slices/userSlice";
import ChangePasswordButton from "./ChangePasswordButton";

import UserInfoForm from "./UserInfoForm";

// The Account Settings page
export default function AccountSettings(props) {
  // React Redux hooks
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ padding: "125px 0px 25px"}}
    >
      <Grid item xs={10} md={8} lg={6} xl={5}>
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <UserInfoForm dispatch={dispatch} user={user} />
          <ChangePasswordButton user={user} />
        </Stack>
      </Grid>
    </Grid>
  )
}
