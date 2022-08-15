import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import Definition from "./Definition";
import SearchBar from "./SearchBar";

// The Search Result page
export default function SearchResult(props) {
  // React Router hooks
  const params = useParams();

  return (
    <Stack 
      alignItems="center"
      justifyContent="flex-start"
      bgcolor="bgSecondary.main"
    >
      <SearchBar word={params.word}/>
      <Definition word={params.word}/>
      {/* <Synonyms /> */}
    </Stack>
  );
}
