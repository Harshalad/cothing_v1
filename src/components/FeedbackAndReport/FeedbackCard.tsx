import { Paper, Typography, Box } from '@mui/material';
import { useState, useRef, type FC } from 'react';
import { EditorState, Editor, Modifier, RichUtils, convertFromHTML, ContentState } from 'draft-js'
import { IosShare } from '@mui/icons-material';
import { motion } from 'framer-motion'
import PromptTextInput from './PromptTextInput';
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
            {/* <Box>
                {steps.map((step, index) => (
                    <Paper key={index} elevation={3} sx={{ margin: 2, padding: 2 }}>
                        <Typography variant="h6">{`Step ${index + 1} out of ${steps.length}`}</Typography>
                        <Typography variant="subtitle1">{step.title}</Typography>
                        <Typography variant="body2" onClick={() => setExpand(!expand)}>{step.details}</Typography>
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
                            Prompt 1 of 2

                            <div>
                                what must the direct report start doing and/or stop doing and/or do differently?
                            </div>
                            <div>

                            </div>
                        </Box>
                        <Box>
                            Prompt 2 of 2
                        </Box>
                    </Paper>
                ))}
            </Box>
            <PromptTextInput /> */}
        </>

    );
};

export default FeedbackCard;

