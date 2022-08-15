import {
  Chip,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";

// A section on the Search Result page that displays the antonyms or synonyms for the searched word
export default function AntonymsOrSynonyms(props) {
  // Props
  const { name, wordData } = props;

  // A group of antonyms or synonyms for the word. Each group corresponds to a different part of speech
  const Group = (props) => {
    const { data } = props;

    return (
      <Stack
        spacing={0.5}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Typography sx={{ fontWeight: "700" }}>{data.partOfSpeech}</Typography>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Grid
              container
              spacing={0.5}
              alignItems="center"
              justifyContent="flex-start"
            >
              {data[name].length > 0 ?
                data[name].map((word, index) => 
                  <Grid key={index} item>
                    <Chip 
                      key={index}
                      component="a"
                      href={`/search/${word}`}
                      label={word} 
                      variant="outlined" 
                      clickable
                    />
                  </Grid>
                )
              :
                <Grid item>
                  <Typography>no {name}</Typography>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    )
  }

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
            rowSpacing={2}
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: "100%", padding: "2%" }}
          >
            <Grid item xs={12}>
              <Typography variant="h3">{name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                {wordData.meanings.map((meaning, index) => 
                  <Group key={index} data={meaning} />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
