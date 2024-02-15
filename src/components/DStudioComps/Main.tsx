import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box } from "@mui/material";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import Overview from "./Overview";
import NewTest from "./NewTest";
import { useState } from "react";

const drawerWidth = 250;

const Main = () => {

  const [selectedDropDownValue, setDropDownValue] = useState<any>("");

  const selectedDropDown = (selectedValue: any) => {
    setDropDownValue(selectedValue);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | D-Studio Assessment</title>
        </Helmet>
      </HelmetProvider>
      <HeaderNav />
      <Box
        component="main"
        sx={{
          width: { tablet: `calc(100% - ${drawerWidth}px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
        }}
      >
        <Box
          sx={{ backgroundColor: "#EAECEF", padding: "112px 32px 32px" }}
          className="d_studio_section"
        >
          {
          selectedDropDownValue === "create-test"
          ?
            <NewTest selectedDropDown={selectedDropDown} />
          :
            <Overview selectedDropDown={selectedDropDown} />
          }
        </Box>
      </Box>
    </>
  );
};
export default Main;