import { 
  createTheme, 
  responsiveFontSizes, 
  ThemeProvider 
} from "@mui/material";

export const defineTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0056FE"
    },
    secondary: {
      main: "#F1EEEA"
    },
    bgPrimary: {
      main: "#FFFFFF"
    },
    bgSecondary: {
      main: "#F6F3F0"
    }
  },
  typography: {
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
    h1: {
      fontWeight: "700",
      fontSize: "48px"
    },
    h2: {
      fontWeight: "700",
      fontSize: "42px"
    },
    h3: {
      fontWeight: "700",
      fontSize: "36px"
    },
    h4: {
      fontWeight: "700",
      fontSize: "30px"
    },
    h5: {
      fontWeight: "700",
      fontSize: "24px"
    },
    h6: {
      fontWeight: "700",
      fontSize: "18px"
    }
  },
})

export default function DefineTheme(props) {
  const theme = responsiveFontSizes(defineTheme);
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
