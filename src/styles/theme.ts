import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#F58A43",
    },
    
    //@ts-ignore
    danger: {
      main: "#E74649",
      contrastText: "#fff",
    },
    medium: {
      main: "#EFCE5B",
      contrastText: "#fff",
    },
    success: {
      main: "#21C262",
      contrastText: "#fff",
    },
  },  
  typography: {
    fontFamily: `"Inter", sans-serif`,
  },
  typography: {
    fontFamily: `"Inter", sans-serif`,
  }
});

export default theme;
