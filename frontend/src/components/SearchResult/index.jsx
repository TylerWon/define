import { Box } from "@mui/material";

import SearchBar from "./SearchBar";

// The Search Result page
export default function SearchResult(props) {
  return (
    <Box 
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      bgcolor="bgSecondary.main"
      sx={{
        width: "100vw",
        height: "100vh"
      }}
    >
      <SearchBar />
      {/* <Definition /> */}
      {/* <Synonyms /> */}
    </Box>
  );
}
