import { Stack, Box, Typography } from "@mui/material";
import Link from "next/link";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";
import { fetchConceptPrimerByContentId } from "../../../actions/achieve/fetchConceptPrimerByContentId";
import { useSelector } from "react-redux";
import styles from "./InlineConceptPrimer.module.scss";
import { logUserEngagement } from "../../../actions/actionCenter/logUserEngagement";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";

const InlineConceptPrimer = ({
  supportingMethod,
  index,
  setIFrameTitle,
  setIFrameLink,
  getIFrame,
  goal,
  mainMethod,
  milestone,
  setMediaType
}: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const [conceptPrimerLoading, setConceptPrimerLoading] = useState(false);
  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );
  const onLinkClick = async (e: any) => {
    try {
      if (currentUserRole === MANAGER_VIEW_STATE.LP) {
        logUserEngagement({
          userId: user?.id,
          //@ts-ignore
          goalId: goal?.id,
          programId: user?.activeProgramId,
          type: "curiosity",
          action: "employee_cp_opened",
          //@ts-ignore
          contentName: mainMethod?.type,
          contentId: supportingMethod?.contentId,
          milestoneId: milestone?.id,
          marks: 2,
        });
      }

      setConceptPrimerLoading(true);
      //@ts-ignore
      // let  = await firebaseUser.getIdToken().then(function(idToken){
      //   return idToken
      // })
      const response: any = await fetchConceptPrimerByContentId({
        contentId: supportingMethod?.contentId,
        userId: user?.id,
        programId: user?.activeProgramId,
        goalId: goal?.id,
        methodTitle: mainMethod?.title,
      });
      if (response?.openNewTab?.toLowerCase() === "yes") {
        window.open(response?.contentLink, "_blank");
        return;
      }

      console.log(response, "CONTENT LINK");
      setIFrameTitle("Additional Resource on "+supportingMethod?.title);
      //   setIFrameLink(supportingMethod?.contentLink);
      setIFrameLink(response?.contentLink);
      setMediaType(response?.mediaType)
      getIFrame(e);
    } catch (error) {
      console.log(error);
    } finally {
      setConceptPrimerLoading(false);
    }
  };
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      className="addtnl_rscrs"
      key={index}
      sx={{ cursor: "pointer" }}
    >
      <Box>
        <Stack flexDirection="row" gap="20px" alignItems="center">
          <Stack flexDirection="row" gap="4px" alignItems="center">
            <FiberManualRecordIcon
              style={{
                width: "15px",
                height: "15px",
                color: "#C8CDD4",
              }}
            />
            <div
              //@ts-ignore
              href={supportingMethod?.contentLink}
              target="extrnlCntnt"
              //@ts-ignore
              datatitle={supportingMethod?.title}
              rel="noopener noreferrer nofollow"
              style={{
                fontSize: "13px",
                color: "#2E5DB0",
                textDecoration: "none",
              }}
              onClick={(e) => onLinkClick(e)}
            >
              {supportingMethod?.title} |{" "}
              <span style={{color:"black"}}>
                {supportingMethod?.duration ? supportingMethod?.duration : "15"}{" "}
                min
              </span>
            </div>
            {conceptPrimerLoading ? <Loader /> : null}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default InlineConceptPrimer;

const Loader = () => {
  return (
    <div className={styles.bouncingLoader}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
