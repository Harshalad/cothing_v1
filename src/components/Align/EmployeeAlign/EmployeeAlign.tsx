import { useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import {
  Box,
  Tab,
  RadioGroup,
  FormControlLabel,
  Radio,
  Icon,
  Button,
  InputBase,
  LinearProgress,
  alpha,
  linearProgressClasses,
  styled,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import UserGoalsTab from "./UserGoalsTab/UserGoalsTab";
import DepartmentGoalsTab from "./DepartmentGoalsTab/DepartmentGoalsTab";
import OrganisationGoalsTab from "./OrganisationGoalsTab/OrganisationGoalsTab";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const EmployeeAlign = () => {
  const drawerWidth = 250;
  const router = useRouter();
  const [value, setValue] = useState("1");
  const [valueRadio, setValueRadio] = useState("Not Aligned");
  const [showGuidance, setShowGuidance] = useState(false);

  const [showModifyGoal, setShowModifyGoal] = useState(false);
  const [showManagerTime, setShowManagerTime] = useState(false);

  const handleChangeRadio = (event: any) => {
    setValueRadio(event.target.value);
  };
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const Search = styled(Box)(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    //   width: "auto",
    // },
  }));
  const SearchIconWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#989EA5",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const program = useSelector(
    // @ts-ignore
    (state) => state?.user?.program
  );

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
    },
  }));
  return (
    <Box
      className="align-panel-content"
      // sx={{ ml: { tablet: `${drawerWidth}px` } }}
    >
      <TabContext value={value}>
        <Box>
          <TabList
            className="align_tabs"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="View My Goals" value="1" />
            {program?.configMap?.enableOrgGoals ? (
              <Tab label="View Organization Goals" value="2" />
            ) : null}

            {program?.configMap?.enableDeptGoals ? (
              <Tab label="View Team Goals" value="3" />
            ) : null}
          </TabList>
        </Box>
        <UserGoalsTab />
        <OrganisationGoalsTab />
        <DepartmentGoalsTab />
      </TabContext>
    </Box>
  );
};

export default EmployeeAlign;
