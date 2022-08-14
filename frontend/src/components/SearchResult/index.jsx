import { Stack } from "@mui/material";

import Definition from "./Definition";
import SearchBar from "./SearchBar";

// The Search Result page
export default function SearchResult(props) {
  return (
    <Stack 
      alignItems="center"
      justifyContent="flex-start"
      bgcolor="bgSecondary.main"
    >
      <SearchBar />
      <Definition />
      {/* <Synonyms /> */}
    </Stack>
  );
}
