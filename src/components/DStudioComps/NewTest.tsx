import { useEffect, useState } from "react";
import { Box, Collapse, Divider, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import TestInformation from "./TestInformation";
import TestTitle from "./TestTitle";
import SectionInformation from "./SectionInformation";
import SectionTitle from "./SectionTitle";
import AddViewQuestion from "./AddViewQuestion";

var elementLen: any;
var clickedId: any;
var active_class: any;

const NewTest = ({ selectedDropDown }: any) => {

  const [activeClass, setActiveClass] = useState<any>("test-information");
  const [sectionExapnd, setSectionExpand] = useState<any>(false);
  const [addSections, setSections] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [showSectionMenu, setSectionMenu] = useState<any>(false);

  const openSectionMenu = (event :any) => {
    setAnchorEl(event.currentTarget);
    setSectionMenu(true);
  };

  const closeSectionMenu = () => {
    setAnchorEl(null);
    setSectionMenu(false);
  };

  const handleActiveClass = (selectedMenu: any) => {
    console.log(selectedMenu);
    setActiveClass(selectedMenu);
    active_class = selectedMenu;
    //SectionsMenu({selectedMenu}, active_class);
  }

  // const handleSectionExpand = (event: any) => {
  //   clickedId = "colp-"+event.currentTarget.id;
  //   var expandId = document.getElementById("colp-"+event.currentTarget.id);
  //   if (expandId?.classList.contains("MuiCollapse-hidden")) {
  //     setSectionExpand("colp-"+event.currentTarget.id);
  //   }
  //   else {
  //     setSectionExpand(false);
  //   }
  // }

  const SectionsMenu = ({ uniqueId, selectedMenu }: any, active_class: any) => {
    console.log(showSectionMenu)
    //console.log(uniqueId ? uniqueId : selectedMenu ? selectedMenu : 0);
    //console.log("activeClass", active_class);
    elementLen = document.querySelectorAll(".dstudio_section_menu").length;
    return (
      <>
        <Stack
          id={uniqueId}
          className={`dstudio_menu_flx jstfy_contnt dstudio_section_menu`}
          // onClick={() =>
          //   handleActiveClass(
          //     uniqueId ? uniqueId : selectedMenu ? selectedMenu : 0
          //   )
          // }
        >
          <Stack
            className={`dstudio_menu_innr_flx`}
            id={uniqueId ? uniqueId : selectedMenu ? selectedMenu : 0}
          >
            <DragIndicatorRoundedIcon
              className={`dstudio_menu_icon eml`}
              sx={{ color: "#1C1C29" }}
            />
            <Typography
              className={`dstudio_menu_name ${
                active_class ===
                (uniqueId ? uniqueId : selectedMenu ? selectedMenu : 0)
                  ? "active_menu"
                  : "none"
              }`}
            >
              Section {elementLen + 1}
            </Typography>
          </Stack>
          <Stack className="dstudio_menu_innr_flx">
            {sectionExapnd === clickedId ? (
              <ExpandLessRoundedIcon
                className={`dstudio_menu_icon`}
                sx={{ color: "#5D636B" }}
              />
            ) : (
              <ExpandMoreRoundedIcon
                className={`dstudio_menu_icon`}
                sx={{ color: "#5D636B" }}
              />
            )}
            <IconButton onClick={openSectionMenu}>
              <MoreVertRoundedIcon
                className="dstudio_menu_right_icon"
                sx={{ color: "#5D636B" }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={showSectionMenu}
              onClose={closeSectionMenu}
            >
              <MenuItem onClick={closeSectionMenu}>Edit Section</MenuItem>
              <MenuItem onClick={closeSectionMenu}>Delete Section</MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Collapse
          in={sectionExapnd === clickedId}
          id={"colp-section" + elementLen}
        >
          <Stack
            id="questions"
            className={`dstudio_menu_flx jstfy_contnt ${
              activeClass === "questions" ? "active_menu" : "none"
            }`}
            onClick={(e) => handleActiveClass(e)}
          >
            <Typography
              className={`dstudio_menu_name epd ${
                activeClass === "questions" ? "active_menu" : "none"
              }`}
            >
              Questions
            </Typography>
            <Typography
              className={`dstudio_menu_name ${
                activeClass === "questions" ? "active_menu" : "none"
              }`}
            >
              00
            </Typography>
          </Stack>
        </Collapse>
      </>
    );
  }

  const handleAddSections = () => {
    //setSections(addSections.concat(<SectionsMenu key={addSections.length} uniqueId={addSections.length} />));
    setSections([...addSections, <SectionsMenu key={addSections.length} uniqueId={addSections.length} />]);
  };

  useEffect(() => {
    SectionsMenu("", "");
  }, [anchorEl, showSectionMenu]);

  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        onClick={() =>{selectedDropDown()}}
        sx={{ cursor: "pointer", marginBottom: "24px" }}
      >
        <Typography
          //@ts-ignore
          variant="span"
          sx={{
            fontWeight: "500",
            color: "#2D3648",
            cursor: "pointer",
          }}
          className="go_back_flex"
        >
          <ChevronLeftIcon />
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#2D3648",
          }}
        >
          Go Back
        </Typography>
      </Stack>
      <Stack className="dstudio_test_flx">
        <Box className="dstudio_menu_contr">
          <Typography className="dstudio_menu_title">Create Test</Typography>
          <Stack id="test-information" className={`dstudio_menu_flx ${activeClass === "test-information" ? "active_menu" : "none"}`} onClick={(e) => handleActiveClass(e)}>
            <FactCheckRoundedIcon className={`dstudio_menu_icon ${activeClass === "test-information" ? "active_menu" : "none"}`} sx={{color: "#1C1C29"}} />
            <Typography className={`dstudio_menu_name ${activeClass === "test-information" ? "active_menu" : "none"}`}>Test Information</Typography>
          </Stack>
          <Divider className="dstudio_menu_hr" />
          <Stack id="sections" className={`dstudio_menu_flx jstfy_contnt ${activeClass === "sections" ? "active_menu" : "none"}`}>
            <Stack className="dstudio_menu_innr_flx">
              <AccountTreeRoundedIcon className={`dstudio_menu_icon ${activeClass === "sections" ? "active_menu" : "none"}`} sx={{color: "#1C1C29"}} />
              <Typography className={`dstudio_menu_name ${activeClass === "sections" ? "active_menu" : "none"}`}>Sections</Typography>
            </Stack>
            <AddCircleOutlineRoundedIcon className="dstudio_menu_right_icon" sx={{color: "#2E5DB0", cursor: "pointer"}} onClick={handleAddSections} />
          </Stack>
          {addSections}
          {/* <Stack className={`dstudio_menu_flx jstfy_contnt ${activeClass === "section1" ? "active_menu" : "none"}`} onClick={() => {handleActiveClass("section1"); handleSectionExpand()}}>
            <Stack className="dstudio_menu_innr_flx">
              <DragIndicatorRoundedIcon className={`dstudio_menu_icon eml`} sx={{ color: "#1C1C29" }} />
              <Typography className={`dstudio_menu_name ${activeClass === "section1" ? "active_menu" : "none"}`}>Section 1</Typography>
            </Stack>
            <Stack className="dstudio_menu_innr_flx">
              {sectionExapnd
              ?
                <ExpandLessRoundedIcon className={`dstudio_menu_icon`} sx={{ color: "#5D636B" }} />
              :
                <ExpandMoreRoundedIcon className={`dstudio_menu_icon`} sx={{ color: "#5D636B" }} />
              }
              <MoreVertRoundedIcon className="dstudio_menu_right_icon" sx={{ color: "#5D636B", cursor: "pointer" }} />
            </Stack>
          </Stack> */}
          {/* <Collapse in={sectionExapnd === "section"+elementLen} id={"section"+elementLen}>
            <Stack className={`dstudio_menu_flx jstfy_contnt ${activeClass === "questions" ? "active_menu" : "none"}`} onClick={() => handleActiveClass("questions")}>
              <Typography className={`dstudio_menu_name epd ${activeClass === "questions" ? "active_menu" : "none"}`}>Questions</Typography>
              <Typography className={`dstudio_menu_name ${activeClass === "questions" ? "active_menu" : "none"}`}>00</Typography>
            </Stack>
          </Collapse> */}
          <Divider className="dstudio_menu_hr" />
          <Stack id="preview-test" className={`dstudio_menu_flx ${activeClass === "preview-test" ? "active_menu" : "none"}`} onClick={(e) => handleActiveClass(e)}>
            <VisibilityRoundedIcon className={`dstudio_menu_icon ${activeClass === "preview-test" ? "active_menu" : "none"}`} sx={{color: "#1C1C29"}} />
            <Typography className={`dstudio_menu_name ${activeClass === "preview-test" ? "active_menu" : "none"}`}>Preview Test</Typography>
          </Stack>
        </Box>
        <Box className="dstudio_test_section">
          <TestTitle />
          <SectionTitle />
          {/* <Box className="dstudio_test_contr"> */}
            {/* <TestInformation /> */}
            {/* <SectionInformation /> */}
          {/* </Box> */}
          <AddViewQuestion />
        </Box>
      </Stack>
    </>
  );
};
export default NewTest;
