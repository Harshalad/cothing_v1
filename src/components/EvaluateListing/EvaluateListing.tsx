import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Box, Typography
} from "@mui/material";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import { useState } from "react";
import EvaluateListingTabs from "./EvaluateListingTabs";
import PendingTab from "./PendingTab";
import ActiveTab from "./ActiveTab";
import CompletedTab from "./CompletedTab";

const drawerWidth = 250;

const EvaluateListing = () => {

  const [activeClass, setActiveClass] = useState<any>("one");

  const handleActiveClass = (clickedId: any) => {
    setActiveClass(clickedId);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Evaluator Feedback</title>
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
          className="event_listing"
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: "700", color: "#1C2129" }}
            className="dash_title"
          >
            Evaluate
          </Typography>
          <EvaluateListingTabs
            activeClass={activeClass}
            handleActiveClass={handleActiveClass}
          />
          {activeClass === "one" ? (
            <ActiveTab activeClass={activeClass} />
          ) : activeClass === "two" ? (
            <PendingTab activeClass={activeClass} />
          ) : (
            <CompletedTab activeClass={activeClass} />
          )}
        </Box>
      </Box>
    </>
  );
}
export default EvaluateListing;