import { Paper, Typography, Box, Button, Divider } from '@mui/material';
import { useState, type FC, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Add, AddCircle, AddCircleOutline, ArrowForward, ExpandMoreOutlined, RemoveCircleOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SectionClarify from './SectionClarify';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import PromptTextInput from './PromptTextInput';
interface FeedbackCardProps {
    sectionData: any;
    index: number;
    expandIndex: number,
    setExpandIndex: any;
    user: any;

}

const FeedbackCard: FC<FeedbackCardProps | any> = forwardRef(({ sectionData, index, expandIndex, setExpandIndex, user }, ref) => {
    const [isturncate, setIsturncate] = useState(true);
    const [hoverIndex, sethoverIndex] = useState(-1);
    const childRef: any = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [promptSelect, setPromptSelect] = useState('');
    const editorRef: any = useRef(null)
    const cardRef: any = useRef(null)
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [expandPrompt, setExpandPrompt] = useState(-1);
    const [currentSection, setCurrentSection] = useState<any>(sectionData['sections'][index]);
    const totalSections = sectionData['sections'].length;
    const sectionClarity = sectionData['sectionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.sectionPills;
    const preQuestionClarity = sectionData['preQuestionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.questions
    const postQuestionClarity = sectionData['postQuestionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.questions
    const [expandPreQuestionClarity, setExpandPreQuestionClarity] = useState(-1);
    const [expandSectionClarity, setExpandSectionClarity] = useState(-1);
    const [expandpostQuestionClarity, setExpandpostQuestionClarity] = useState(-1);
    const [answerAceepted, setAnswerAceepted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [currentAnswer, setCurrentAnswer] = useState<any>(null);

    useEffect(() => {
        if (expandPrompt != -1) {
            const question = currentSection['promptQuestionsMap'] ? currentSection['promptQuestionsMap'] : [];
            setCurrentQuestion(question[expandPrompt].question);
            setCurrentAnswer(question[expandPrompt].answer);
        }
    }, [expandPrompt, currentSection])

    console.log(currentAnswer, currentQuestion, "currentquestiona dnanswer");
    useEffect(() => {
        setCurrentSection(sectionData?.sections ? sectionData['sections'][index] : null);
    }, [sectionData, index])


    console.log(preQuestionClarity, 'preQuestionClarity');


    const openPromptHandler = (e: any) => {
        e.stopPropagation();
        setExpandPrompt(0)
        cardRef.current.style.background = 'white'
    }
    const resetAllState = () => {
        setPromptSelect('')
        cardRef.current.style.background = 'white'
        setExpandPreQuestionClarity(-1)
        setExpandSectionClarity(-1)
        setExpandpostQuestionClarity(-1)
        setAnswerAceepted(false)
    }
    useEffect(() => {
        // if (expandIndex == index) {
        //     setIsExpanded(true);
        //     setIsDescriptionExpanded(true)
        // } else {
        //     setIsExpanded(false);
        //     setIsDescriptionExpanded(true)
        // }
    }, [expandIndex])

    useImperativeHandle(ref, () => ({
        trigger: () => {
            setIsExpanded(true);
            setIsDescriptionExpanded(true)
            setIsturncate(false)
        }
    }));
    const handleOnCardClick = () => {
        setExpandIndex(index)
        if (isDescriptionExpanded) {
            setIsDescriptionExpanded(false)
        } else {
            setIsDescriptionExpanded(true)
        }

        setIsExpanded(false);
        setIsturncate(true)

    }
    const openCardExpansion = (e: any) => {
        // Fix: Correct the spelling of stopPropagation
        e.stopPropagation();
        setExpandIndex(index)
        console.log('trigger');
        isDescriptionExpanded ? setIsExpanded(!isExpanded) : setIsDescriptionExpanded(!isDescriptionExpanded)
        setIsturncate(false)

    }
    console.log("sectionDatasectionData", preQuestionClarity);
    return (
        <>

            <Paper elevation={0} sx={{ margin: 2, padding: 2 }} className={`card ${(index == expandIndex) && isDescriptionExpanded ? "applyBorder" : isExpanded ? "removeBorder" : ""}`} ref={cardRef} onClick={handleOnCardClick} onMouseEnter={() => { sethoverIndex(index); setIsturncate(true); if (!isExpanded) { setIsDescriptionExpanded(true); cardRef.current.classList.remove("applyBorder"); } cardRef.current.classList.add("applyBorder") }} onMouseLeave={() => { sethoverIndex(-1); if (!isExpanded) { setIsDescriptionExpanded(false); cardRef.current.classList.remove("applyBorder"); } }}>
                <div className={`innerContainer `} >
                    {
                        isExpanded ?
                            <Typography variant="h6" className="details">Step {index + 1} </Typography> :
                            <Typography variant="h6" className="details">Step {index + 1} out of {totalSections}  </Typography>
                    }

                    <div className='arrowbutton' >
                        {isExpanded && index == expandIndex ?
                            <Button className='expandbutton' onClick={() => { setIsExpanded(!isExpanded); setIsDescriptionExpanded(!isDescriptionExpanded) }}><ExpandMoreOutlined /></Button> :
                            <Button className={isDescriptionExpanded && (index == expandIndex || hoverIndex == index) ? "arrowbuttonActive" : "buttonArrow"} onClick={(e) => openCardExpansion(e)}><ArrowForward /></Button>}
                    </div>
                    <Typography variant="subtitle1" className={`${(index == expandIndex) && isDescriptionExpanded && isExpanded ? "titleTextAdd" : "titleTextupdated"}`}>{currentSection['name']}</Typography>
                    {isDescriptionExpanded && (index == expandIndex || hoverIndex == index) &&
                        <div className="viewmore">
                            <div className={`mt-2 f-14 fw-400 pr-3 formateText ${isturncate ? 'addmore' : ''}`}>{currentSection['description']}</div>
                        </div>
                    }
                    {isDescriptionExpanded && (index == expandIndex || hoverIndex == index) &&
                        <Box style={{ marginTop: "15px" }} onClick={(e) => { e.stopPropagation(); setIsturncate(!isturncate) }}>
                            <img
                                style={{ transform: `rotate(${isturncate ? '0' : '180deg'})` }}
                                src="/images/icons/Expandbutton.svg"
                                alt="guidance"></img>
                        </Box>
                    }
                    {(!isExpanded || expandIndex !== index) &&
                        <div style={{ display: 'flex', marginTop: "48px" }}>
                            <Typography className='cardFooterText'>{currentSection['promptQuestionsMap'].length} Prompts</Typography>
                            <Divider orientation="vertical" flexItem style={{ height: '20px', margin: '0 10px' }} />
                            <Typography className='cardFooterText'>{currentSection['durationInMins']} mins</Typography>
                        </div>
                    }
                </div>

                {(index == expandIndex) && isDescriptionExpanded && isExpanded &&
                    <>

                        <div className='addBorderContainer'>
                            {expandPrompt == -1 ? <>
                                <div className='sectionClarify' style={{ marginTop: "20px" }}>

                                    {sectionClarity?.map((element: any, idx: any) => (
                                        (expandSectionClarity == idx || expandSectionClarity === -1) && expandPreQuestionClarity && <SectionClarify parentRef={cardRef} key={idx} title={element.pillName} questions={element.childPills} index={idx} onclick={(e) => setExpandSectionClarity(e)} element={currentSection} data={sectionData} from={"SECTION"} questionId={null} />
                                    ))}
                                </div>
                                {expandPrompt == -1 &&
                                    <Box className="buttonstyle1" style={{ marginBottom: '8px', paddingRight: '25px' }}>
                                        <Button onClick={openPromptHandler} className="nextButton" endIcon={<EastRoundedIcon />}>Next</Button>
                                    </Box>
                                }</> :
                                null
                            }


                            <div className='customeTyle'>
                                {currentSection['promptQuestionsMap'].map((prompt: any, promptIndex: number) => (
                                    <Box key={promptIndex} className={`card123 ${promptIndex !== 0 ? 'pt-20' : ''}`}>
                                        <div style={{ background: "white" }} className='colorDetails'>
                                            <div className='arrowbutton2' onClick={(e) => { e.stopPropagation(); setExpandPrompt(expandPrompt != promptIndex ? promptIndex : -1); setExpandPreQuestionClarity(-1) }}>
                                                <Button style={{ minWidth: "30px !important", width: "30px !important", background: "none", borderRadius: "25px", color: "#000000", height: "30px !important", fontSize: '16px' }}><KeyboardArrowDownIcon /></Button>
                                            </div>
                                            <span className="detailsPrompt" style={{ padding: "25px" }}>Prompt {promptIndex + 1} of {currentSection['promptQuestionsMap'].length}</span>
                                            <div className='titleTextPrompt' style={{ padding: "25px" }}>{prompt['question']}</div>
                                        </div>

                                        {expandPrompt == promptIndex &&

                                            <Box sx={{ padding: expandPrompt == promptIndex && expandPreQuestionClarity != -1 ? '0' : '25px' }}>
                                                {answerAceepted ? <Button style={{ width: 'fit-content', background: '#ebf1f7', color: '#2e5db0', marginTop: '10px', }} onClick={(e) => { e.stopPropagation(); setAnswerAceepted(false) }}><Add /></Button> : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                                    {preQuestionClarity[promptIndex]?.questionPills.map((r: any, j: any) => (
                                                        (expandPreQuestionClarity === -1 || expandPreQuestionClarity === j) && <SectionClarify childRef={childRef} setPromptSelect={setPromptSelect} parentRef={cardRef} key={j} title={r.pillName} questions={r.childPills} index={j} onclick={(e: any) => { setExpandPreQuestionClarity(e) }} element={currentSection} data={sectionData} from={"PRE"} questionId={preQuestionClarity[promptIndex].questionId} />
                                                    ))
                                                    }
                                                </div>}

                                                <PromptTextInput setAnswerAceepted={setAnswerAceepted} promptSelect={promptSelect} setPromptSelect={setPromptSelect} ref={childRef} />
                                                {
                                                    answerAceepted && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
                                                        {postQuestionClarity[promptIndex]?.questionPills.map((r: any, j: any) => (
                                                            (expandpostQuestionClarity === -1 || expandpostQuestionClarity === j) && <SectionClarify childRef={childRef} setPromptSelect={setPromptSelect} parentRef={cardRef} key={j} title={r.pillName} questions={r.childPills} index={j} onclick={(e: any) => setExpandpostQuestionClarity(e)} element={currentSection} data={sectionData} from={"POST"} questionId={postQuestionClarity[promptIndex].questionId} />
                                                        ))
                                                        }
                                                    </div>
                                                }
                                                {
                                                    answerAceepted && <Box className="buttonstyle" style={{ marginBottom: '8px', paddingRight: '25px' }}>
                                                        <Button onClick={(e) => {
                                                            e.stopPropagation()
                                                            resetAllState();

                                                            if (currentSection['promptQuestionsMap'].length == promptIndex + 1) {
                                                                setExpandIndex(index + 1)
                                                            } else {
                                                                setExpandPrompt(promptIndex + 1);
                                                            }
                                                        }}
                                                            className="nextButton" endIcon={<EastRoundedIcon />}>Next</Button>
                                                    </Box>
                                                }
                                            </Box>

                                        }
                                    </Box>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </Paper>


        </>
    );
});

export default FeedbackCard;
