import { AddCircleOutline, AddCircleOutlineOutlined, AddCircleOutlined, RemoveCircleOutline, RemoveCircleOutlined } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { useState, type FC, useEffect } from 'react';
import InformationChip from './InformationChip';


interface SituationalContextProps {
    title: string
    questions: any
}
const SituationalContext: FC<SituationalContextProps> = ({ title, questions }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedBtn, setSelectedBtn] = useState<any>([]);
    // const [expandedChip, setExpandedChip] = useState<any>({
    //     qnOrder: null,
    //     pillIndex: null
    // });
    const borderColor = '#2E5DB0'
    const onSelectionChange = (name: string) => {
        if (selectedBtn.includes(name)) {
            setSelectedBtn(selectedBtn.filter((item: any) => item !== name));
        } else {
            setSelectedBtn([...selectedBtn, name]);
        }
    }
    return (
        <>
            <Box className={`questionPill_container ${isExpanded ? "addHoverClass" : "removeHoverClass"}`}

                sx={{
                    border: isHovered ? `1px solid ${borderColor}` : `0.5px solid ${borderColor}`, width: isExpanded ? '100%' : 'fit-content'
                }}
                onMouseEnter={() => !isExpanded ? setIsHovered(true) : null}
                onMouseLeave={() => !isExpanded ? setIsHovered(false) : null}

            >
                <Box className='questionPill' onClick={() => setIsExpanded(!isExpanded)}>
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
                    <Box className='expandedSection'>


                        {
                            questions.map((question: any, index: number) => (
                                <Box key={index} className='questionContainer'>
                                    <Box className='question_title'>
                                        {question['order']}.{question['questionName']}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                                        {question['pills'].map((pill: any) => (
                                            <Button onClick={() => onSelectionChange(pill.name)} key={pill.name} className={`buttonstyleli ${selectedBtn.includes(pill.name) ? 'isSelected' : ''}`}>{pill.name}</Button>
                                        ))}
                                    </Box>
                                </Box>
                            ))
                        }


                    </Box>
                    // <Box className='expandedSection'>

                    //     {
                    //         questions.map((question: any, index: number) => (
                    //             <Box key={index} className='questionContainer'>
                    //                 <Box className='question_title'>
                    //                     {question['order']}.{question['title']}
                    //                 </Box>
                    //                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                    //                     {question['pills'].map((pill: any, pillIndex: number) => {
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
        </>
    );
}

export default SituationalContext;
