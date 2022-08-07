import {
  Field,
  Form,
  Formik
} from "formik";
import SearchIcon from '@mui/icons-material/Search';
import {
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate} from "react-router-dom";

import home from "../../../static/images/home.jpg";

// The header for the Home page
export default function Header(props) {
  // React Router hooks
  const navigate = useNavigate();

  // Handler for when the User searches for a word
  const handleSearchSubmit = (values) => {
    const word = values["word"];
    navigate(`/dictionary/${word}`);
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ 
        backgroundImage: `url(${home})`,
        backgroundSize: "cover", 
        backgroundPosition: "center center",
        height: "100vh"
      }}
    >
      <Grid item xs={10} md={8} lg={6} xl={4}>
        <Stack
          spacing={5}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Stack
            spacing={2}
            alignItems="flex-start"
            justifyContent="center"
          >
            <Typography variant="h1" color="white">Expand your vocabulary one word at a time</Typography>
            <Typography color="white">Find and save definitions for over 150,000 words</Typography>
          </Stack>
          <Formik
            initialValues={{ word: "" }}
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
        </Stack>
      </Grid>
    </Grid>
  )
}
