import axios from "axios";
import {
  Form,
  Formik,
  Field
} from "formik";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField
} from "@mui/material";
import { useState } from "react";

import { addWord } from "../../../state/slices/userSlice";

// The Add (word) button in the My Words section of the Profile page. Transforms to a form where the user can enter a 
// word they want to add when clicked
export default function AddWordButton(props) {
  // Props
  const { dispatch, user } = props;

  // State
  const [clicked, setClicked] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [wordAlreadySaved, setWordAlreadySaved] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Calls Dictionary API to get information about the word to be added
  const getWord = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      return response;
    } catch(e) {
      return e.response;
    } 
  }

  // Dispatches the addWord action creator to add a word to a User's words
  const dispatchAddWord = async (wordData, user) => {
    const data = {
      users: [user.id],
      spelling: wordData.word,
      part_of_speech: wordData.meanings[0].partOfSpeech
    }

    try {
      await dispatch(addWord(data)).unwrap();
      setShowSnackbar(true);
    } catch(e) {
      console.log(e.response);
    }
  }

  // Checks if a word is in a User's words
  // Returns true if the word is in the User's words
  // Returns false otherwise
  const wordInUsersWords = (wordToFind, user) => {
    const words = user.words;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.spelling === wordToFind) return true;
    }

    return false;
  }

  // Handler for when the add word form is submitted
  // Adds the word to the User's words only if the user has not already saved the word and the word is a real word 
  // (i.e. definition data was returned)
  const handleSubmit = async (values, user) => {
    const word = values.word;

    if (wordInUsersWords(word, user)) {
      setWordAlreadySaved(true);
      return;
    }

    const response = await getWord(word);
    if (response.status !== 200) {
      setNoResults(true);
      return;
    }

    dispatchAddWord(response.data[0], user);
  }

  return (
    <>
      {clicked ?
        <Formik
          initialValues={{ word: "" }}
          onSubmit={(values) => handleSubmit(values, user)}
        >
          {({ handleChange }) => (
            <Form>
              <Field 
                as={TextField}
                name="word"
                type="text"
                variant="outlined"
                placeholder="Add a word"
                error={noResults || wordAlreadySaved}
                helperText={
                  noResults ? 
                    "Word could not be added" 
                  : 
                    wordAlreadySaved ? 
                      "Word is already saved"
                    :
                      ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setClicked(false)}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => {
                  handleChange(e);
                  if (noResults) setNoResults(false);
                  else if (wordAlreadySaved) setWordAlreadySaved(false);
                }}
                sx={{ 
                  backgroundColor: "white",
                  borderRadius: "5px"
                }}
                autoFocus
              />
            </Form>
          )}
        </Formik>
      :
        <Button
          variant="contained"
          onClick={() => setClicked(true)}
        >
          Add
        </Button>
      }
      <Snackbar 
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        message="Word added"
      />
    </>
  )
}
