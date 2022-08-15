import axios from "axios";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addWord, removeWord, selectUser, selectWordBySpelling } from "../../state/slices/userSlice";

// The section on the Search Result page that displays the definition for the searched word
export default function Definition(props) {
  // Props
  const { word } = props;
  
  // State
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);

  // React Redux hooks
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isWordSaved = useSelector(state => selectWordBySpelling(state, word))

  // Handler for when User saves the word
  const handleSave = async (wordData, user) => {
    const data = {
      users: [user.id],
      spelling: wordData.word,
      part_of_speech: wordData.meanings[0].partOfSpeech
    }

    try {
      await dispatch(addWord(data)).unwrap();
    } catch(e) {
      console.log(e.response);
    }
  }

  // Handler for when User unsaves the word
  const handleUnsave = async (wordData, user) => {
    const data = {
      userId: user.id,
      spelling: wordData.word
    }
    
    try { 
      await dispatch(removeWord(data)).unwrap();
    } catch(e) {
      console.log(e.response);
    }
  }

  // Calls Dictionary API to get information about the searched word
  const getWord = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      setWordData(response.data[0]);
      setLoading(false);
    } catch(e) {
      console.log(e.response);
    }
  }

  // Effect: Gets information about the searched word on initial component render
  useEffect(() => {
    getWord(word);
  }, [])

  // A group of definitions for the word. Each group corresponds to a different part of speech
  const DefinitionGroup = (props) => {
    const { data } = props;

    return (
      <Stack
        alignItems="flex-start"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Typography sx={{ fontWeight: 700 }}>{data.partOfSpeech}</Typography>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
        >
          {data.definitions.slice(0, 3).map((definition, index) => 
            <Grid item xs={11.5} key={index}>
              <Grid
                container
                alignItems="flex-start"
                justifyContent="flex-end"
              >
                <Grid item xs={0.7} sm={0.4}>
                  <Typography>{index + 1}.</Typography>
                </Grid>
                <Grid item xs={true}>
                  <Box sx={{ width: "100%" }}>
                    <Typography>{definition.definition}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Stack>
    )
  }

  return (
    <>
      {!loading ? 
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            padding: "25px 0px"
          }}
        > 
          <Grid item xs={10} lg={6}>
            <Paper
              variant="outlined"
              sx={{ width: "100%" }}
            >
              <Grid
                container
                rowSpacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%", padding: "2%" }}
              >
                <Grid item xs={12}>
                  <Grid
                    container
                    columnSpacing={2}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Grid item>
                      <Typography variant="h1">{wordData.word}</Typography>
                    </Grid>
                    <Grid item xs={true} sx={{ marginTop: "2%" }}>
                      <Typography>{wordData.phonetic}</Typography>
                    </Grid>
                    {user.id ? 
                      <Grid item>
                        {isWordSaved ? 
                          <IconButton onClick={() => handleUnsave(wordData, user)}>
                            <BookmarkIcon color="primary" />
                          </IconButton>
                        : 
                          <IconButton onClick={() => handleSave(wordData, user)}>
                            <BookmarkBorderOutlinedIcon color="primary" />
                          </IconButton>
                        }
                      </Grid>
                    :
                      null
                    }
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    {wordData.meanings.map((meaning, index) => 
                      <DefinitionGroup key={index} data={meaning} />
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        : null
      }
    </>
  )
}
