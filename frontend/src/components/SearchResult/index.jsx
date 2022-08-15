import { Stack } from "@mui/material";

import Definition from "./Definition";
import SearchBar from "./SearchBar";

import "./index.css";

// The Search Result page
export default function SearchResult(props) {
  return (
    <Stack 
      alignItems="center"
      justifyContent="flex-start"
    >
      <SearchBar />
      <Definition />
      {/* <Synonyms /> */}
    </Stack>
  );
}
