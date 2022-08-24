import { Button, Snackbar } from "@mui/material";
import { useState } from "react";

import { removeWord } from "../../../state/slices/userSlice";

// The remove (word) button in the My Words section of the Profile page
export default function RemoveWordButton(props) {
  // Props
  const { dispatch, user, wordsToRemove } = props;

  // State
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Dispatches the removeWord action creator to remove words from the User's words
  const removeWords = (user, wordsToRemove) => {
    wordsToRemove.forEach(async word => {
      const data = {
        spelling: word,
        user: user.id,
      }

      try {
        await dispatch(removeWord(data)).unwrap();
        setShowSnackbar(true);
      } catch(e) {
        console.log(e)
      }
    })
  }

  return (
    <>
      {wordsToRemove.length > 0 ?
        <Button
          variant="contained"
          color="secondary"
          onClick={() => removeWords(user, wordsToRemove)}
        >
          Remove
        </Button>
      :
        null
      }
      <Snackbar 
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        message="Word(s) removed"
      />
    </>
  )
}
