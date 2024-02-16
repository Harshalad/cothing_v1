import { Paper, Typography, Box, Button, Divider } from '@mui/material';
import { useState, type FC, useEffect, useRef } from 'react';
import { Add, AddCircle, AddCircleOutline, ArrowForward, ExpandMoreOutlined, RemoveCircleOutlined } from '@mui/icons-material';
import SectionClarify from './SectionClarify';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import PromptTextInput from './PromptTextInput';
interface FeedbackCardProps {
    sectionData: any;
    index: number;
    expandIndex: number
}

const FeedbackCard: FC<FeedbackCardProps> = ({ sectionData, index, expandIndex }) => {
    const childRef: any = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [promptSelect, setPromptSelect] = useState('');
    const editorRef: any = useRef(null)
    const cardRef: any = useRef(null)
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [expandPrompt, setExpandPrompt] = useState(-1);
    const currentSection = sectionData['sections'][index];
    const totalSections = sectionData['sections'].length;
    const sectionClarity = sectionData['sectionClarity'].find((section: any) => section.sectionId === currentSection.id)?.sectionPills;
    const preQuestionClarity = sectionData['preQuestionClarity'].find((section: any) => section.sectionId === currentSection.id)?.questions
    const postQuestionClarity = sectionData['postQuestionClarity'].find((section: any) => section.sectionId === currentSection.id)?.questions
    const [expandPreQuestionClarity, setExpandPreQuestionClarity] = useState(-1);
    const [expandSectionClarity, setExpandSectionClarity] = useState(-1);
    const [expandpostQuestionClarity, setExpandpostQuestionClarity] = useState(-1);
    const [answerAceepted, setAnswerAceepted] = useState(false)

    useEffect(() => {
        if (expandIndex == index) {
            setIsExpanded(true);
            setIsDescriptionExpanded(true)
        }
    }, [expandIndex])

    const openPromptHandler = () => {
        setExpandPrompt(0)
        cardRef.current.style.background = 'white'
    }

    return (
        <>
            <Box>
                <Paper elevation={0} sx={{ margin: 2, padding: 2 }} className="card" ref={cardRef}>
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

                            <div >
                                {expandPrompt == -1 ? <>
                                    <div className='sectionClarify'>

                                        {sectionClarity?.map((element: any, idx: any) => (
                                            (expandSectionClarity == idx || expandSectionClarity === -1) && expandPreQuestionClarity && <SectionClarify parentRef={cardRef} key={idx} title={element.pillName} questions={element.childPills} index={idx} onclick={(e) => setExpandSectionClarity(e)} />
                                        ))}
                                    </div>
                                    {expandPrompt == -1 &&
                                        <Box className="buttonstyle" style={{ marginBottom: '8px', paddingRight: '25px' }}>
                                            <Button onClick={openPromptHandler} className="nextButton" endIcon={<EastRoundedIcon />}>Next</Button>
                                        </Box>
                                    }</> :
                                    null
                                }


                                <div className='que'>
                                    {currentSection['promptQuestionsMap'].map((prompt: any, promptIndex: number) => (
                                        <Box key={promptIndex} className={`card2 ${promptIndex !== 0 ? 'mt-20' : ''}`}>
                                            <div className='arrowbutton2'>
                                                <Button className='expandbutton'><ExpandMoreOutlined /></Button>
                                            </div>
                                            <span className="details">Prompt {promptIndex + 1} of {currentSection['promptQuestionsMap'].length}</span>
                                            <div className='titleText'>{prompt['question']}</div>

                                            {expandPrompt == promptIndex &&

                                                <>
                                                    {answerAceepted ? <Button style={{ width: 'fit-content', background: '#ebf1f7', color: '#2e5db0', marginTop: '10px' }} onClick={() => setAnswerAceepted(false)}><Add /></Button> : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
                                                        {preQuestionClarity?.map((e: any, index: any) => (
                                                            e.questionPills.map((r: any, j: any) => (
                                                                (expandPreQuestionClarity === -1 || expandPreQuestionClarity == j) && <SectionClarify childRef={childRef} setPromptSelect={setPromptSelect} parentRef={cardRef} key={j} title={r.pillName} questions={r.childPills} index={j} onclick={(e: any) => setExpandPreQuestionClarity(e)} />
                                                            ))
                                                        ))}
                                                    </div>}

                                                    <PromptTextInput setAnswerAceepted={setAnswerAceepted} promptSelect={promptSelect} setPromptSelect={setPromptSelect} ref={childRef} />
                                                    {
                                                        answerAceepted && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
                                                            {postQuestionClarity?.map((e: any, index: any) => (
                                                                e.questionPills.map((r: any, j: any) => (
                                                                    (expandpostQuestionClarity === -1 || expandpostQuestionClarity == j) && <SectionClarify childRef={childRef} setPromptSelect={setPromptSelect} parentRef={cardRef} key={j} title={r.pillName} questions={r.childPills} index={j} onclick={(e: any) => setExpandPreQuestionClarity(e)} />
                                                                ))
                                                            ))}
                                                        </div>
                                                    }
                                                </>

                                            }
                                        </Box>
                                    ))}
                                </div>
                            </div>
                        </>
                    }
                </Paper>
            </Box>

        </>
    );
};

export default FeedbackCard;
