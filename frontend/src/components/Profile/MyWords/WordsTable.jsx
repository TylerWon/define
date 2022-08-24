import {
  Box,
  CircularProgress,
  Link as MuiLink,
  Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

// The table of words in the My Words section of the Profile page
export default function WordsTable(props) {
  // Props
  const { setSelectedWords, user } = props;

  // Constants
  const DATA_GRID_COLUMNS = [
    {
      field: "word",
      headerName: "Word",
      width: 250,
      renderCell: params => 
        <MuiLink 
          component={ReactRouterLink} 
          to={`/search/${params.row.word}`} 
          underline="none"
        >
          <Typography>{params.row.word}</Typography>
        </MuiLink>
    },
    {
      field: "partOfSpeech",
      headerName: "Part of Speech",
      width: 250,
      editable: false
    }
  ]

  // State
  const [dataGridRows, setDataGridRows] = useState([]);
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true);

  // Populates dataGridRows with the User's words
  const populateDataGridRows = (user) => {
    const rows = [];

    user.words.forEach((word) => {
      const row = {
        id: word.spelling,
        word: word.spelling,
        partOfSpeech: word.part_of_speech
      }

      rows.push(row);
    })

    setDataGridRows(rows);
  }

  // Effect: Populates dataGridRows with the User's words
  useEffect(() => {
    populateDataGridRows(user);
    setLoading(false);
  }, [user.words])

  return (
    <>
      {!loading ?          
        <Box sx={{ width: "100%" }}>
          <DataGrid 
            columns={DATA_GRID_COLUMNS}
            rows={dataGridRows}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            onSelectionModelChange={newSelectedWords => setSelectedWords(newSelectedWords)}
            autoHeight
            checkboxSelection
            pagination
          />
        </Box>
      :
        <CircularProgress />
      }
    </>
  )
}
