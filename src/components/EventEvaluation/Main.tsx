import { Box } from "@mui/material";
import PreEvaluator from "./PreEvaluator";
import CTA from "./CTA";
import EvaluateQuestions from "./EvaluateQuestions";
import Paginations from "./Paginations";
import EvaluateTestLevel from "./EvaluateTestLevel";
import EvaluateSectionLevel from "./EvaluateSectionLevel";
import Review from "./Review";
import ThankYou from "./ThankYou";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchEventQuestionsForEvaluation } from "../../actions/eventEvaluation/fetchEventQuestionsForEvaluation";
import { toast } from "react-toastify";
import { saveEventEvaluationAnswer } from "../../actions/eventEvaluation/saveEventEvaluationAnswer";

const Main = () => {
  const router = useRouter();
  const userTestMapId = router?.query?.id;
  const [testDetails, setTestDetails] = useState<any>(null);
  const [currSecIndex, setCurrSecIndex] = useState<any>(0);
  const [currQuesIndex, setCurrQuesIndex] = useState<any>(0);
  const [note, setNote] = useState<any>("");
  const [questionAnswerMap, setQuestionAnswerMap] = useState<
    Map<any, Map<any, any>>
  >(new Map());
  const [openReview, setOpenReview] = useState(false);
  const [singleMCQ, setSingleMCQ] = useState("");
  const [subjectiveAnswer, setSubjectiveAnswer] = useState("");
  const [rating, setRating] = useState<any>(null);
  const [singleMCQDB, setSingleMCQDB] = useState("");
  const [subjectiveAnswerDB, setSubjectiveAnswerDB] = useState("");
  const [ratingDB, setRatingDB] = useState<any>(null);
  const handleCurrSecIndex = (e: any) => {
    if (
      singleMCQ !== singleMCQDB ||
      rating !== ratingDB ||
      subjectiveAnswer !== subjectiveAnswerDB
    ) {
      toast.error("Save details before moving to next");
      return;
    }
    if (
      (currSecIndex === 0 && e > 0) ||
      (currSecIndex === testDetails?.sections?.length - 1 && e < 0) ||
      (currSecIndex !== 0 && currSecIndex !== testDetails?.sections?.length - 1)
    ) {
      setCurrSecIndex(currSecIndex + e);
      setCurrQuesIndex(0);
    }
  };

  const handleOpenReview = () => {
    setOpenReview(false);
  };

  // handle mcq question
  const handleSingleMCQchange = (e: any) => {
    setSingleMCQ(e);
  };

  // handle subjective answer
  const handleSetSublectiveAnswer = (e: any) => {
    setSubjectiveAnswer(e);
  };
  //handle rating
  const handleRating = (e: any) => {
    // console.log(e.target.value, "rating called");
    setRating(e.target.value);
  };
  useEffect(() => {
    const getEvaluationQuestion = async () => {
      const response = await fetchEventQuestionsForEvaluation({
        userTestMapId: userTestMapId,
      });
      if (response) {
        //@ts-ignore
        setTestDetails(response?.response);
      }
    };

    getEvaluationQuestion();
  }, [userTestMapId]);

  const handleReviewSection = (e: any) => {
    setCurrSecIndex(e);
  };

  // handle referesh andquestion change
  useEffect(() => {
    // console.log(questionAnswerMap, "questionAnswerMap");
    let currentQuestion: any;
    if (testDetails) {
      currentQuestion =
        testDetails?.sections[currSecIndex]?.questions[currQuesIndex];
    }
    let sec_map = questionAnswerMap.get(currSecIndex);
    let currAnswer = sec_map?.get(currQuesIndex)?.answerObject?.answer;
    let currOption = sec_map?.get(currQuesIndex)?.answerObject?.answerOption
      ? sec_map?.get(currQuesIndex)?.answerObject?.answerOption[0]
      : null;
    let currOptions = sec_map?.get(currQuesIndex)?.answerObject?.answerOption;
    // console.log(currOption, "mcqoption");
    if (currAnswer != null) {
      setSubjectiveAnswer(currAnswer);
      setSubjectiveAnswerDB(currAnswer);
    } else {
      setSubjectiveAnswer("");
      setSubjectiveAnswerDB("");
    }
    if (
      currentQuestion?.question?.type === "mcq" &&
      !currentQuestion?.question.multiSelect
    ) {
      if (currOption != null) {
        setSingleMCQ(currOption);
        setSingleMCQDB(currOption);
      } else {
        setSingleMCQ("");
        setSingleMCQDB("");
      }
    }
    if (currentQuestion?.question?.type === "rating") {
      // console.log(currOption, "rating");
      if (currOption !== null) {
        setRating(currOption);
        setRatingDB(currOption);
      } else {
        setRating(null);
        setRatingDB(null);
      }
    }
  }, [questionAnswerMap, currQuesIndex, currSecIndex]);

  const handleNote = (e: any) => {
    setNote(e);
  };

  const handleSaveAndNextClick = async () => {
    let currentQuestion =
      testDetails?.sections[currSecIndex]?.questions[currQuesIndex];
    let answerd;
    if (currentQuestion?.question?.type === "subjective") {
      if (subjectiveAnswer?.length === 0) {
        toast.error("No text entered");
        return;
      }
      setSubjectiveAnswerDB(subjectiveAnswer);
      answerd = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          answer: subjectiveAnswer,
          evaluated: true,
        },
      };
    } else if (
      currentQuestion?.question?.type === "mcq" &&
      !currentQuestion?.question.multiSelect
    ) {
      if (singleMCQ?.length === 0) {
        toast.error(" Alert: No answer saved.");
        return;
      }
      setSingleMCQDB(singleMCQ);
      answerd = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          answerOption: [singleMCQ],
          evaluated: true,
        },
      };
    } else if (currentQuestion?.question?.type === "rating") {
      console.log("rating", rating);
      if (!rating || rating?.length === 0) {
        toast.error(" Alert: No answer saved.");
        return;
      }
      setRatingDB(rating);
      answerd = {
        ...currentQuestion,
        answerObject: {
          ...currentQuestion.answerObject,
          answerOption: rating,
          evaluated: true,
        },
      };
    }
    let answerMap = new Map(questionAnswerMap);
    let secMap = answerMap.get(currSecIndex);
    secMap?.set(currQuesIndex, answerd);
    setQuestionAnswerMap(answerMap);
    if (currentQuestion?.question?.type === "subjective") {
      const response = await saveEventEvaluationAnswer({
        userTestMapId: userTestMapId,
        sectionId: testDetails?.sections[currSecIndex].sectionId,
        caseId: currentQuestion?.caseStudyId
          ? currentQuestion?.caseStudyId
          : "",
        questionId: currentQuestion.questionId,
        answerOption: [],
        questionType: currentQuestion?.question?.type,
        answer: subjectiveAnswer,
        centralNote: note,
      });
    } else if (currentQuestion?.question?.type === "mcq") {
      const response = await saveEventEvaluationAnswer({
        userTestMapId: userTestMapId,
        sectionId: testDetails?.sections[currSecIndex].sectionId,
        caseId: currentQuestion?.caseStudyId
          ? currentQuestion?.caseStudyId
          : "",
        questionId: currentQuestion.questionId,
        answerOption: [singleMCQ],
        questionType: currentQuestion?.question?.type,
        answer: "",
        centralNote: note,
      });
    } else if (currentQuestion?.question?.type === "rating") {
      const response = await saveEventEvaluationAnswer({
        userTestMapId: userTestMapId,
        sectionId: testDetails?.sections[currSecIndex].sectionId,
        caseId: currentQuestion?.caseStudyId
          ? currentQuestion?.caseStudyId
          : "",
        questionId: currentQuestion.questionId,
        answerOption: rating,
        questionType: currentQuestion?.question?.type,
        answer: "",
        centralNote: note,
      });
    }
    if (
      currQuesIndex + 1 <
      testDetails?.sections[currSecIndex].questions.length
    ) {
      setCurrQuesIndex(currQuesIndex + 1);
    } else {
      if (currSecIndex + 1 < testDetails?.sections.length) {
        // openSectInstructsModal();
        setCurrSecIndex(currSecIndex + 1);
        setCurrQuesIndex(0);
      } else {
        setOpenReview(true);
      }
    }
  };

  useEffect(() => {
    const setMap = () => {
      setNote(testDetails?.centralNote);
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
  console.log(testDetails, "adtyafdjnfdn");
  const handelQuestionIndex = (e: any) => {
     if (
       singleMCQ !== singleMCQDB ||
       rating !== ratingDB ||
       subjectiveAnswer !== subjectiveAnswerDB
     ) {
       toast.error("Save details before moving to next");
       return;
     }
    setCurrQuesIndex(e);
  };

  return (
    <>
      <Box className="evaluator_contr">
        {/* <PreEvaluator /> */}
        {/* <CTA /> */}
        <EvaluateTestLevel testDetails={testDetails} />
        <EvaluateSectionLevel
          testDetails={testDetails}
          handleCurrSecIndex={handleCurrSecIndex}
          currSecIndex={currSecIndex}
        />
        <Paginations
          testDetails={testDetails}
          currSecIndex={currSecIndex}
          currQuesIndex={currQuesIndex}
          handelQuestionIndex={handelQuestionIndex}
        />
        <EvaluateQuestions
          testDetails={testDetails}
          currSecIndex={currSecIndex}
          currQuesIndex={currQuesIndex}
          singleMCQ={singleMCQ}
          handleSingleMCQchange={handleSingleMCQchange}
          subjectiveAnswer={subjectiveAnswer}
          handleSetSublectiveAnswer={handleSetSublectiveAnswer}
          rating={rating}
          handleRating={handleRating}
          note={note}
          handleNote={handleNote}
        />
        <CTA handleSaveAndNextClick={handleSaveAndNextClick} />
        <Review
          testDetails={testDetails}
          openReview={openReview}
          handleOpenReview={handleOpenReview}
          handelQuestionIndex={handelQuestionIndex}
          handleReviewSection={handleReviewSection}
          questionAnswerMap={questionAnswerMap}
        />
        {/* <ThankYou /> */}
      </Box>
    </>
  );
};
export default Main;
