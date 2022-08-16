import {
  Grid,
  Paper,
  Typography
} from "@mui/material";

// A section on the Search Result page that informs the user that there are no results for the searched word
export default function NoResults(props) {
  // Props
  const { word } = props;

  return (
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
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: "100%", padding: "2%" }}
          >
            <Grid item xs={12}>
              <Typography variant="h1">No results found for</Typography>
              <Typography variant="h1">"{word}"</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
