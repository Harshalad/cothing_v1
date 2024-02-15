import { Box, Drawer, Link, Typography } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined";
import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useState } from "react";
import { useRouter } from "next/router";

interface AppDrawerProps {
  drawerVisible: boolean;
  setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const AppDrawer = ({ drawerVisible, setDrawerVisible }: AppDrawerProps) => {
  // return (
  // <Box
  //   component="nav"
  //   sx={{
  //     width: { mobile: "calc(100% - 200px)", tablet: "calc(100% - 250px)" },
  //     ml: { tablet: "auto" },
  //   }}
  // >
  {
    /* <Drawer
          variant="persistent"
        open={drawerVisible}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { mobile: "block", tablet: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "200px",
            backgroundColor: "#F58A43",
            border: 0,
            padding: "0 15px",
          },
        }}
      >
        <DrawerContent
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
      </Drawer> */
  }
  return (
    <Drawer
      sx={{
        // display: { mobile: "none", tablet: "block" },
        width: "250px",
        // flexShrink: 0,
        // "& .MuiDrawer-paper": {
        //   width: "250px",
        //   boxSizing: "border-box",
        //   backgroundColor: "#F58A43",
        //   border: 0,
        //   padding: "0 25px",
        // },
      }}
      variant="persistent"
      anchor="left"
    >
      <DrawerContent
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
    </Drawer>
    // </Box>
  );
};

export default AppDrawer;

const DrawerContent = ({ drawerVisible, setDrawerVisible }: any) => {
  const router = useRouter();
  return (
    <>
      {/* <HighlightOffRoundedIcon
        sx={{
          position: "absolute",
          right: "10px",
          top: "8px",
          cursor: "pointer",
          color: "#FFFFFF",
          display: { tablet: "none" },
        }}
        onClick={() => setDrawerVisible(false)}
      /> */}
      <Box className="drawerLogo">
        <img src="/images/logo.png" alt="logoo" width={175} height={40}></img>
      </Box>
      <Box className="drawerMenu">
        {/* <Link href="/action-center" style={{ textDecoration: "none" }}> */}
        <Box
          className={`drawerMenuList ${
            router?.pathname === "/action-center" ? "activeMenu" : ""
          }`}
        >
          <TrackChangesOutlinedIcon className="drawerMenuIcon" />
          <Typography
            //@ts-ignore
            variant="span"
            className="drawerMenuText"
            sx={{ color: "#fff", fontWeight: "500" }}
          >
            Action Center
          </Typography>
        </Box>
        {/* </Link> */}
      </Box>
      <Box className="drawerMenu">
        <Link href="/align" style={{ textDecoration: "none" }}>
          <Box
            className={`drawerMenuList ${
              router?.pathname === "/align" ? "activeMenu" : ""
            }`}
          >
            <AlignHorizontalLeftOutlinedIcon className="drawerMenuIcon" />
            <Typography
              //@ts-ignore
              variant="span"
              className="drawerMenuText"
              sx={{ color: "#fff", fontWeight: "500" }}
            >
              Align
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className="drawerMenu">
        {/* <Link href="/achieve" style={{ textDecoration: "none" }}> */}
        <Box
          className={`drawerMenuList ${
            router?.pathname === "/achieve" ? "activeMenu" : ""
          }`}
        >
          <GpsFixedOutlinedIcon className="drawerMenuIcon" />
          <Typography
            //@ts-ignore
            variant="span"
            className="drawerMenuText"
            sx={{ color: "#fff", fontWeight: "500" }}
          >
            Achieve
          </Typography>
        </Box>
        {/* </Link> */}
      </Box>
      <Box className="drawerMenu">
        {/* <Link href="/chat" style={{ textDecoration: "none" }}> */}
        <Box
          className={`drawerMenuList ${
            router?.pathname === "/chat" ? "activeMenu" : ""
          }`}
        >
          <ChatOutlinedIcon className="drawerMenuIcon" />
          <Typography
            //@ts-ignore
            variant="span"
            className="drawerMenuText"
            sx={{ color: "#fff", fontWeight: "500" }}
          >
            Chat
          </Typography>
        </Box>
        {/* </Link> */}
      </Box>
      <Box className="drawerMenu">
        <Link href="/prepare" style={{ textDecoration: "none" }}>
          <Box
            className={`drawerMenuList ${
              router?.pathname === "/prepare" ? "activeMenu" : ""
            }`}
          >
            <ContentPasteOutlinedIcon className="drawerMenuIcon" />
            <Typography
              //@ts-ignore
              variant="span"
              className="drawerMenuText"
              sx={{ color: "#fff", fontWeight: "500" }}
            >
              Prep Work
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className="drawerMenu">
        {/* <Link href="/assure" style={{ textDecoration: "none" }}> */}
        <Box
          className={`drawerMenuList ${
            router?.pathname === "/assure" ? "activeMenu" : ""
          }`}
        >
          <BeenhereOutlinedIcon className="drawerMenuIcon" />
          <Typography
            //@ts-ignore
            variant="span"
            className="drawerMenuText"
            sx={{ color: "#fff", fontWeight: "500" }}
          >
            Analyze
          </Typography>
        </Box>
        {/* </Link> */}
      </Box>
    </>
  );
};
