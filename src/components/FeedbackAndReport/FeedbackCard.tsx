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
import SituationalContext from './SituationalContext';
import rightArrow from '../../assets/images/rightArrow.svg';
import { AddCircleOutline, AddCircleOutlineOutlined, AddCircleOutlined, RemoveCircleOutline, RemoveCircleOutlined } from '@mui/icons-material';

interface FeedbackCardProps { }

const steps = [
    { title: 'Gather Data on Behavior', details: '2 Prompts | 5 mins' },
    { title: 'State the Impact on Behavior', details: '2 Prompts | 5 mins' },
    { title: 'Demonstrate Empathy', details: '2 Prompts | 5 mins' },
    { title: 'Create an Action Plan', details: '2 Prompts | 5 mins' },
];
const questions = 'Need more clarification on the section?'

const FeedbackCard: FC<FeedbackCardProps> = () => {
    const [expand, setExpand] = useState(false)
    return (

        <>
            

            <Box>
               
                    <Paper elevation={3} sx={{ margin: 2, padding: 2 }} className="card">
                        <div className='innerContainer'>
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
                      <Box className="card1 mt-20">
                      <div className='arrowbutton1'>
                          <Button className='expandbutton'><ExpandMoreOutlinedIcon /></Button>
                      </div>
                          <span className="details ">Question 1 out of 2</span>

                          <div className='titleText'>
                              what must the direct report start doing and/or stop doing and/or do differently?
                          </div>
                        </Box>
                        </div>
                       
                     
                        
                        <Box className='queWrapper'>
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
                            <div className='queWrapper1'>
                                <Box className='queWrapperInner'>
                                    <div className='f-12 cag-blue fw-600 questionPill'>
                                        <img className="w15" height={18} src="/images/icons/stars.svg" />Need clarification on the question?</div>
                                        <RemoveCircleOutlined className='circleOutline updatecolor' />
                                </Box>
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
                        <div className='que'>
                            <Box className="card2">
                                 
                                <div className='arrowbutton2'>
                                    <Button className='expandbutton'><ExpandMoreOutlinedIcon /></Button>
                                </div>
                                <span className="details">Prompt 1 of 2</span>

                                <div className='titleText'>
                                    what must the direct report start doing and/or stop doing and/or do differently?
                                </div>
                                <div>

                                </div>
                            </Box>
                            <Box className="card2 mt-20">
                                <div className='arrowbutton2'>
                                    <Button className='expandbutton'><ExpandMoreOutlinedIcon /></Button>
                                </div>
                                <span className="details">Prompt 2 of 2</span>
                                <div className='titleText'>
                                    what open-ended questions can I ask to probe the other's views and perspectives on this recommendation?
                                </div>
                            </Box>
                        </div>
                        
                    </Paper>

                    
              
            </Box>
            <PromptTextInput />
        </>

    );
};

export default FeedbackCard;

