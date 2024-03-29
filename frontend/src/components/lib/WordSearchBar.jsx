import {
  Field,
  Form,
  Formik
} from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

// A search bar for words
export default function WordSearchBar(props) {
  const { autoFocus, initialValue  } = props;
  
  // Handler for when the User searches for a word
  const handleSearchSubmit = (values) => {
    const word = values["word"];
    window.location.href = `/search/${word}`;
  }

  return (
    <Formik
      initialValues={{ word: initialValue }}
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
          autoFocus={autoFocus}
        />
      </Form>
    </Formik>
  );
}
