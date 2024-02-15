import { Box, Typography, Tooltip } from "@mui/material";
import { useState } from "react";

const MileLocator = ({
  section,
  mileLocationCssName,
  subMileLocationIndexMap,
  index,
  worksheet,
  showPrepQuestionnaire,
  setPrepQuestionnaire,
  accordName,
  viewQuestionnaire,
  pickWorksheetFrom,
  displayMode,
  setDisplayMode,
  DISPLAY_MODES,
}: any) => {
  const [showTooltip, setTooltip] = useState("default");
  const [showPrepSections, setPrepSections] = useState("3");
  const handleTooltipOpen = (value: any) => {
    setTooltip(
      value === `section${index + 1}` ||
        value === "quest1" ||
        value === "quest2" ||
        value === "quest3" ||
        value === "quest_inprogress"
        ? value
        : false
    );
  };

  const handleTooltipClose = () => {
    //@ts-ignore
    setTooltip(false);
  };

  const closePopup = (value: any) => {
    setPrepQuestionnaire(value);
    accordName = "";
  };

  const openQuestionnairePopup = (value: any) => {
    setPrepQuestionnaire(value);
  };

  const questionsAnswered = section?.promptQuestionsMap?.filter(
    (questionAnswerObject: any, index: number) =>
      questionAnswerObject?.answer !== "" &&
      questionAnswerObject?.answer !== null
  );
  return (
    <>
      <Box className={`mile_locator_${mileLocationCssName}`}>
        <Box className="mile_marker_box">
          <Tooltip
            open={
              showTooltip === `section${index + 1}` ||
              questionsAnswered?.length === 0
            }
            onClose={handleTooltipClose}
            title={index === 0 ? "Click here to get started" : null}
            disableTouchListener
            placement="left-start"
            slotProps={{
              tooltip: {
                className: "section_tooltip",
              },
            }}
          >
            {questionsAnswered?.length === 0 ? (
              <img
                className="marker_image"
                src="/images/marker-grey.png"
                alt="current mile"
                width={46}
                height={71}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("clicked 1");
                  handleTooltipOpen(`section${index + 1}`);
                  viewQuestionnaire(`panel${index + 1}`);
                  setDisplayMode(DISPLAY_MODES.QUESTIONNAIRE);
                }}
                onMouseEnter={() => handleTooltipOpen(`section${index + 1}`)}
              />
            ) : showTooltip === `section${index + 1}` ? (
              <img
                className="marker_image"
                src="/images/marker-orange.png"
                alt="current mile"
                width={46}
                height={71}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("clicked 2");
                  viewQuestionnaire(`panel${index + 1}`);
                  setDisplayMode(DISPLAY_MODES.QUESTIONNAIRE);
                }}
                // onMouseEnter={() => handleTooltipOpen(`section${index+1}`')}
              />
            ) : (
              <img
                className="marker_image"
                src="/images/marker-orange.png"
                alt="current mile"
                width={46}
                height={71}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("clicked 3");
                  handleTooltipOpen(`section${index + 1}`);
                  viewQuestionnaire(`panel${index + 1}`);
                  setDisplayMode(DISPLAY_MODES.QUESTIONNAIRE);
                }}
                onMouseEnter={() => handleTooltipOpen(`section${index + 1}`)}
              />
            )}
          </Tooltip>
          <Typography className="mile_title">
            <span className="mile_number">0{index + 1}</span>
            <br />
            <span className="goal_name">{section?.name}</span>
          </Typography>
        </Box>
        {subMileLocationIndexMap[mileLocationCssName]?.[0] && (
          <>
            <Box
              className={`submile_${subMileLocationIndexMap[mileLocationCssName]?.[0]}`}
            >
              {section?.promptQuestionsMap?.length && (
                <Tooltip
                  open={showTooltip === "quest1"}
                  onClose={handleTooltipClose}
                  title={
                    <>
                      <Box className="tooltip_box">
                        <Typography className="tooltip_quest">
                          {section?.promptQuestionsMap?.[0]?.question}
                        </Typography>
                        <Typography className="tooltip_answ">
                          {section?.promptQuestionsMap?.[0]?.answer}
                        </Typography>
                      </Box>
                    </>
                  }
                  disableTouchListener
                  placement="bottom-start"
                  slotProps={{
                    tooltip: {
                      className: section?.promptQuestionsMap?.[0]?.answer
                        ? "question_tooltip"
                        : "question_inprogress_tooltip",
                    },
                  }}
                >
                  {section?.promptQuestionsMap?.[0]?.answer ? (
                    <img
                      className="prep_image"
                      src="/images/prep-orange.png"
                      alt="sub milestone completed"
                      width={22}
                      height={22}
                      // style={{ cursor: "pointer" }}
                      onClick={() => handleTooltipOpen("quest1")}
                      onMouseEnter={() => handleTooltipOpen("quest1")}
                    />
                  ) : section?.promptQuestionsMap?.[0]?.question ? (
                    <img
                      className="prep_image"
                      src="/images/prep-white.png"
                      alt="sub milestone not started"
                      width={22}
                      height={22}
                      // style={{ cursor: "pointer" }}
                      onClick={() => handleTooltipOpen("quest_inprogress")}
                      onMouseEnter={() => handleTooltipOpen("quest_inprogress")}
                    />
                  ) : (
                    <></>
                  )}
                </Tooltip>
              )}
              <Box
                className={`submile_${subMileLocationIndexMap[mileLocationCssName]?.[1]}`}
              >
                <Tooltip
                  open={showTooltip === "quest2"}
                  onClose={handleTooltipClose}
                  title={
                    section?.promptQuestionsMap?.[1]?.answer ? (
                      <>
                        <Box className="tooltip_box">
                          <Typography className="tooltip_quest">
                            {section?.promptQuestionsMap?.[1]?.question}
                          </Typography>
                          <Typography className="tooltip_answ">
                            {section?.promptQuestionsMap?.[1]?.answer}
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box className="quest_inr_tooltip_box">
                          <img
                            className="prep_prog_img"
                            src="/images/prep-prog.png"
                            alt="sub milestone not started"
                            width={48}
                            height={57}
                          ></img>
                          <Typography className="quest_inr_tooltip">
                            <>Preparation In Progress</>
                          </Typography>
                        </Box>
                      </>
                    )
                  }
                  disableTouchListener
                  placement="top"
                  slotProps={{
                    tooltip: {
                      className: section?.promptQuestionsMap?.[1]?.answer
                        ? "question_tooltip"
                        : "question_inprogress_tooltip",
                    },
                  }}
                >
                  {section?.promptQuestionsMap?.[1]?.answer ? (
                    <img
                      className="prep_image"
                      src="/images/prep-orange.png"
                      alt="sub milestone completed"
                      width={22}
                      height={22}
                      // style={{ cursor: "pointer" }}
                      onClick={() => handleTooltipOpen("quest2")}
                      onMouseEnter={() => handleTooltipOpen("quest2")}
                    />
                  ) : section?.promptQuestionsMap?.[1]?.question ? (
                    <img
                      className="prep_image"
                      src="/images/prep-white.png"
                      alt="sub milestone not started"
                      width={22}
                      height={22}
                      // style={{ cursor: "default" }}
                      onClick={() => handleTooltipOpen("quest_inprogress")}
                      onMouseEnter={() => handleTooltipOpen("quest_inprogress")}
                    />
                  ) : (
                    <></>
                  )}
                </Tooltip>
                <Box
                  className={`submile_${subMileLocationIndexMap[mileLocationCssName]?.[2]}`}
                >
                  <Tooltip
                    open={showTooltip === "quest3"}
                    onClose={handleTooltipClose}
                    title={
                      section?.promptQuestionsMap?.[2]?.answer ? (
                        <>
                          <Box className="tooltip_box">
                            <Typography className="tooltip_quest">
                              {section?.promptQuestionsMap?.[2]?.question}
                            </Typography>
                            <Typography className="tooltip_answ">
                              {section?.promptQuestionsMap?.[2]?.answer}
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box className="quest_inr_tooltip_box">
                            <img
                              className="prep_image"
                              src="/images/prep-prog.png"
                              alt="sub milestone not started"
                              width={48}
                              height={57}
                            ></img>
                            <Typography className="quest_inr_tooltip">
                              <>Preparation In Progress</>
                            </Typography>
                          </Box>
                        </>
                      )
                    }
                    disableTouchListener
                    placement="top"
                    slotProps={{
                      tooltip: {
                        className: section?.promptQuestionsMap?.[1]?.answer
                          ? "question_tooltip"
                          : "question_inprogress_tooltip",
                      },
                    }}
                  >
                    {section?.promptQuestionsMap?.[2]?.answer ? (
                      <img
                        className="prep_image"
                        src="/images/prep-orange.png"
                        alt="sub milestone completed"
                        width={22}
                        height={22}
                        // style={{ cursor: "pointer" }}
                        onClick={() => handleTooltipOpen("quest3")}
                        onMouseEnter={() => handleTooltipOpen("quest3")}
                      />
                    ) : section?.promptQuestionsMap?.[2]?.question ? (
                      <img
                        className="prep_image"
                        src="/images/prep-white.png"
                        alt="sub milestone not started"
                        width={22}
                        height={22}
                        // style={{ cursor: "pointer" }}
                        onClick={() => handleTooltipOpen("quest_inprogress")}
                        onMouseEnter={() =>
                          handleTooltipOpen("quest_inprogress")
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </Tooltip>
                  {/* <img
                    src="/images/prep-white.png"
                    alt="sub milestone not started"
                    width={22}
                    height={22}
                  ></img> */}
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default MileLocator;
