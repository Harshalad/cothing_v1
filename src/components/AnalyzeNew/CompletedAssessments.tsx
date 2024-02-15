import { Avatar, AvatarGroup, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CompletedAssessments = ({
  activeClass,
  selfCompletedAssessment,
  seekCompletedAssessment,
  feedbackcompletedAssessments,
}: any) => {
  const [completedAssessment, setCompletedAssessment] = useState<any>(null);
  useEffect(() => {
    if (activeClass === "one") {
      setCompletedAssessment(selfCompletedAssessment);
    } else if (activeClass === "two") {
      setCompletedAssessment(seekCompletedAssessment);
    } else if (activeClass === "four") {
      setCompletedAssessment(feedbackcompletedAssessments);
    }
  }, [
    activeClass,
    selfCompletedAssessment,
    seekCompletedAssessment,
    feedbackcompletedAssessments,
  ]);
  console.log(completedAssessment, "completedAssessment");
  return (
    <>
      <Stack className="active_assmnts_card_flx">
        {completedAssessment?.map((assessment: any, index: any) => {
          return (
            <Box className="active_assmnts_card" key={index}>
              <Typography className="active_assmnts_name">
                {assessment?.name}
              </Typography>
              <Stack>
                {assessment?.skillsString && <Typography className="avlbl_assmnts_skills">
                  Skills evaluated : {assessment?.skillsString}
                </Typography>}
                <Typography className="active_assmnts_end_date">
                  Completed On :{" "}
                  {assessment?.completedDate
                    ? new Date(assessment?.completedDate).toLocaleDateString()
                    : "Not available"}
                </Typography>
              </Stack>
              {activeClass !== "one" ? (
                <Stack className="active_assmnts_profile_flx">
                  <AvatarGroup max={3}>
                    {assessment?.completedBy
                      ?.slice(0, 3)
                      .map((name: any, indexx: any) => {
                        return (
                          <Avatar
                          key={indexx}
                            sx={{
                              width: "24px",
                              height: "24px",
                              bgcolor: "#DFFFF2",
                              color: "#1BAD70",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {name[0]}
                          </Avatar>
                        );
                      })}
                    {/* <Avatar
                      sx={{
                        width: "24px",
                        height: "24px",
                        bgcolor: "#E8E3FF",
                        color: "#6755C3",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      S
                    </Avatar>
                    <Avatar
                      sx={{
                        width: "24px",
                        height: "24px",
                        bgcolor: "#D9F6FF",
                        color: "#55B6C3",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      N
                    </Avatar> */}
                  </AvatarGroup>
                  <Typography className="active_assmnts_profile_title">
                    {activeClass === "two"
                      ? `Completed by ${assessment?.completedBy?.length} people`
                      : `Requested by ${assessment?.requestedBy}`}
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
              {/* {activeClass !== "four" ? (
                <Box className="analyze_cta">
                  <Button className="outlined_cta">View Report</Button>
                </Box>
              ) : (
                ""
              )} */}
            </Box>
          );
        })}
        {/* <Box className="active_assmnts_card">
          <Typography className="active_assmnts_name">
            Survey name Evaluate Your Work on the Project and 2nd lines of text
          </Typography>
          <Typography className="avlbl_assmnts_skills">
            Skills evaluated : Skill Tag 1 | Skill Tag 2
          </Typography>
          <Typography className="active_assmnts_end_date">
            Completed On : 02/09/2023
          </Typography>
          {activeClass !== "one" ? (
            <Stack className="active_assmnts_profile_flx">
              <AvatarGroup max={3}>
                <Avatar
                  sx={{
                    width: "24px",
                    height: "24px",
                    bgcolor: "#DFFFF2",
                    color: "#1BAD70",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  G
                </Avatar>
                <Avatar
                  sx={{
                    width: "24px",
                    height: "24px",
                    bgcolor: "#E8E3FF",
                    color: "#6755C3",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  S
                </Avatar>
                <Avatar
                  sx={{
                    width: "24px",
                    height: "24px",
                    bgcolor: "#D9F6FF",
                    color: "#55B6C3",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  N
                </Avatar>
              </AvatarGroup>
              <Typography className="active_assmnts_profile_title">
                {activeClass === "two"
                  ? "Completed by 4 people"
                  : "Requested by 4 people"}
              </Typography>
            </Stack>
          ) : (
            ""
          )}
          {activeClass !== "four" ? (
            <Box className="analyze_cta">
              <Button className="outlined_cta">View Report</Button>
            </Box>
          ) : (
            ""
          )}
        </Box> */}
      </Stack>
    </>
  );
};
export default CompletedAssessments;
