import { Box, Stack, Avatar, Typography, Divider } from "@mui/material";
import { NEXT_6_MONTHS_FOCUS_OPTIONS } from "../../../constants/profile";
import { ACHIEVE_VIEW_STATES } from "../../../constants/achieve";
import  { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserDetails = ({ employeeData, viewState, setViewState }: any) => {
  const router = useRouter();
  const [viewQp, setViewQp]= useState(false);
  useEffect(()=>{
    if (router.route.includes("achieve") || router.route.includes("align")) {
      setViewQp(true);
    }
  },[])
  return (
    <Box className="manager_details_flex">
      <Stack
        sx={{
          borderRadius: "16px",
          border: "1px solid #EAECEF",
          backgroundColor: "#fff",
          padding: "15px",
        }}
        className="manager_info"
      >
        <Stack flexDirection="row" gap="24px" alignItems="center">
          <Avatar
            sx={{
              bgcolor: "#DFFFF2",
              color: "#1BAD70",
              fontWeight: "700",
              border: "1px solid #1BAD70",
            }}
            className="manager_avatar"
          >
            {employeeData?.name.substring(0, 1)}
          </Avatar>
          <Box>
            <Typography
              variant="h1"
              sx={{ fontWeight: "600" }}
              className="manager_name"
            >
              {employeeData?.name}
            </Typography>
            <Typography sx={{ fontSize: "12px", margin: "4px 0 0" }}>
              {employeeData?.designation}
            </Typography>
            {viewState ? (
              <Typography
                sx={{
                  color: "#2E5DB0",
                  fontWeight: "500",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setViewState(ACHIEVE_VIEW_STATES.RECENT_ACTIVITY)
                }
              >
                View Recent Activity
              </Typography>
            ) : null}
            {viewQp && (
              <Typography
                className="emp_info_title"
                onClick={() =>
                  router.push({
                    pathname: "/quick-preparation",
                    query: {
                      employeeEmail: employeeData?.email,
                    },
                  })
                }
                style={{
                  paddingTop: "4px",
                  textDecoration: "none",
                  color: "#2E5DB0",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                View Tools
              </Typography>
            )}
          </Box>
        </Stack>
      </Stack>
      <Stack
        sx={{
          borderRadius: "16px",
          border: "1px solid #EAECEF",
          backgroundColor: "#fff",
          padding: "15px",
        }}
        className="manager_role inner_flex"
      >
        <Box className="inner_flex_box">
          <Typography className="inner_title">Team</Typography>
          <Typography sx={{ fontSize: "12px", color: "#5D636B" }}>
            {employeeData?.department}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ color: "#EAECEF" }}
          flexItem
        />
        <Box className="inner_flex_box">
          <Typography className="inner_title">
            Primary Reporting Manager
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#5D636B" }}>
            {employeeData?.manager}
          </Typography>
        </Box>
      </Stack>
      <Stack
        sx={{
          borderRadius: "16px",
          border: "1px solid #EAECEF",
          backgroundColor: "#fff",
          padding: "15px",
        }}
      >
        <Typography className="inner_title">
          One thing employee wants to focus on for next 06 months
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#5D636B" }}>
          {
            //@ts-ignore
            NEXT_6_MONTHS_FOCUS_OPTIONS[employeeData?.nextSixMonthsFocus]
          }
        </Typography>
      </Stack>
    </Box>
  );
};

export default UserDetails;
