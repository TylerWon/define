import {
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../../state/slices/userSlice";

import AddWordButton from "./AddWordButton";
import RemoveWordButton from "./RemoveWordButton";
import WordSearchBar from "../../lib/WordSearchBar";
import WordsTable from "./WordsTable";

// The section on the Profile page that displays the user's words
export default function MyWords(props) {
  // State
  const [selectedWords, setSelectedWords] = useState([]);

  // React Redux hooks
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ padding: "50px 0px 25px" }}
    > 
      <Grid item xs={10} md={8} xl={6}>
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid item xs={6}>
              <Typography variant="h4">My Words</Typography>
            </Grid>
            <Grid item xs={true}>
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ width: "100%" }}
              >
                <AddWordButton dispatch={dispatch} user={user} />
                <RemoveWordButton dispatch={dispatch} wordsToRemove={selectedWords} user={user} />
              </Stack>
            </Grid>
          </Grid>
          <WordsTable setSelectedWords={setSelectedWords} user={user} />
        </Stack>
      </Grid>
    </Grid>
  )
}
