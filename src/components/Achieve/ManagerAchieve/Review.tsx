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
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { fetchUserActions } from "../../../actions/actionCenter/fetchUserActions";
import { updateUserActionToRead } from "../../../actions/actionCenter/updateUserActionToRead";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";

const Review = ({
  closePopup,
  open,
  selectedDirectReport,
  user,
  selectedGoal,
}: any) => {
  const [tabName, setTabName] = useState("achieve");
  const [userActions, setUserActions] = useState<any>(null);
  const [alignUnreadCount, setAlignUnreadCount] = useState(0);
  const [achieveUnreadCount, setAchieveUnreadCount] = useState(0);
  const tabSwitch = (event: any, newValue: any) => {
    setTabName(newValue);
  };
  const program = useSelector(
    // @ts-ignore
    (state) => state?.user?.program
  );
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const router = useRouter();
  const handleUnreadClick = async (action: any) => {
    console.log(action, "click");
    //@ts-ignore
    await updateUserActionToRead(action);
    return;
  };
  useEffect(() => {
    const getUserActions = async () => {
      try {
        const response = await fetchUserActions({
          userId: selectedDirectReport?.userId,
          programId: selectedDirectReport?.programId,
        });
        //@ts-ignore
        if (response?.userActions) {
          //@ts-ignore
          setUserActions(response?.userActions);
        }
        //@ts-ignore
        const alignUnreadCount = response?.userActions?.filter(
          (action: any) =>
            action.actionType === "Align" &&
            action.unRead &&
            action?.pageLink?.includes(selectedGoal?.id)
        );
        setAlignUnreadCount(alignUnreadCount?.length);
        //@ts-ignore
        const achieveUnreadCount = response?.userActions?.filter(
          (action: any) =>
            action.actionType === "Achieve" &&
            action.unRead &&
            action?.pageLink?.includes(selectedGoal?.id)
        );
        setAchieveUnreadCount(achieveUnreadCount?.length);
      } catch (error) {
        console.log("fech user Action", error);
      }
    };
    getUserActions();
  }, [
    selectedDirectReport?.userId,
    selectedDirectReport?.programId,
  ]);
  console.log(userActions, "userActions");

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
                {selectedDirectReport?.userName?.substring(0, 1)}
              </Avatar>
              <Box textAlign="left">
                <Typography
                  variant="h1"
                  sx={{ fontWeight: "600" }}
                  className="manager_name"
                >
                  {selectedDirectReport?.userName}
                </Typography>
                <Typography sx={{ fontSize: "12px", margin: "4px 0 0" }}>
                  {selectedDirectReport?.designation}
                </Typography>
              </Box>
            </Stack>
            <Box>
              <Button
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#F58A43",
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
                  textTransform: "capitalize",
                  width: "120px !important",
                  padding: "6px 24px !important",
                  fontSize: "12px !important",
                }}
                onClick={() => {
                  router.push(
                    `/employee/profile?employeeId=${selectedDirectReport?.userId}&employeeEmail=${selectedDirectReport?.userEmail}&employeeProgramId=${selectedDirectReport?.programId}&userAlignmentScore=${selectedDirectReport?.alignScore}&userAchievementScore=${selectedDirectReport?.achieveScore}`
                  );
                }}
              >
                Profile
              </Button>
            </Box>
          </Stack>
          <Divider />
          <Stack className="review_emp_dtls">
            <Box>
              <Typography className="subtitle">Goal</Typography>
              <Typography className="subtxt">
                {selectedGoal?.nameAlias
                  ? selectedGoal?.nameAlias
                  : selectedGoal?.name}
              </Typography>
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
                onClick={() => {
                  router.push(
                    `/achieve/employee?userId=${selectedDirectReport?.userId}&programId=${selectedDirectReport?.programId}&goalId=${selectedGoal?.id}&employeeEmail=${selectedDirectReport?.userEmail}`
                  );
                }}
              >
                View
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
                {currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
                  currentUserRole === MANAGER_VIEW_STATE.JP ||
                  (currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                    program?.configMap.enableAlign && (
                      <Tab
                        value="align"
                        label="Align "
                        data-count="1"
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
                        action?.pageLink?.includes(selectedGoal?.id)
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
                          style={{ textDecoration: "none" }}
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
                        action?.pageLink?.includes(selectedGoal?.id)
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
                          style={{ textDecoration: "none" }}
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
