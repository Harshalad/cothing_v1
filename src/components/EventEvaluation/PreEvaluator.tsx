import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchEventEvaluationDetails } from "../../actions/eventEvaluation/fetchEventEvaluationDetails";
import eventevaluation from "../../constants/proto/eventEvaluation/event-evaluation_grpc_web_pb";
import { startEventEvaluation } from "../../actions/eventEvaluation/startEventEvaluation";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner/Spinner";
import { toast } from "react-toastify";

const PreEvaluator = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const userEventId = router?.query?.eventId;
  const eventSectionId = router?.query?.sectionId;
  const evaluationTestId = router?.query?.testId;
  const eventMethodId = router?.query?.methodId;
  const [eventEvaluation, setEventEvaluation] = useState<any>(null);
  const [participantId, setParticipantId] = useState<any>(null);
  const [currentPersonIndex, setCurrentPersonIndex] = useState<any>(null);
  const [showSpinner, setShowSpinner] = useState<any>(false);
  useEffect(() => {
    console.log("adityasdjfkbfdnmjnflds");
    const getEventEvaluationDetails = async () => {
      const response = await fetchEventEvaluationDetails({
        userEventId: userEventId,
        eventSectionId: eventSectionId,
        eventMethodId: eventMethodId,
        evaluationTestId: evaluationTestId,
      });

      if (response) {
        //@ts-ignore
        setEventEvaluation(response?.response);
      }
    };
    getEventEvaluationDetails();
  }, [userEventId, eventSectionId, evaluationTestId, eventMethodId]);

  const [expanded, setExpanded] = useState<any>("panel1");

  const handleAccordion = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePersonClick = (person: any, index: any) => {
    if (person?.status === "COMPLETED"){
      toast.error("Person is already evaluated");
      return;
    } 
    setParticipantId(person?.id);
    setCurrentPersonIndex(index);
    
  };

  const handleStartClick = async () => {
    setShowSpinner(true);
    const response = await startEventEvaluation({
      participantUserId: participantId,
      evaluationTestId: evaluationTestId,
      userEventId: userEventId,
      eventSectionId: eventSectionId,
      eventMethodId: eventMethodId,
      evaluatorUserId: user?.id
    });
    if(response){
      //@ts-ignore
      router.push({pathname:"/event-evaluation", query:{id:response?.response}})
    }
    setShowSpinner(false);
  };

  console.log(participantId, currentPersonIndex, "currentperson");

  return (
    <>
      <Box className="pre_eval_contr">
        <Typography className="pre_eval_title">
          {eventEvaluation?.name}
        </Typography>
        {/* <Typography className="pre_eval_type">Assessment Type</Typography> */}
        <Stack className="pre_eval_flx">
          <Box className="pre_eval_accord_contr">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordion("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#1C2129" }} />}
              >
                <Typography className="eval_accord_title">
                  Evaluation assessment
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="eval_accord_descrp">
                  {eventEvaluation?.instructions}
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordion("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#1C2129" }} />}
              >
                <Typography className="eval_accord_title">
                  About the assessment
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="eval_accord_descrp">
                  Lorem ipsum dolor sit amet consectetur. Ornare massa facilisi
                  risus euismod ut et a nullam. Consequat sapien eget faucibus
                  libero nulla nunc. Faucibus quis elit arcu a suscipit faucibus
                  aliquet. Velit nunc morbi leo lectus morbi at. Quis nec nisi
                  varius egestas erat penatibus mauris nibh vitae. Scelerisque
                  scelerisque neque vel suspendisse aliquam scelerisque lacinia
                  non auctor. Duis vitae aliquet mauris quis nulla varius in
                  vehicula. Quis tempus vulputate lectus lacinia velit. Proin
                  dui lectus tortor vel mi massa cursus. Tellus id molestie
                  egestas ullamcorper sagittis tempus viverra in ultricies.
                  Risus id ut libero dolor justo at faucibus. Ante diam
                  tristique id arcu ornare maecenas nulla sollicitudin aliquam.
                  Arcu diam ullamcorper at tincidunt. Enim et elementum nunc
                  aliquet ultricies et quis. Tempus et fames fusce elementum.
                  Amet sed in vitae amet. Nulla at sollicitudin sit nulla
                  suspendisse enim facilisis urna. Vitae at odio egestas
                  elementum enim odio. Mauris vulputate velit viverra elementum
                  amet semper lectus. Et in commodo tortor risus diam tellus.
                  Amet ipsum leo a eu tellus non tempus. Venenatis nisl semper
                  potenti massa. Ultrices sit fringilla platea viverra nibh orci
                  platea vitae sem. Scelerisque interdum egestas fringilla
                  ultricies ultrices at ac nullam arcu. Lectus accumsan felis
                  eget nunc. Et commodo a venenatis proin. Duis lacus
                </Typography>
              </AccordionDetails>
            </Accordion> */}
            {/* <Accordion expanded={expanded === 'panel2'} onChange={handleAccordion('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: "#1C2129"}} />}
              >
                <Typography className="eval_accord_title">
                  Evaluation Rubric
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="eval_accord_descrp">
                  Lorem ipsum dolor sit amet consectetur. Ornare massa facilisi risus euismod ut et a nullam. Consequat sapien eget faucibus libero nulla nunc. Faucibus quis elit arcu a suscipit faucibus aliquet. Velit nunc morbi leo lectus morbi at. Quis nec nisi varius egestas erat penatibus mauris nibh vitae. Scelerisque scelerisque neque vel suspendisse aliquam scelerisque lacinia non auctor. Duis vitae aliquet mauris quis nulla varius in vehicula. Quis tempus vulputate lectus lacinia velit. Proin dui lectus tortor vel mi massa cursus.
                  Tellus id molestie egestas ullamcorper sagittis tempus viverra in ultricies. Risus id ut libero dolor justo at faucibus. Ante diam tristique id arcu ornare maecenas nulla sollicitudin aliquam. Arcu diam ullamcorper at tincidunt. Enim et elementum nunc aliquet ultricies et quis. Tempus et fames fusce elementum. Amet sed in vitae amet. Nulla at sollicitudin sit nulla suspendisse enim facilisis urna. Vitae at odio egestas elementum enim odio. Mauris vulputate velit viverra elementum amet semper lectus. Et in commodo tortor risus diam tellus.
                  Amet ipsum leo a eu tellus non tempus. Venenatis nisl semper potenti massa. Ultrices sit fringilla platea viverra nibh orci platea vitae sem. Scelerisque interdum egestas fringilla ultricies ultrices at ac nullam arcu. Lectus accumsan felis eget nunc. Et commodo a venenatis proin. Duis lacus 
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleAccordion('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: "#1C2129"}} />}
              >
                <Typography className="eval_accord_title">
                  Example of Evaluation Process
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="eval_accord_descrp">
                  Lorem ipsum dolor sit amet consectetur. Ornare massa facilisi risus euismod ut et a nullam. Consequat sapien eget faucibus libero nulla nunc. Faucibus quis elit arcu a suscipit faucibus aliquet. Velit nunc morbi leo lectus morbi at. Quis nec nisi varius egestas erat penatibus mauris nibh vitae. Scelerisque scelerisque neque vel suspendisse aliquam scelerisque lacinia non auctor. Duis vitae aliquet mauris quis nulla varius in vehicula. Quis tempus vulputate lectus lacinia velit. Proin dui lectus tortor vel mi massa cursus.
                  Tellus id molestie egestas ullamcorper sagittis tempus viverra in ultricies. Risus id ut libero dolor justo at faucibus. Ante diam tristique id arcu ornare maecenas nulla sollicitudin aliquam. Arcu diam ullamcorper at tincidunt. Enim et elementum nunc aliquet ultricies et quis. Tempus et fames fusce elementum. Amet sed in vitae amet. Nulla at sollicitudin sit nulla suspendisse enim facilisis urna. Vitae at odio egestas elementum enim odio. Mauris vulputate velit viverra elementum amet semper lectus. Et in commodo tortor risus diam tellus.
                  Amet ipsum leo a eu tellus non tempus. Venenatis nisl semper potenti massa. Ultrices sit fringilla platea viverra nibh orci platea vitae sem. Scelerisque interdum egestas fringilla ultricies ultrices at ac nullam arcu. Lectus accumsan felis eget nunc. Et commodo a venenatis proin. Duis lacus 
                </Typography>
              </AccordionDetails>
            </Accordion> */}
          </Box>
          <Box className="eval_ppl_contr">
            <Typography className="eval_ppl_title">
              People being evaluated
            </Typography>
            <Divider className="eval_hr" />
            <Box className="eval_ppl_box">
              {eventEvaluation?.evaluationStatus?.map(
                (person: any, index: any) => {
                  return (
                    <Box
                      className={`inner_eval_ppl_box ${
                        currentPersonIndex === index ? "selected" : ""
                      } ${person?.status==="COMPLETED"?"cmplted":""}`}
                      key={index}
                      onClick={() => handlePersonClick(person, index)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Stack className="eval_ppl_flx">
                        <Box>
                          <Avatar
                            sx={{
                              width: "32px",
                              height: "32px",
                              bgcolor: "#D9F6FF",
                              color: "#55B6C3",
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                          >
                            {person?.name[0]}
                          </Avatar>
                        </Box>
                        <Box>
                          <Typography className="eval_ppl_name">
                            {person?.name}
                          </Typography>
                          <Typography className="eval_ppl_desg">
                            {person?.status === "ADDED"
                              ? "Not started"
                              : person?.status === "IN_PROGRESS"
                              ? "In progress"
                              : "Evaluated"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  );
                }
              )}
            </Box>
            <Box>
              {showSpinner? <Spinner/>:<Button onClick={() => handleStartClick()}>Start</Button>}
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
export default PreEvaluator;
