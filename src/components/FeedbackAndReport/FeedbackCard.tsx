import { Paper, Typography, Box, Button, Divider } from '@mui/material';
import { useState, type FC, useEffect } from 'react';
import { ArrowForward, ExpandMoreOutlined, RemoveCircleOutlined } from '@mui/icons-material';
import SectionClarify from './SectionClarify';

interface FeedbackCardProps {
    sectionData: any;
    index: number;
    expandIndex: number
}

const FeedbackCard: FC<FeedbackCardProps> = ({ sectionData, index, expandIndex }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const currentSection = sectionData['sections'][index];
    const totalSections = sectionData['sections'].length;
    const sectionClarity = sectionData['sectionClarity'].find((section: any) => section.sectionId === currentSection.id)?.sectionPills;
    console.log(sectionClarity)
    useEffect(() => {
        if (expandIndex == index) {
            setIsExpanded(true);
            setIsDescriptionExpanded(true)
        }
    }, [expandIndex])
    return (
        <>
            <Box>
                <Paper elevation={0} sx={{ margin: 2, padding: 2 }} className="card">
                    <div className='innerContainer'>
                        {
                            isExpanded ?
                                <Typography variant="h6" className="details">Step {index + 1} </Typography> :
                                <Typography variant="h6" className="details">Step {index + 1} out of {totalSections}  </Typography>
                        }

                        <div className='arrowbutton' >
                            {isExpanded ?
                                <Button className='expandbutton' onClick={() => { setIsExpanded(!isExpanded); setIsDescriptionExpanded(!isDescriptionExpanded) }}><ExpandMoreOutlined /></Button> :
                                <Button className='buttonArrow' onClick={() => isDescriptionExpanded ? setIsExpanded(!isExpanded) : setIsDescriptionExpanded(!isDescriptionExpanded)}><ArrowForward /></Button>}
                        </div>
                        <Typography variant="subtitle1" className='titleText'>{currentSection['name']}</Typography>
                        {isDescriptionExpanded &&
                            <div className="viewmore">
                                <div className='mt-2 f-14 fw-400 pr-3 formateText addmore'>{currentSection['description']}</div>
                            </div>
                        }
                        {!isExpanded &&
                            <div style={{ display: 'flex' }}>
                                <Typography className='cardFooterText'>{currentSection['promptQuestionsMap'].length} Prompts</Typography>
                                <Divider orientation="vertical" flexItem style={{ height: '20px', margin: '0 10px' }} />
                                <Typography className='cardFooterText'>{currentSection['durationInMins']} mins</Typography>
                            </div>
                        }
                    </div>

                    {isDescriptionExpanded && isExpanded &&
                        <>
                            <div className='sectionClarify'>

                                {sectionClarity?.map((e: any, index: any) => (
                                    <SectionClarify key={index} title={e.pillName} questions={e.childPills} />
                                ))}

                            </div>

                            <div className='que'>
                                {currentSection['promptQuestionsMap'].map((prompt: any, promptIndex: number) => (
                                    <Box key={promptIndex} className={`card2 ${promptIndex !== 0 ? 'mt-20' : ''}`}>
                                        <div className='arrowbutton2'>
                                            <Button className='expandbutton'><ExpandMoreOutlined /></Button>
                                        </div>
                                        <span className="details">Prompt {promptIndex + 1} of {currentSection['promptQuestionsMap'].length}</span>
                                        <div className='titleText'>{prompt['question']}</div>
                                    </Box>
                                ))}
                            </div>
                        </>
                    }
                </Paper>
            </Box>
        </>
    );
};

export default FeedbackCard;
