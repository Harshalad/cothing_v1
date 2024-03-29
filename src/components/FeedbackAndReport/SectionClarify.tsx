import { AddCircleOutline, AddCircleOutlineOutlined, AddCircleOutlined, RemoveCircleOutline, RemoveCircleOutlined } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { useState, type FC, useEffect } from 'react';
import InformationChip from './InformationChip';
import DraftChip from './DraftChip';
import { motion } from 'framer-motion'



interface SituationalContextProps {
    title: string
    questions: any;
    parentRef: any;
    childRef?: any
    index: number;
    element: any;
    setPromptSelect?: any,
    onclick: (index: any) => void;
    worksheet: any
    from: any
    questionId: any;
    promptLevel: any
    setWorksheet: any
    setAcceptData: any
    currentAnswer: any
    currentQuestion: any
}
const SituationalContext: FC<SituationalContextProps> = ({ title, questions, parentRef, index, onclick, setPromptSelect, childRef, element, worksheet, from, questionId, setWorksheet, setAcceptData, currentAnswer, currentQuestion, promptLevel }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState<any>([]);
    const [expandedChip, setExpandedChip] = useState<any>(-1);
    const borderColor = '#2E5DB0'
    console.log(title, questions, parentRef, index, setPromptSelect, childRef, element, worksheet, "elementelementelement");
    const onSelectionChange = (name: string) => {
        if (selectedBtn.includes(name)) {
            setSelectedBtn(selectedBtn.filter((item: any) => item !== name));
        } else {
            setSelectedBtn([...selectedBtn, name]);
        }
    }

    const onDraftSelect = (data: any) => {
        setPromptSelect('')
        setPromptSelect(data)
    }

    console.log("adityapratapsinghlodhiadityapratapsinghlodhi", title, questions, element, worksheet, from);

    return (
        <>
            <Box className={`questionPill_container-get ${isExpanded ? "addHoverClass" : "removeHoverClass"}`}
                sx={{
                    border: isHovered ? `1px solid ${borderColor}` : `0.5px solid ${borderColor}`, width: isExpanded ? '100%' : 'fit-content',
                    padding: isExpanded ? promptLevel ? 0 : 'padding: 10px 20px 30px 20px' : 0
                }}
                onMouseEnter={() => !isExpanded ? setIsHovered(true) : null}
                onMouseLeave={() => !isExpanded ? setIsHovered(false) : null}

            >
                {isExpanded && promptLevel && <div style={{ height: '30px', background: 'white', marginInline: '-20px', marginTop: '-5px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}></div>
                }                <Box className='questionPill' onClick={(e: any) => { e.stopPropagation(); if (!isExpanded) { parentRef.current.style.background = "#eef4fa"; } else { parentRef.current.style.background = "white"; } { !isExpanded ? onclick(index) : onclick(-1) } setIsExpanded(!isExpanded); }} style={{ padding: "0 10px" }}>
                    <img height={13} src="/images/icons/stars.svg" />
                    <p>
                        {title}
                    </p>
                    {
                        isExpanded ? (
                            <RemoveCircleOutlined className='circleOutline' />
                        ) : isHovered ? (
                            <AddCircleOutlined className='circleOutline' />
                        ) : (
                            <AddCircleOutlineOutlined className='circleOutline' />
                        )
                    }
                </Box>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ delay: 0.06, duration: 0.5 }}
                        className='expandedSection'>
                        <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {
                                questions.map((question: any, index: number) =>
                                    expandedChip === -1 || expandedChip === index ? (
                                        question.pillAcceptReject ?
                                            <DraftChip childRef={childRef} key={index} data={question} index={index} onclick={(e) => setExpandedChip(e)} onDraftSelect={onDraftSelect} from={from} worksheet={worksheet} section={element} questionId={questionId} title={title} setWorksheet={setWorksheet} setAcceptData={setAcceptData} currentAnswer={currentAnswer} currentQuestion={currentQuestion} />
                                            :
                                            <InformationChip key={index} data={question} index={index} onclick={(e) => setExpandedChip(e)} section={element} pillname={title} worksheet={worksheet} from={from} setWorksheet={setWorksheet} />

                                    ) : null
                                )
                            }
                        </motion.div>
                    </motion.div>
                )}

                {isExpanded && promptLevel && < div style={{ height: '30px', background: 'white', marginInline: '-20px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}></div>
                }
            </Box >
        </>
    );
}
export default SituationalContext;
