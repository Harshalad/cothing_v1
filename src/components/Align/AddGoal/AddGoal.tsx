import HeaderNav from "../../common/HeaderNav/HeaderNav";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ManagerAlignAddGoal from "./ManagerAlignAddGoal/ManagerAlignAddGoal";
import EmployeeAlignAddGoal from "./EmployeeAlignAddGoal/EmployeeAlignAddGoal";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";
import { useRouter } from "next/router";

const drawerWidth = 250;

const AddGoal = () => {
  const managerToggleView = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  const router = useRouter();
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Manager Assign Goals</title>
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
        <Box sx={{ backgroundColor: "#EAECEF", padding: "112px 32px 32px" }}>
          {/* <Link href="/align" style={{ textDecoration: "none" }}> */}
          <Typography
            //@ts-ignore
            variant="span"
            sx={{
              fontWeight: "500",
              color: "#2D3648",
              marginBottom: "24px",
              cursor: "pointer",
            }}
            className="go_back_flex"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon /> Go Back
          </Typography>
          {/* </Link> */}
          {managerToggleView === MANAGER_VIEW_STATE.LP ? (
            <EmployeeAlignAddGoal />
          ) : (
            <ManagerAlignAddGoal />
          )}
        </Box>
      </Box>
    </>
  );
};
export default AddGoal;
