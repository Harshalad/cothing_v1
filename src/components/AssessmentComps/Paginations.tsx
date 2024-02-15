import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const Paginations = ({
  curr_section,
  handleSetCurrQuestionIndex,
  currQuestionIndex,
  questionAnswerMap,
  currSectionIndex
}: any) => {
  const matches = useMediaQuery("(max-width:1023px");

  const handlePaginationChange = (value: any) => {
    handleSetCurrQuestionIndex(value);
    console.log(value,"ads");
  };
  console.log(currQuestionIndex,"ads")

  console.log(questionAnswerMap, "adda");
  return (
    <Box className="pagintn_contr">
      <Stack spacing={0.5} direction="row">
        <Button
          sx={{
            borderRadius: "100%",
            width: "20px",
            height: "30px",
            minWidth: "30px",
            border: "1px solid grey",
            background: "#eaecef",
            color: "#989ea5"
          }}
          onClick={() => handlePaginationChange(0)}
          disabled={currQuestionIndex === 0}
        >
          &lt;
        </Button>
        {curr_section?.questions?.map((question: any, index: number) => (
          <Button
            // sx={{border:currQuestionIndex===index?"2px solid #5d636b;":"1px solid "}}
            key={index}
            onClick={() => handlePaginationChange(index)}
            className={`custom-pagination ${(questionAnswerMap.get(currSectionIndex)?.get(index)?.answerObject?.answer !== null &&
              questionAnswerMap.get(currSectionIndex)?.get(index)?.answerObject?.answer?.length !== 0) ||
              (questionAnswerMap.get(currSectionIndex)?.get(index)?.answerObject?.answerOption !== null &&
                questionAnswerMap.get(currSectionIndex)?.get(index)?.answerObject?.answerOption?.length !== 0)
              ? "answrd"
              : "unanswrd"
              } ${currQuestionIndex===index?"curr":""}` }
          >
            {index + 1}
          </Button>
        ))}
        <Button
          sx={{
            borderRadius: "100%",
            width: "20px",
            height: "30px",
            minWidth: "30px",
            border: "1px solid grey",
            background: "#eaecef",
            color: "#989ea5"
          }}
          onClick={() => handlePaginationChange(curr_section?.questions?.length - 1)}
          disabled={currQuestionIndex === curr_section?.questions?.length - 1}
        >
          &gt;
        </Button>
      </Stack>
    </Box>
  );
};

export default Paginations;
