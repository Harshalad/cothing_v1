import { Paper, Typography, Box, Button } from '@mui/material';
import { useState, useRef, type FC } from 'react';
import { EditorState, Editor, Modifier, RichUtils, convertFromHTML, ContentState } from 'draft-js'
import { IosShare } from '@mui/icons-material';
import { motion } from 'framer-motion'
import PromptTextInput from './PromptTextInput';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';

interface FeedbackCardProps { }

const steps = [
    { title: 'Gather Data on Behavior', details: '2 Prompts | 5 mins' },
    { title: 'State the Impact on Behavior', details: '2 Prompts | 5 mins' },
    { title: 'Demonstrate Empathy', details: '2 Prompts | 5 mins' },
    { title: 'Create an Action Plan', details: '2 Prompts | 5 mins' },
];

const FeedbackCard: FC<FeedbackCardProps> = () => {
    const [expand, setExpand] = useState(false)
    return (

        <>
            <Box>
                {steps.map((step, index) => (
                    <Paper key={index} elevation={3} sx={{ margin: 2, padding: 2 }} className="card">
                        <Typography variant="h6" className="details">{`Step ${index + 1} out of ${steps.length}`}</Typography>
                        {/* <div className='expandbtn'>
                            <Button className='buttonArrow'><EastRoundedIcon /></Button>
                        </div> */}
                        <div className='arrowbutton'>
                            <Button className='expandbutton'><ExpandMoreOutlinedIcon /></Button>
                        </div>
                        <Typography variant="subtitle1" className='titleText'>{step.title}</Typography>
                        <div>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography>
                                    <Typography className="headingText">Specific Indident of Behaviour</Typography>
                                    <Typography className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={3} style={{marginLeft: "20px" }}>
                                <Typography>
                                    <Typography className="headingText">Behaviour I Observed</Typography>
                                    <Typography className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                               <div className='avtarWrapper'>
                                    <div className='flex mb-10'><Avatar className='remaining'>1</Avatar> 1 Prompt remaining</div>
                                    <div className='flex'><Avatar className='comment'><ChatBubbleIcon className='iconstyle' /></Avatar> 2 New comments from expert</div>
                               </div>
                            </Grid>  
                        </Grid>
                        </div>
                        {/* <Typography variant="subtitle1" className='formateText'>State the observed behavior supporting it with data and/or examples in a specific incident/situation/task. Do not add interpretation/ judgement to keep the focus of the conversation on factual information.</Typography> */}
                        <Typography variant="body2" onClick={() => setExpand(!expand)} className="prompt">{step.details}</Typography>
                        <Box sx={{ background: 'rgba(223, 235, 246, 0.5)', width: expand ? '100%' : 'fit-content' }}>
                            <div style={
                                {
                                    display: !expand ? 'none' : 'block',
                                    height: '24px', background: 'white',
                                    borderBottomLeftRadius: '20px',
                                    borderBottomRightRadius: '20px',
                                    borderTopLeftRadius: '0',
                                    borderTopRightRadius: '0'
                                }
                            }></div>
                            {/* <div style={{ height: expand ? 'fit-content' : 'auto', width: expand ? 'auto' : 'fit-content' }}>
                                <div>
                                    Need Clarification
                                </div>
                                {expand && <>
                                    <div>
                                        Chip1
                                    </div>
                                    <div>
                                        Chip2
                                    </div></>}
                            </div> */}
                            <div style={
                                {
                                    display: !expand ? 'none' : 'block',
                                    height: '24px', background: 'white',
                                    borderBottomLeftRadius: '0',
                                    borderBottomRightRadius: '0',
                                    borderTopLeftRadius: '20px',
                                    borderTopRightRadius: '20px'

                                }
                            }></div>

                        </Box>
                        {/* <Box>
                            <span className="details">Prompt 1 of 2</span>

                            <div className='titleText'>
                                what must the direct report start doing and/or stop doing and/or do differently?
                            </div>
                            <div>

                            </div>
                        </Box>
                        <Box>
                            <span className="details">Prompt 2 of 2</span>
                            <div className='titleText'>
                                what open-ended questions can I ask to probe the other's views and perspectives on this recommendation?
                            </div>
                        </Box> */}
                    </Paper>

                    
                ))}
            </Box>

            <Box>
               
                    <Paper elevation={3} sx={{ margin: 2, padding: 2 }} className="card">
                        <Typography variant="h6" className="details">Step 1  </Typography>
                      
                        <div className='arrowbutton'>
                            <Button className='expandbutton'><ExpandMoreOutlinedIcon /></Button>
                        </div>
                        <Typography variant="subtitle1" className='titleText'>Create an Action Plan</Typography>
                        <div className="viewmore">
                            <div className='mt-2 f-14 fw-400 pr-3 formateText addmore'>State the observed behavior supporting it with data and/or examples in a 
                            </div>
                            
                            <div className='cag-blue f-14 fw-600 view '>view more<ExpandCircleDownRoundedIcon /></div>
                 
                        </div> 
                        {/* <Box className="card1">
                        <div className='arrowbutton1'>
                            <Button className='expandbutton'><ExpandMoreOutlinedIcon /></Button>
                        </div>
                            <span className="details">Question 1 out of 2</span>

                            <div className='titleText'>
                                what must the direct report start doing and/or stop doing and/or do differently?
                            </div>
                            <div>

                            </div>
                        </Box> */}
                     
                        
                        <Box sx={{ background: 'rgba(223, 235, 246, 0.5)', width: expand ? '100%' : 'fit-content' }}>
                            <div style={
                                {
                                    display: !expand ? 'none' : 'block',
                                    height: '24px', background: 'white',
                                    borderBottomLeftRadius: '20px',
                                    borderBottomRightRadius: '20px',
                                    borderTopLeftRadius: '0',
                                    borderTopRightRadius: '0'
                                }
                            }></div>
                            <div style={{ height: expand ? 'fit-content' : 'auto', width: expand ? 'auto' : 'fit-content' }}>
                                <div>
                                    Need Clarification
                                </div>
                                {expand && <>
                                    <div>
                                        Chip1
                                    </div>
                                    <div>
                                        Chip2
                                    </div></>}
                            </div>
                            <div style={
                                {
                                    display: !expand ? 'none' : 'block',
                                    height: '24px', background: 'white',
                                    borderBottomLeftRadius: '0',
                                    borderBottomRightRadius: '0',
                                    borderTopLeftRadius: '20px',
                                    borderTopRightRadius: '20px'

                                }
                            }></div>

                        </Box>
                        <Box>
                            <span className="details">Prompt 1 of 2</span>

                            <div className='titleText'>
                                what must the direct report start doing and/or stop doing and/or do differently?
                            </div>
                            <div>

                            </div>
                        </Box>
                        <Box>
                            <span className="details">Prompt 2 of 2</span>
                            <div className='titleText'>
                                what open-ended questions can I ask to probe the other's views and perspectives on this recommendation?
                            </div>
                        </Box>
                    </Paper>

                    
              
            </Box>
            <PromptTextInput />
        </>

    );
};

export default FeedbackCard;

