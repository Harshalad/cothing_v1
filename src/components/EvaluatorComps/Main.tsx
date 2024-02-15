import { Box } from "@mui/material";
import CTA from "./CTA";
import EvaluateQuestions from "./EvaluateQuestions";
import Paginations from "./Paginations";
import EvaluateTestLevel from "./EvaluateTestLevel";
import EvaluateSectionLevel from "./EvaluateSectionLevel";
import Review from "./Review";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchAnswersForEvaluation } from "../../actions/evaluator/fetchAnswersForEvaluation";
import { evaluateAnswer } from "../../actions/evaluator/evaluateAnswer";
import { toast } from "react-toastify";

const Main = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const testId = router?.query?.id;
  const [change, setChange] = useState(false);
  const [testDetails, setTestDetails] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [questionAnswerMap, setQuestionAnswerMap] = useState<
    Map<any, Map<any, any>>
  >(new Map());
  const [notes, setNotes] = useState<any>("");
  const [notesDB, setNotesDB] = useState<any>("");
  const [objectiveScore, setObjectiveScore] = useState<any>(-1);
  const [objectiveScoreDB, setObjectiveScoreDB] = useState<any>(-1);
  const [openReview, setOpenReview] = useState(false);
  const [correct, setCorrect] = useState("-1");
  const [correctDB, setCorrectDB] = useState("-1");
  const handleNotesChanges = (e: any) => {
    setNotes(e);
  };
  const handleOpenReview = () => {
    setOpenReview(false);
  };
  const handleObjectiveScoreState = (e: any) => {
    setObjectiveScore(e);
  };
  const handleSetCorrect = (e: any) => {
    setCorrect(e);
  };

  useEffect(() => {
    const fetchTestDeatils = async () => {
      const response = await fetchAnswersForEvaluation({
        evaluatorUserId: user?.id,
        userTestMapId: testId,
      });
      if (response) {
        //@ts-ignore
        setTestDetails(response?.response);
      }
    };
    fetchTestDeatils();
  }, [testId]);

  useEffect(() => {
    const setMap = () => {
      setChange(!change);
      const questionAnswerMapTemp = new Map();
      testDetails?.sections?.forEach((section: any, sec_index: any) => {
        const sec_map = new Map();
        section.questions.forEach((question: any, index: any) => {
          sec_map.set(index, question);
        });
        questionAnswerMapTemp.set(sec_index, sec_map);
      });
      setQuestionAnswerMap(questionAnswerMapTemp);
    };
    setMap();
  }, [testDetails]);

  useEffect(() => {
    const secMap = questionAnswerMap.get(currentSectionIndex);
    const quesMap = secMap?.get(currentQuestionIndex);
    console.log(quesMap, "secMapAditya");
    if (quesMap?.question?.evaluationType === "binary") {
      console.log("correctOptionIncorrect", quesMap);
      if (quesMap?.answerObject?.evaluated) {
        if (quesMap?.answerObject?.correct) {
          setCorrectDB("1");
          setCorrect("1");
        } else {
          setCorrectDB("0");
          setCorrect("0");
        }
      } else {
        setCorrectDB("-1");
        setCorrect("-1");
      }
      setObjectiveScoreDB(-1);
      setObjectiveScore(-1);
    } else {
      if (quesMap?.answerObject?.evaluated) {
        setObjectiveScore(quesMap?.answerObject?.marksScored);
        setObjectiveScoreDB(quesMap?.answerObject?.marksScored);
      } else {
        setObjectiveScoreDB(-1);
        setObjectiveScore(-1);
      }
    }
    if (quesMap?.answerObject?.note === null) {
      setNotes("");
      setNotesDB("");
    } else {
      setNotesDB(quesMap?.answerObject?.note);
      setNotes(quesMap?.answerObject?.note);
    }
  }, [currentSectionIndex, currentQuestionIndex, change, testDetails, testId]);
  console.log(questionAnswerMap, "testDetailsForEvaluation");

  const handleSectionIndex = (e: any) => {
    console.log(notes, notesDB,"notes",correct, correctDB,"correct", objectiveScore,objectiveScoreDB,"objectiveScore" );
    if (
      notes !== notesDB ||
      objectiveScore !== objectiveScoreDB ||
      correct !== correctDB
    ) {
      toast.error("Save details before moving to next");
      return;
    }
    if (
      (currentSectionIndex === 0 && e > 0) ||
      (currentSectionIndex === testDetails?.sections?.length - 1 && e < 0) ||
      (currentSectionIndex !== 0 &&
        currentSectionIndex !== testDetails?.sections?.length - 1)
    ) {
      setCurrentSectionIndex(currentSectionIndex + e);
      setCurrentQuestionIndex(0);
    }
  };
  const handleReviewSection = (e: any) => {
    setCurrentSectionIndex(e);
  };
  const handleSaveAndNext = async () => {
    const currentSection = testDetails?.sections[currentSectionIndex];
    const currentQuestion = currentSection?.questions[currentQuestionIndex];
    let answered;
    console.log(currentQuestion, "correct option123");
    setNotesDB(notes);
    setCorrectDB(correct);
    setObjectiveScoreDB(objectiveScore);
    if (currentQuestion?.question?.evaluationType === "binary") {
      if (correct === "-1") {
        toast.error("Please provide marks");
        return;
      }
      setCorrectDB(correct);
      answered = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          note: notes,
          correct: correct === "1" ? true : false,
          evaluated: true,
        },
      };
      console.log(answered, "correctOptionIncorrectQues");
      // setCorrect(correct==="1")
    } else {
      if (objectiveScore === -1) {
        toast.error("Please provide marks");
        return;
      }
      setObjectiveScoreDB(objectiveScore);
      answered = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          note: notes,
          marksScored: objectiveScore,
          evaluated: true,
        },
      };
    }
    let newMap = new Map(questionAnswerMap);
    let secMap = newMap.get(currentSectionIndex);
    secMap?.set(currentQuestionIndex, answered);
    setQuestionAnswerMap(newMap);

    const response = await evaluateAnswer({
      evaluatorUserId: user?.id,
      userTestMapId: testId,
      notes: notes,
      correct: correct === "1" ? true : false,
      marksScored: objectiveScore,
      answerId: currentQuestion?.answerObject?.id,
      evaluationType: currentQuestion?.question?.evaluationType,
    });
    if (currentQuestionIndex + 1 < currentSection?.questions?.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentSectionIndex + 1 < testDetails?.sections?.length) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        setOpenReview(true);
      }
    }
  };
  const handelQuestionIndex = (e: any) => {
    if (
      notes !== notesDB ||
      objectiveScore !== objectiveScoreDB ||
      correct !== correctDB
    ) {
      toast.error("Save details before moving to next");
      return;
    }
    setCurrentQuestionIndex(e);
  };

  console.log(testDetails, "testDetails");
  // const handleReviewClick =(secIndex:any, questionIndex:any) =>{
  //   setCurrentSectionIndex(secIndex);
  //   setCurrentQuestionIndex(questionIndex);
  //   // setOpenReview(fals);
  //   // setOpenReview(OpenInNew);
  // }

  return (
    <>
      <Box className="evaluator_contr">
        {/* <PreEvaluator /> */}
        {/* <CTA /> */}
        <EvaluateTestLevel testDetails={testDetails} />
        <EvaluateSectionLevel
          testDetails={testDetails}
          handleSectionIndex={handleSectionIndex}
          currentSectionIndex={currentSectionIndex}
        />
        <Paginations
          testDetails={testDetails}
          handelQuestionIndex={handelQuestionIndex}
          currentQuestionIndex={currentQuestionIndex}
          currentSectionIndex={currentSectionIndex}
        />
        <EvaluateQuestions
          testDetails={testDetails}
          currentQuestionIndex={currentQuestionIndex}
          currentSectionIndex={currentSectionIndex}
          handleNotesChanges={handleNotesChanges}
          notes={notes}
          handleObjectiveScoreState={handleObjectiveScoreState}
          objectiveScore={objectiveScore}
          handleSetCorrect={handleSetCorrect}
          correct={correct}
        />
        <CTA handleSaveAndNext={handleSaveAndNext} />
        <Review
          openReview={openReview}
          questionAnswerMap={questionAnswerMap}
          handleOpenReview={handleOpenReview}
          testDetails={testDetails}
          handelQuestionIndex={handelQuestionIndex}
          handleReviewSection={handleReviewSection}
        />
        {/* <ThankYou /> */}
      </Box>
    </>
  );
};
export default Main;
