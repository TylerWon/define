import axios from "axios";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Definition from "./Definition";
import SearchBar from "./SearchBar";
import Synonyms from "./Synonyms";

// The Search Result page
export default function SearchResult(props) {
  // State
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true)

  // React Router hooks
  const params = useParams();

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
    getWord(params.word);
  }, [])

  return (
    <>
      {!loading ? 
        <Stack 
          alignItems="center"
          justifyContent="flex-start"
          bgcolor="bgSecondary.main"
        >
          <SearchBar word={params.word} />
          <Definition word={params.word} wordData={wordData} />
          <Synonyms wordData={wordData} />
        </Stack>
      :
        null
      }
    </>
  );
}
