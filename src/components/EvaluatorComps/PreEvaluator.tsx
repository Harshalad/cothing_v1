import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

const PreEvaluator = () => {

  const [expanded, setExpanded] = useState<any>(false);

  const handleAccordion = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Box className="pre_eval_contr">
        <Typography className="pre_eval_title">Assessment Title / Name</Typography>
        <Typography className="pre_eval_type">Assessment Type</Typography>
        <Stack className="pre_eval_flx">
          <Box className="pre_eval_accord_contr">
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordion('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: "#1C2129"}} />}
              >
                <Typography className="eval_accord_title">
                  About the assessment
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
            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordion('panel2')}>
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
            </Accordion>
          </Box>
          <Box className="eval_ppl_contr">
            <Typography className="eval_ppl_title">People being evaluated</Typography>
            <Divider className="eval_hr" />
            <Box className="eval_ppl_box">
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
                    S
                  </Avatar>
                </Box>
                <Box>
                  <Typography className="eval_ppl_name">
                    Shlok Rastogi
                  </Typography>
                  <Typography className="eval_ppl_desg">
                    Role in examination
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
export default PreEvaluator;