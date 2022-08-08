import {
  Field,
  Form,
  Formik
} from "formik";
import SearchIcon from "@mui/icons-material/Search";
import {
  Grid,
  InputAdornment,
  TextField
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

// The search bar on the Search Result page
export default function SearchBar(props) {
  // React Router hooks
  const navigate = useNavigate();
  const params = useParams();
  
  // Handler for when the User searches for a word
  const handleSearchSubmit = (values) => {
    const word = values["word"];
    navigate(`/search/${word}`);
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ 
        width: "100%",
        paddingTop: "150px"
      }}
    >
      <Grid item xs={12} lg={6}>
        <Formik
          initialValues={{ word: params.word }}
          onSubmit={(values) => handleSearchSubmit(values)}
        >
          <Form style={{ width: "100%" }}>
            <Field 
              as={TextField}
              name="word"
              type="text"
              variant="outlined"
              placeholder="Search for a word"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              sx={{ 
                backgroundColor: "white",
                borderRadius: "5px"
              }}
              fullWidth  
              autoFocus
            />
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}
