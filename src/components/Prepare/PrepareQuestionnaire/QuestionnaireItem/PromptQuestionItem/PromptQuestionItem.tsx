import { Box, Typography, TextField } from "@mui/material";

const PromptQuestionItem = ({
  questionAnswerObject,
  localSection,
  setLocalSection,
  promptQuestion,
  index,
  storedAnswer,
  currentAnswer,
  setCurrentAnswer,
  canEdit,
  canView,
}: any) => {
  console.log("canEdit 1234567", canEdit);

  return (
    <Box key={index}>
      <Box
        className="prep_quest_box"
        sx={{
          backgroundColor: "#3E4248",
        }}
        // sx={{
        //   backgroundColor: showQuestOneReadOnly ? "#989EA5" : "#3E4248",
        // }}
      >
        <Typography className="prep_quest">{promptQuestion}</Typography>
      </Box>
      <Box className="prep_textfld">
        {currentAnswer && (
          <Box className="loader">
            <span></span>
            <span></span>
            <span></span>
          </Box>
        )}
        <TextField
          id="prep_quest1"
          placeholder="Type...."
          variant="outlined"
          size="small"
          fullWidth
          disabled={!canEdit}
          inputProps={{
            sx: {
              fontSize: "16px",
              color: "#3E4248",
            },
            className: "prep_txt_fld",
          }}
          // InputProps={{
          //   readOnly: showQuestOneReadOnly ? true : false,
          // }}
          // className={showQuestOneReadOnly ? "readOnlyInput" : ""}
          // onFocus={() =>
          //   showQuestOneReadOnly ? "" : showLoader("prep_quest1")
          // }
          // onBlur={() => (showQuestOneReadOnly ? "" : showLoader("prep_quest1"))}
          value={
            canView
              ? localSection?.promptQuestionsMap?.[index]?.answer
              : "*You do not have permission to view this*"
          }
          onChange={(e) => {
            const modifiedQuestionAnswerObject = {
              question: localSection?.promptQuestionsMap?.[index]?.question,
              answer: e.target.value,
            };
            const modifiedPromptQuestionsMap = localSection?.promptQuestionsMap;
            modifiedPromptQuestionsMap[index] = modifiedQuestionAnswerObject;

            const modifiedLocalSection = {
              ...localSection,
              promptQuestionsMap: modifiedPromptQuestionsMap,
            };
            console.log(e.target.value, modifiedLocalSection);
            setLocalSection(modifiedLocalSection);
          }}
          multiline
          maxRows={6}
          // setLocalSection({...localSection, promptQuestionsMap:[...localSection?.prompQuestionsMap,localSection?.promptQuestionsMap?.[index]?.answer: e.target.value]})}}
        />
      </Box>
    </Box>
  );
};

export default PromptQuestionItem;
