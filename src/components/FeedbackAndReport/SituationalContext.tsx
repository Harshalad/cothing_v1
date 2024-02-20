import { AddCircleOutline, AddCircleOutlineOutlined, AddCircleOutlined, RemoveCircleOutline, RemoveCircleOutlined } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { useState, type FC, useEffect } from 'react';
import InformationChip from './InformationChip';
import { motion } from 'framer-motion'

interface SituationalContextProps {
    title: string
    questions: any
    selectedBtn: any
    setSelectedBtn: any
}
const SituationalContext: FC<SituationalContextProps> = ({ title, questions, selectedBtn, setSelectedBtn }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    // const [expandedChip, setExpandedChip] = useState<any>({
    //     qnOrder: null,
    //     pillIndex: null
    // });
    const borderColor = '#2E5DB0'
    const onSelectionChange = (name: string, question: any) => {
        const index = selectedBtn?.findIndex((item: any) => item.question === question);
        console.log(index, selectedBtn, "situation context");
        if (index !== -1) {
            const updatedSelectedBtn = [...selectedBtn];
            if (updatedSelectedBtn[index]?.selectedText?.includes(name)) {
                updatedSelectedBtn[index].selectedText = updatedSelectedBtn[index]?.selectedText?.filter((tag: any) => tag !== name);
            } else {
                updatedSelectedBtn[index].selectedText = [...(updatedSelectedBtn[index]?.selectedText || []), name];
            }
            setSelectedBtn(updatedSelectedBtn);
        } else {
            setSelectedBtn((prevSelectedBtn: any) => [
                ...prevSelectedBtn,
                { question: question, selectedText: [name] }
            ]);
        }

    }
    const check = (name: string, question: string) => {
        if (!Array.isArray(selectedBtn)) {
            return false;
        }
        const index = selectedBtn.findIndex((item: any) => item.question === question);

        if (index !== -1) {
            return selectedBtn[index]?.selectedText?.includes(name) || false;
        }
        return false;
    }

    console.log(selectedBtn, "questionsatsituationcontext");
    return (
        <>
            <motion.div initial={{ height: 0, width: '0' }}
                animate={{ height: 'auto', width: isExpanded ? '100%' : 'fit-content' }}
                transition={{ duration: 0.3 }} className={`questionPill_container-updated ${isExpanded ? "addHoverClass" : "removeHoverClass"}`}
                style={{
                    border: isHovered ? `1px solid ${borderColor}` : `0.5px solid ${borderColor}`, minWidth: 'fit-content'
                }}
                onMouseEnter={() => !isExpanded ? setIsHovered(true) : null}
                onMouseLeave={() => !isExpanded ? setIsHovered(false) : null}

            >
                <Box>
                    <Box className='questionPillContent' onClick={() => setIsExpanded(!isExpanded)}>
                        <img height={13} src="/images/icons/stars.svg" />
                        <p style={{ marginTop: "0", fontSize: "11px", fontWeight: "700" }}>
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
                        <motion.div initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{ delay: 0.06, duration: 0.3 }} className='expandedSection'>
                            {
                                questions.map((question: any, index: number) => (
                                    <Box key={index} className='questionContainer'>
                                        <Box className='question_title1'>
                                            <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                            transition={{delay:0.08*(index+1),duration:0.8*(index+1)}}
                                            >
                                            {question['order']}.{question['questionName']}
                                            </motion.span>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                                            {question['pills'].map((pill: any) => (
                                                <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} 
                                                transition={{delay:0.08*(index+1), duration:0.8*(index+1)}}
                                                >
                                                    <Button onClick={() => onSelectionChange(pill.name, question?.questionName)} key={pill.name} className={`buttonstyleli ${check(pill.name, question?.questionName) ? 'isSelected' : ''}`}>{pill.name}</Button>
                                                </motion.span>
                                            ))}
                                        </Box>
                                    </Box>
                                ))
                            }


                        </motion.div>
                        // <Box className='expandedSection'>

                        //     {
                        //         questions.map((question: any, index: number) => (
                        //             <Box key={ index } className='questionContainer'>
                        //                 <Box className='question_title'>
                        //                     { question[ 'order' ] }.{ question[ 'title' ] }
                        //                 </Box>
                        //                 <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: '24px' } }>
                        //                     { question[ 'pills' ].map( ( pill: any, pillIndex: number ) => {
                        //                         const isCurrentQuestionExpanded = expandedChip.qnOrder === index;
                        //                         const isCurrentPillExpanded = expandedChip.pillIndex === pillIndex;
                        //                         const shouldDisplayPill = isCurrentQuestionExpanded ? isCurrentPillExpanded : true;
                        //                         return shouldDisplayPill && (
                        //                             <Box key={pillIndex}>
                        //                                 <InformationChip keyIndex={`${index}-${pillIndex}`} data={pill} inProps={
                        //                                     {
                        //                                         renderPillIndex: pillIndex,
                        //                                         renderQuestionIndex: index,
                        //                                         selected: expandedChip
                        //                                     }
                        //                                 } onclick={(e) => {
                        //                                     const isDifferentQuestionClicked = expandedChip.qnOrder !== index;

                        //                                     if (isDifferentQuestionClicked) {
                        //                                         setExpandedChip({ qnOrder: index, pillIndex: pillIndex });

                        //                                     } else {

                        //                                         const isSamePillClicked = expandedChip.qnOrder === index && expandedChip.pillIndex === pillIndex;
                        //                                         if (isSamePillClicked) {
                        //                                             setExpandedChip({ qnOrder: null, pillIndex: null });

                        //                                         } else {
                        //                                             setExpandedChip({ qnOrder: index, pillIndex: pillIndex });

                        //                                         }
                        //                                     }
                        //                                 }} />
                        //                             </Box>
                        //                         );
                        //                     })}
                        //                 </Box>
                        //             </Box>
                        //         ))
                        //     }
                        // </Box>
                    )}


                </Box>
            </motion.div>
        </>
    );
}

export default SituationalContext;
