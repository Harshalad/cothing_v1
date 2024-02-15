import {
  Button,
  Box,
  Typography,
  Dialog,
  Tabs,
  Tab,
  DialogContent,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { fetchUserActions } from "../../../../../actions/actionCenter/fetchUserActions";
import { updateUserActionToRead } from "../../../../../actions/actionCenter/updateUserActionToRead";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";

const Review = ({
  closePopup,
  open,
  employeeData,
  goal,
  onCheckJourneyClick,
}: any) => {
  const program = useSelector(
    // @ts-ignore
    (state) => state?.user?.program
  );
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const [tabName, setTabName] = useState("achieve");
  const [userActions, setUserActions] = useState<any>(null);
  const [alignUnreadCount, setAlignUnreadCount] = useState(0);
  const [achieveUnreadCount, setAchieveUnreadCount] = useState(0);
  console.log(goal?.id, goal?.goalId, goal, "GOAAALLL");
  const handleUnreadClick = async (action: any) => {
    //@ts-ignore
    await updateUserActionToRead(action);
    return;
  };
  useEffect(() => {
    const getUserActions = async () => {
      try {
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function (idToken) {
        //   return idToken;
        // });
        console.log({
          userId: employeeData?.id,
          programId: employeeData?.activeProgramId,
        });

        const response = await fetchUserActions({
          userId: employeeData?.id,
          programId: employeeData?.activeProgramId,
        });

        //@ts-ignore
        if (response?.userActions) {
          //@ts-ignore
          setUserActions(response?.userActions);
          //@ts-ignore
          //@ts-ignore
          const alignUnreadCount = response?.userActions?.filter(
            (action: any) =>
              action.actionType === "Align" &&
              action.unRead &&
              action?.pageLink?.includes(goal?.id)
          );
          setAlignUnreadCount(alignUnreadCount?.length);
          //@ts-ignore
          const achieveUnreadCount = response?.userActions?.filter(
            (action: any) =>
              action.actionType === "Achieve" &&
              action.unRead &&
              action?.pageLink?.includes(goal?.id)
          );
          setAchieveUnreadCount(achieveUnreadCount?.length);
        }
      } catch (error) {
        console.error(error, " ERROR getUserActions");
      }
    };
    getUserActions();
  }, [employeeData?.activeProgramId, employeeData?.id]);

  const tabSwitch = (event: any, newValue: any) => {
    setTabName(newValue);
  };

  const alignMsgCount = alignUnreadCount ? (
    <Box className="msg_box">
      <Typography className="msg_count">{alignUnreadCount}</Typography>
    </Box>
  ) : null;

  const achieveMsgCount = achieveUnreadCount ? (
    <Box className="msg_box">
      <Typography className="msg_count">{alignUnreadCount}</Typography>
    </Box>
  ) : null;

  console.log(userActions, goal?.id);
  return (
    <>
      <Dialog
        className="review_modal"
        open={open}
        sx={{ textAlign: "center", padding: "30px" }}
      >
        <CloseIcon
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: "1",
            cursor: "pointer",
          }}
          onClick={() => {
            closePopup(false);
          }}
        />
        <DialogContent>
          <Stack className="review_emp_dtls">
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
                {employeeData?.name?.substring(0, 1)}
              </Avatar>
              <Box textAlign="left">
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
              </Box>
            </Stack>
            {/* <Box>
              <Link href="/employee-profile-details">
                <Button
                  sx={{
                    color: "#FFFFFF",
                    backgroundColor: "#F58A43",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#F58A43",
                      boxShadow: "none",
                    },
                    textTransform: "capitalize",
                    width: "120px !important",
                    padding: "6px 24px !important",
                    fontSize: "12px !important",
                  }}
                >
                  View Profile
                </Button>
              </Link>
            </Box> */}
          </Stack>
          <Divider />
          <Stack className="review_emp_dtls">
            <Box>
              <Typography className="subtitle">Goal</Typography>
              <Typography className="subtxt">{goal?.name}</Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  color: "#F58A43",
                  border: "1px solid #F58A43",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                  textTransform: "capitalize",
                  width: "135px !important",
                  padding: "6px 24px !important",
                  fontSize: "12px !important",
                }}
                onClick={onCheckJourneyClick}
              >
                Check Journey
              </Button>
            </Box>
          </Stack>
          <Divider />
          {/* <Box className="review_tab_box">
            <Box className="review_tab_header">
              <Tabs
                value={tabName}
                onChange={tabSwitch}
                centered
                className="review_tabs"
              >
                {currentUserRole === MANAGER_VIEW_STATE.EXPERT || currentUserRole === MANAGER_VIEW_STATE.JP ||
                  (currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                    program?.configMap.enableAlign && (
                      <Tab
                        value="align"
                        label="Align "
                        //@ts-ignore
                        icon={alignUnreadCount == 0 ? "" : alignUnreadCount}
                        iconPosition="end"
                        sx={{ textTransform: "capitalize" }}
                      />
                    ))}
                <Tab
                  value="achieve"
                  //@ts-ignore
                  icon={achieveUnreadCount === 0 ? "" : achieveUnreadCount}
                  iconPosition="end"
                  label="Achieve "
                  sx={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <Box className="review_tab_content">
              {tabName === "align" ? (
                <>
                  {userActions
                    ?.filter((action: any) => {
                      return (
                        action.actionType === "Align" &&
                        action?.pageLink?.includes(goal?.id)
                      );
                    })
                    ?.map((action: any, index: number) => {
                      return (
                        <Link
                          href={action?.pageLink}
                          key={index}
                          onClick={() =>
                            handleUnreadClick(action?.actionCompleteId)
                          }
                        >
                          <Box className="review_goals_msg" key={index}>
                            <Box
                              className={`review_msg_box ${
                                action?.unRead ? "new_msg" : ""
                              }`}
                            >
                              <Typography className="review_msg">
                                {action?.statement}
                              </Typography>
                            </Box>
                            <Divider className="review_msg_divider" />
                          </Box>
                        </Link>
                      );
                    })}
                </>
              ) : tabName === "achieve" ? (
                <>
                  {userActions
                    ?.filter((action: any) => {
                      return (
                        action.actionType === "Achieve" &&
                        action?.pageLink?.includes(goal?.id)
                      );
                    })
                    ?.map((action: any, index: number) => {
                      console.log(action);
                      return (
                        <Link
                          href={action?.pageLink}
                          key={index}
                          onClick={() =>
                            handleUnreadClick(action?.actionCompleteId)
                          }
                        >
                          <Box className="review_goals_msg" key={index}>
                            <Box
                              className={`review_msg_box ${
                                action?.unRead ? "new_msg" : ""
                              }`}
                            >
                              <Typography className="review_msg">
                                {action?.statement}
                              </Typography>
                            </Box>
                            <Divider className="review_msg_divider" />
                          </Box>
                        </Link>
                      );
                    })}
                </>
              ) : null}
            </Box>
          </Box> */}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Review;
