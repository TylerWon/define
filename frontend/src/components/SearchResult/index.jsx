import axios from "axios";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Definition from "./Definition";
import SearchBar from "./SearchBar";
import AntonymsOrSynonyms from "./AntonymsOrSynonyms";
import NoResults from "./NoResults";

// The Search Result page
export default function SearchResult(props) {
  // State
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  // React Router hooks
  const params = useParams();

  // Calls Dictionary API to get information about the searched word
  const getWord = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      setWordData(response.data[0]);
    } catch(e) {
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  }

  // Effect: Gets information about the searched word on initial component render
  useEffect(() => {
    getWord(params.word);
  }, [])

  return (
    <>
      {!loading ? 
        !noResults ?
          <Stack 
            alignItems="center"
            justifyContent="flex-start"
            sx={{ minHeight: "100vh" }}
          >
            <SearchBar word={params.word} />
            <Definition word={params.word} wordData={wordData} />
            <AntonymsOrSynonyms name="synonyms" wordData={wordData} />
            <AntonymsOrSynonyms name="antonyms" wordData={wordData} />
          </Stack>
        :
          <Stack 
            alignItems="center"
            justifyContent="flex-start"
            sx={{ minHeight: "100vh" }}
          >
            <SearchBar word={params.word} />
            <NoResults word={params.word} />
          </Stack>
      :
        null
      }
    </>
  );
}
