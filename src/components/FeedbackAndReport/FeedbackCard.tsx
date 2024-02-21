import { Paper, Typography, Box, Button, Divider } from '@mui/material';
import { useState, type FC, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Add, AddCircle, AddCircleOutline, ArrowForward, ExpandMoreOutlined, RemoveCircleOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SectionClarify from './SectionClarify';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import PromptTextInput from './PromptTextInput';
import { motion } from "framer-motion";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import { saveSectionQuestionAnswer } from '../../actions/prepare/saveSectionQuestionAnswer';
import { completeUserWorksheet } from '../../actions/prepare/completeUserWorksheet';
interface FeedbackCardProps {
    worksheet: any;
    index: number;
    expandIndex: number,
    setExpandIndex: any;
    user: any;
    setWorksheet: any
    ref: any

}

const FeedbackCard: FC<FeedbackCardProps | any> = forwardRef(({ worksheet, index, expandIndex, setExpandIndex, user, setWorksheet }, ref) => {
    const [isturncate, setIsturncate] = useState(true);
    const [hoverIndex, sethoverIndex] = useState(-1);
    const childRef: any = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [promptSelect, setPromptSelect] = useState('');
    const editorRef: any = useRef(null)
    const cardRef: any = useRef(null)
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [expandPrompt, setExpandPrompt] = useState(-1);
    const [currentSection, setCurrentSection] = useState<any>(worksheet['sections'][index]);
    const totalSections = worksheet['sections'].length;
    const [sectionClarity, setSectionClarity] = useState<any>(worksheet['sectionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.sectionPills);
    //const sectionClarity = worksheet[ 'sectionClarity' ].find( ( section: any ) => section.sectionId === currentSection?.id )?.sectionPills;
    const [preQuestionClarity, setPreQuestionClarity] = useState<any>(worksheet['preQuestionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.questions);
    const [postQuestionClarity, setPostQuestionClarity] = useState<any>(worksheet['postQuestionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.questions);
    const [expandPreQuestionClarity, setExpandPreQuestionClarity] = useState(-1);
    const [expandSectionClarity, setExpandSectionClarity] = useState(-1);
    const [expandpostQuestionClarity, setExpandpostQuestionClarity] = useState(-1);
    const [answerAceepted, setAnswerAceepted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [currentAnswer, setCurrentAnswer] = useState<any>(null);
    const [showPreSection, setShowPreSection] = useState<any>(false);
    const [acceptdata, setAcceptData] = useState<any>(null);

    useEffect(() => {
        if (expandPrompt != -1) {
            const question = currentSection['promptQuestionsMap'] ? currentSection['promptQuestionsMap'] : [];
            setCurrentQuestion(question[expandPrompt].question);
            setCurrentAnswer(question[expandPrompt].answer);
        }
    }, [expandPrompt, currentSection])

    console.log(currentAnswer, currentQuestion, answerAceepted, "currentquestiona dnanswer");
    useEffect(() => {
        setCurrentSection(worksheet?.sections ? worksheet['sections'][index] : null);
        setSectionClarity(worksheet['sectionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.sectionPills);
        setPreQuestionClarity(worksheet['preQuestionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.questions);
        setPostQuestionClarity(worksheet['postQuestionClarity'].find((section: any) => section.sectionId === currentSection?.id)?.questions);
    }, [worksheet, index])


    console.log(preQuestionClarity, 'preQuestionClarity');
    const viewmoreClick = (e: any) => {
        e.stopPropagation();
        setShowPreSection(!showPreSection)
    }

    const openPromptHandler = (e: any) => {
        e.stopPropagation();
        setExpandPrompt(0)
        cardRef.current.style.background = 'white'
        setShowPreSection(true)
    }
    const resetAllState = async () => {
        const questionsAnswersArray = [{
            question: currentQuestion,
            answer: currentAnswer
        }]
        const obj = {
            userId: user?.id,
            programId: user?.activeProgramId,
            goalId: null,
            milestoneId: null,
            methodId: null,
            methodType: null,
            worksheetId: null,
            sectionId: currentSection?.id,
            userWorkSheetId: worksheet?.id,
            questionsAnswersArray,
            lastQuestionAnsweredIndex: expandPrompt,
        }
        const response = await saveSectionQuestionAnswer(obj);
        console.log(response, index, expandPrompt, worksheet, "adityasavequestionon")

        if (response) {
            if (index === worksheet?.sections?.length - 1 && currentSection?.promptQuestionsMap?.length - 1 === expandPrompt) {
                const response1 = await completeUserWorksheet({
                    uwid: worksheet?.id,
                })
                console.log(response1, index, expandPrompt, "adityasavequestionon")

            }
            setPromptSelect('')
            cardRef.current.style.background = 'white'
            setExpandPreQuestionClarity(-1)
            setExpandSectionClarity(-1)
            setExpandpostQuestionClarity(-1)
            setAnswerAceepted(false)
        }
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
        cardRef.current.style.background = "white";

    }
    console.log("sectionDatasectionData", preQuestionClarity);
    return (
        <>

            <Paper elevation={0} sx={{ margin: 2, padding: 2 }} className={`card ${(index == expandIndex) && isDescriptionExpanded ? "applyBorder" : isExpanded ? "removeBorder" : ""}`} ref={cardRef} onClick={handleOnCardClick} onMouseEnter={() => { sethoverIndex(index); setIsturncate(true); if (!isExpanded) { setIsDescriptionExpanded(true); cardRef.current.classList.remove("applyBorder"); } cardRef.current.classList.add("applyBorder") }} onMouseLeave={() => { sethoverIndex(-1); if (!isExpanded) { setIsDescriptionExpanded(false); cardRef.current.classList.remove("applyBorder"); } }}>
                <div className={`innerContainer `}

                >
                    {
                        isExpanded ?
                            <Typography variant="h6" className="details" sx={{ fontSize: "16px!important" }} >Step {index + 1} </Typography> :
                            <Typography variant="h6" className="details">Step {index + 1} out of {totalSections}  </Typography>
                    }

                    <div className='arrowbutton' >
                        {isExpanded && index == expandIndex ?
                            <Button className='expandbutton' onClick={() => { setIsExpanded(!isExpanded); setIsDescriptionExpanded(!isDescriptionExpanded) }}><ExpandMoreOutlined /></Button> :
                            <Button className={isDescriptionExpanded && (index == expandIndex || hoverIndex == index) ? "arrowbuttonActive" : "buttonArrow"} onClick={(e) => openCardExpansion(e)}><ArrowForward /></Button>}
                    </div>
                    <Typography variant="subtitle1" className={`${(index == expandIndex) && isDescriptionExpanded && isExpanded ? "titleTextAdd" : "titleTextupdated"}`}>{currentSection['name']}</Typography>
                    {

                        <motion.div initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{ delay: 0.06, duration: 0.5 }}
                        >
                            {isDescriptionExpanded && (index == expandIndex || hoverIndex == index) &&
                                <motion.div className="viewmore"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    transition={{ delay: 0.06, duration: 0.5 }}
                                >
                                    <div className={`mt-2 f-14 fw-400 pr-3 formateText ${isturncate ? 'addmore' : ''}`} >{currentSection['description']}</div>
                                    {expandPrompt == 0 &&
                                        <div className="expandViewMore" style={{ color: '#2E5DB0', fontSize: '14px', fontWeight: '400' }}>view more <ExpandCircleDownIcon style={{ marginLeft: "3px" }} /></div>
                                    }
                                </motion.div>
                            }
                            {isDescriptionExpanded && (index == expandIndex || hoverIndex == index) &&
                                <Box style={{ marginTop: "15px" }} onClick={(e) => { e.stopPropagation(); setIsturncate(!isturncate) }}>
                                    <img
                                        style={{ transform: `rotate(${isturncate ? '0' : '180deg'})` }}
                                        src="/images/icons/Expandbutton.svg"
                                        alt="guidance"></img>
                                </Box>
                            }</motion.div>
                    }
                    {(!isExpanded || expandIndex !== index) &&
                        <div style={{ display: 'flex', marginTop: "48px" }}>
                            <Typography className='cardFooterText'>{currentSection['promptQuestionsMap'].length} Prompts</Typography>
                            <Divider orientation="vertical" flexItem style={{ height: '20px', margin: '0 10px' }} />
                            <Typography className='cardFooterText'>{currentSection['durationInMins']} mins</Typography>
                        </div>
                    }
                    {(isExpanded || expandIndex !== index) &&
                        <div style={{ fontSize: "11px", fontWeight: "400", color: '#878787', display: "flex", marginTop: '10px' }}>From HBR<span className='svgimage'><NorthEastIcon /></span></div>
                    }
                </div>

                {(index == expandIndex) && isDescriptionExpanded && isExpanded &&
                    <>
                        {expandSectionClarity !== -1 && <div style={{ height: '30px', marginTop: '-5px', background: 'white', width: '100%', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}></div>
                        }
                        <div className='addBorderContainer' onClick={(e) => { e.stopPropagation(); e.preventDefault() }}>
                            {expandPrompt == -1 ? <>

                                <motion.div className='sectionClarify' style={{ marginTop: "20px", marginBottom: isExpanded ? "20px" : '0px' }}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    transition={{ delay: 0.06, duration: 0.5 }}
                                    onClick={(e) => { e.stopPropagation(); e.preventDefault() }}
                                >

                                    {sectionClarity?.map((element: any, idx: any) => (
                                        (expandSectionClarity == idx || expandSectionClarity === -1) && expandPreQuestionClarity &&
                                        <SectionClarify
                                            parentRef={cardRef}
                                            key={idx}
                                            title={element.pillName}
                                            questions={element.childPills}
                                            index={idx}
                                            onclick={(e) => setExpandSectionClarity(e)}
                                            element={currentSection}
                                            worksheet={worksheet}
                                            from={"SECTION"}
                                            questionId={null}
                                            setWorksheet={setWorksheet}
                                            setAcceptData={null}
                                            currentAnswer={currentAnswer}
                                            currentQuestion={currentQuestion}
                                            promptLevel={false}
                                        />

                                    ))}
                                </motion.div>
                                <div></div>
                                {expandSectionClarity !== -1 && <div style={{ height: '30px', background: 'white', width: '100%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}></div>
                                }                                {expandPrompt == -1 &&
                                    <Box onClick={(e) => { e.stopPropagation(); e.preventDefault() }} className="buttonstyle1" style={{ paddingBottom: isExpanded ? "25px" : '8px', paddingRight: '25px', paddingTop: isExpanded ? "25px" : '8px', background: 'white', }}>
                                        <Button onClick={openPromptHandler} className="nextButton" endIcon={<EastRoundedIcon />}>Next</Button>
                                    </Box>
                                }</> :
                                null
                            }


                            <div className='customeTyle' style={{ paddingBottom: '25px', background: 'white' }}>
                                {currentSection['promptQuestionsMap'].map((prompt: any, promptIndex: number) => (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        transition={{ delay: 0.1, duration: 0.5 }}
                                        key={promptIndex}
                                    >
                                        <Box key={promptIndex} className={`card123 ${promptIndex !== 0 ? 'pt-20' : ''}`}>
                                            <div style={{ background: "white" }} className='colorDetails'>
                                                <div className='arrowbutton2' onClick={(e) => { e.stopPropagation(); setExpandPrompt(expandPrompt != promptIndex ? promptIndex : -1); setExpandPreQuestionClarity(-1); setAnswerAceepted(false) }}>
                                                    <Button style={{ minWidth: "23px !important", width: "23px !important", background: "none", borderRadius: "25px", color: "#000000", height: "24px !important", fontSize: '16px' }}>
                                                        <img style={{ transform: expandPrompt == 0 ? "rotate(180deg)" : "none" }}
                                                            src={"/images/icons/darrow.svg"} />
                                                    </Button>
                                                </div>
                                                <span className="detailsPrompt" style={{ padding: "25px" }}>Prompt {promptIndex + 1} of {currentSection['promptQuestionsMap'].length}</span>
                                                <div className='titleTextPrompt' style={{ padding: "25px" }}>{prompt['question']}</div>
                                            </div>

                                            {expandPrompt == promptIndex &&
                                                <>
                                                    {/* <div style={{ height: '30px', background: 'red', width: '100%', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}></div> */}
                                                    <Box>
                                                        {answerAceepted ? <Button style={{ width: 'fit-content', background: '#ebf1f7', color: '#2e5db0', marginTop: '10px', marginLeft: (expandPreQuestionClarity != -1 || expandpostQuestionClarity != -1) ? '25px' : '0' }} onClick={(e) => { e.stopPropagation(); setAnswerAceepted(false); setExpandPreQuestionClarity(-1) }}><Add /></Button> :
                                                            <motion.div
                                                                style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', }}
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                transition={{ delay: 0.06, duration: 0.5 }}
                                                            >

                                                                <Box sx={{ paddingLeft: expandPreQuestionClarity === -1 ? '25px' : '0', display: 'flex', gap: '24px', width: '100%' }}>

                                                                    {preQuestionClarity[promptIndex]?.questionPills.map((r: any, j: any) => (
                                                                        (expandPreQuestionClarity === -1 || expandPreQuestionClarity === j) &&
                                                                        <SectionClarify
                                                                            childRef={childRef}
                                                                            setPromptSelect={setPromptSelect}
                                                                            parentRef={cardRef}
                                                                            key={j}
                                                                            title={r.pillName}
                                                                            questions={r.childPills}
                                                                            index={j} onclick={(e: any) => { setExpandPreQuestionClarity(e) }}
                                                                            element={currentSection}
                                                                            worksheet={worksheet}
                                                                            from={"PRE"}
                                                                            questionId={preQuestionClarity[promptIndex].questionId}
                                                                            setWorksheet={setWorksheet}
                                                                            setAcceptData={setAcceptData}
                                                                            currentAnswer={currentAnswer}
                                                                            currentQuestion={currentQuestion}
                                                                            promptLevel={true}
                                                                        />
                                                                    ))
                                                                    }
                                                                </Box>
                                                            </motion.div>}
                                                        {/* <div style={{ height: '30px', background: 'red', width: '100%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}></div> */}

                                                        <Box sx={{ paddingLeft: '24px', paddingRight: '24px' }} onClick={e => e.stopPropagation()}>
                                                            <motion.span
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                            >
                                                                <PromptTextInput
                                                                    setAnswerAceepted={setAnswerAceepted}
                                                                    promptSelect={promptSelect}
                                                                    setPromptSelect={setPromptSelect}
                                                                    ref={childRef}
                                                                    setCurrentAnswer={setCurrentAnswer}
                                                                    currentAnswer={currentAnswer}
                                                                    currentSection={currentSection}
                                                                    expandPrompt={expandPrompt}
                                                                    currentQuestion={currentQuestion}
                                                                    acceptdata={acceptdata}
                                                                    worksheet={worksheet}
                                                                />
                                                            </motion.span>
                                                        </Box>
                                                        {
                                                            answerAceepted &&
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                                                <Box sx={{ paddingLeft: expandpostQuestionClarity === -1 ? '25px' : '0', display: 'flex', gap: '24px', width: '100%' }}>
                                                                    {postQuestionClarity[promptIndex]?.questionPills.map((r: any, j: any) => (
                                                                        (expandpostQuestionClarity === -1 || expandpostQuestionClarity === j) &&
                                                                        <SectionClarify
                                                                            childRef={childRef}
                                                                            setPromptSelect={setPromptSelect}
                                                                            parentRef={cardRef}
                                                                            key={j}
                                                                            title={r.pillName}
                                                                            questions={r.childPills}
                                                                            index={j} onclick={(e: any) => setExpandpostQuestionClarity(e)}
                                                                            element={currentSection}
                                                                            worksheet={worksheet}
                                                                            from={"POST"}
                                                                            questionId={postQuestionClarity[promptIndex].questionId}
                                                                            setWorksheet={setWorksheet}
                                                                            setAcceptData={setAcceptData}
                                                                            currentAnswer={currentAnswer}
                                                                            currentQuestion={currentQuestion}
                                                                            promptLevel={true}
                                                                        />
                                                                    ))
                                                                    }
                                                                </Box>
                                                            </div>
                                                        }
                                                        {
                                                            <Box className="buttonstyle" style={{ marginBottom: '8px', paddingRight: '25px' }}>
                                                                <Button onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    resetAllState();

                                                                    if (currentSection['promptQuestionsMap'].length == promptIndex + 1) {
                                                                        setExpandIndex(index + 1)
                                                                    } else {
                                                                        setExpandPrompt(promptIndex + 1);
                                                                    }
                                                                }}
                                                                    className="nextButton" style={{ marginBottom: "20px" }} endIcon={<EastRoundedIcon />}>Next</Button>
                                                            </Box>
                                                        }
                                                    </Box>

                                                </>
                                            }
                                        </Box>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </Paper>


        </>
    );
});
FeedbackCard.displayName = 'FeedbackCard';
export default FeedbackCard;
