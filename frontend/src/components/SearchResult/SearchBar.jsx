import { Grid } from "@mui/material";

import WordSearchBar from "../lib/WordSearchBar";

// The search bar on the Search Result page
export default function SearchBar(props) {
  // Props
  const { word } = props;

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ 
        width: "100%",
        padding: "150px 0px 25px"
      }}
    >
      <Grid item xs={10} lg={6}>
        <WordSearchBar initialValue={word}/>
      </Grid>
    </Grid>
  );
}
