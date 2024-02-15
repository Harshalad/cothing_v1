import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createUserTestMap } from "../../actions/assessment/createUserTestMap";
import { fetchUserTestDetailsApi } from "../../actions/assessment/fetchTestDetails";
import { fetchUserEventId } from "../../actions/event/fetchUserEventId";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner/Spinner";
import { Box, Stack, Typography } from "@mui/material";
import { fetchConceptPrimerByContentId } from "../../actions/achieve/fetchConceptPrimerByContentId";
import { completeMethodStatus } from "../../actions/status-update/completeMethodStatus";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import VideoPlayer from "../VideoPlayer";
const drawerWidth = 250;
export const Redirecting = () => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const router = useRouter();
  const [methodType, setMethodType] = useState<any>(null);
  const [contentId, setContentId] = useState<any>(null);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [attemptNo, setAttemptNo] = useState<any>(null);
  const [goalId, setGoalId] = useState<any>(null);
  const [milestoneId, setMilestoneId] = useState<any>(null);
  const [methodId, setMethodId] = useState<any>(null);
  const [userMethodContentId, setUserMethodContentId] = useState<any>(null);
  const [methodTitle, setMethodTitle] = useState<any>(null);
  const [link, setLink] = useState<any>(null);
  const [cpName, setCpName] = useState<any>("");
  const [viewState, setViewState] = useState<any>("");
  const [mediaType, setMediaType] = useState<any>(null);
  useEffect(() => {
    router?.query?.methodId ? setMethodId(router?.query?.methodId) : null;
    router?.query?.methodType ? setMethodType(router?.query?.methodType) : null;
    router?.query?.contentId ? setContentId(router?.query?.contentId) : null;
    router?.query?.startDate ? setStartDate(router?.query?.startDate) : null;
    router?.query?.endDate ? setEndDate(router?.query?.endDate) : null;
    router?.query?.attemptNo ? setAttemptNo(router?.query?.attemptNo) : null;
    router?.query?.goalId ? setGoalId(router?.query?.goalId) : null;
    router?.query?.milestoneId
      ? setMilestoneId(router?.query?.milestoneId)
      : null;
    router?.query?.userMethodContentId
      ? setUserMethodContentId(router?.query?.userMethodContentId)
      : null;
    router?.query?.methodTitle ? setMethodTitle(router?.query?.methodTitle) : null;
  }, [router?.isReady]);

  useEffect(() => {
    const test = async () => {
      const response = await createUserTestMap({
        userId: user?.id,
        testId: contentId,
        startDate: startDate,
        endDate: endDate,
        attemptNo: attemptNo,
        role: currentUserRole,
        type: methodType,
        programId: user?.activeProgramId,
        userGoalId: goalId,
        milestoneId: milestoneId,
        methodId: methodId,
      });
      // console.log(response,"utmresponse");
      if (response) {
        const utmId = response;
        const testResponse = await fetchUserTestDetailsApi({
          userTestMapId: utmId,
        });
        // console.log(testResponse,"testResponse");
        //@ts-ignore
        if (testResponse?.response === null) {
          //@ts-ignore
          toast.error(testResponse?.extra);
          router.push("/action-center");
        } else {
          router.push({
            pathname: "/assessment",
            query: {
              //@ts-ignore
              id: utmId,
              comingFrom: "action-center"
            },
          });
        }
      }
    };

    const eventSelectSlots = () => {
      if (userMethodContentId !== null && userMethodContentId?.length !== 0) {
        router.push({
          pathname: "/events",
          query: {
            id: userMethodContentId,
          },
        });
      } else {
        router.push({
          pathname: "pre-events",
          query: {
            id: contentId,
            role: "PARTICIPANT",
            goalId: goalId,
            milestoneId: milestoneId,
            methodId: methodId,
          },
        });
      }
    };

    const eventPresecheduled = async () => {
      if (userMethodContentId !== null && userMethodContentId?.length !== 0) {
        router.push({
          pathname: "/events",
          query: {
            id: userMethodContentId,
            from:"action-center"
          },
        });
      } else {
        const response = await fetchUserEventId({
          userId: user?.id,
          methodId: methodId,
          milestoneId: milestoneId,
          goalId: goalId,
          programId: user?.activeProgramId,
          eventConfigId: contentId,
        });
        //@ts-ignore
        if (response.statusCode === 0) {
          router.push({
            pathname: "/events",
            query: {
              //@ts-ignore
              id: response?.response,
            },
          });
        } else {
          toast.error("Event has not been configured");
          return;
        }
      }
    };
    const conceptPrimerCase = async () => {
      const response: any = await fetchConceptPrimerByContentId({
        contentId: contentId,
        userId: user?.id,
        programId: user?.activeProgramId,
        goalId: goalId,
        methodTitle: methodTitle,
      });


      const newResponse = await completeMethodStatus({
        programId: user?.activeProgramId,
        goalId: goalId,
        methodId: methodId,
        milestoneId: milestoneId,
        userId: user?.id
      });
      console.log(response, mediaType, "responseCP");
      //@ts-ignore
      // window.open(response?.contentLink, "_blank");
      setLink(response?.contentLink);
      setViewState("CP");
      setCpName(response?.name);
      setMediaType(response?.mediaType)
      // router.push("action-center");

    }

    if (methodType === "test") test();
    else if (methodType === "event_select_slots") eventSelectSlots();
    else if (methodType === "event_presecheduled") eventPresecheduled();
    else if (methodType === "concept_primer") conceptPrimerCase();
  }, [
    methodType,
    contentId,
    startDate,
    endDate,
    milestoneId,
    goalId,
    attemptNo,
    methodId,
    userMethodContentId
  ]);
  return (
    <>
      {viewState === "CP" ? <>
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
            className="mngr_action_center"
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              gap="15px"
              justifyContent="space-between"
              mb="24px"
            >
              <Stack flexDirection="row" alignItems="center" gap="20px">
                <Typography
                  //@ts-ignore
                  variant="span"
                  sx={{
                    fontWeight: "500",
                    color: "#2D3648",
                    cursor: "pointer",
                  }}
                  className="go_back_flex"
                  onClick={() => router.push("action-center")}
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
                  {cpName}
                </Typography>
              </Stack>
            </Stack>
            <Box>
              {mediaType !== null && mediaType !== undefined && mediaType === "video" ? (
                <VideoPlayer link={link} />
              ) : (
                <iframe
                  style={{ width: "100%", height: "68vh" }}
                  id="frame"
                  src={link}
                  name="extrnlCntnt"
                  title="external content"
                ></iframe>
              )}
            </Box>

          </Box>
        </Box>
      </> : <>
        <Spinner />
        <Typography
          variant="h2"
          align="center"
          color="#1C2129"
          sx={{ fontWeight: "700" }}
          className="feature_title"
        >
          Redirecting
        </Typography>
      </>}

    </>
  );
};
