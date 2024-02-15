import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
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
});
