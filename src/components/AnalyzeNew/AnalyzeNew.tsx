import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Box, Typography
} from "@mui/material";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import AnalyzeTabs from "./AnalyzeTabs";
import AnalyzeYourSkill from "./AnalyzeYourSkill";
import { useState } from "react";
import SeekFeedback from "./SeekFeedback";
import PersonalStatistics from "./PersonalStatistics";
import GiveFeedback from "./GiveFeedback";
import ViewMore from "./ViewMore";
import RecommendedGoals from "./RecommendedGoals";

const drawerWidth = 250;

const AnalyzeNew = () => {

  const [activeClass, setActiveClass] = useState<any>("one");

  const handleActiveClass = (clickedId: any) => {
    setActiveClass(clickedId);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Analyze</title>
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
          className="analyze"
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: "700", color: "#1C2129" }}
            className="dash_title"
          >
            Analyze
          </Typography>
          <AnalyzeTabs
            activeClass={activeClass}
            handleActiveClass={handleActiveClass}
          />
          {activeClass === "one" ? (
            <AnalyzeYourSkill
              activeClass={activeClass}
              handleActiveClass={handleActiveClass}
            />
          ) : activeClass === "two" ? (
            <SeekFeedback
              activeClass={activeClass}
              handleActiveClass={handleActiveClass}
            />
          ) : activeClass === "three" ? (
            <PersonalStatistics />
          ) : (
            <GiveFeedback activeClass={activeClass} />
          )}
          {/* <ViewMore /> */}
          {/* <RecommendedGoals /> */}
        </Box>
      </Box>
    </>
  );
}
export default AnalyzeNew;