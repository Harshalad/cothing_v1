import { AddCircleOutline, AddCircleOutlineOutlined, AddCircleOutlined, RemoveCircleOutline, RemoveCircleOutlined } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { useState, type FC, useEffect, useRef } from 'react';
import InformationChip from './InformationChip';
import { AnimatePresence, motion } from 'framer-motion'

interface SituationalContextProps {
    title: string
    questions: any
    selectedBtn: any
    setSelectedBtn: any
}
const SituationalContext: FC<SituationalContextProps> = ({ title, questions, selectedBtn, setSelectedBtn }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const layerTop = useRef<any>(null);

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
            <motion.div initial={{ height: 0, width: 'fit-content' }}
                ref={layerTop}
                animate={{ height: 'auto', width: isExpanded ? '100%' : 'fit-content' }}
                transition={{ duration: 0.3 }} className={`questionPill_container-updated ${isExpanded ? "addHoverClass" : "removeHoverClass"}`}
                style={{
                    border: isHovered ? `1px solid ${borderColor}` : `0.5px solid ${borderColor}`,
                    minWidth: 'fit-content'
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
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='expandedSection'
                        >
                            {questions.map((question: any, index: number) => (
                                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                                    <Box className='questionContainer'>
                                        <Box className='question_title1'>
                                            <span>
                                                {question['order']}.{question['questionName']}
                                            </span>
                                        </Box>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                                            {question['pills'].map((pill: any, pillIndex: number) => (
                                                <motion.div key={pill.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{}}>
                                                    <Button onClick={() => onSelectionChange(pill.name, question?.questionName)} className={`buttonstyleli ${check(pill.name, question?.questionName) ? 'isSelected' : ''}`}>{pill.name}</Button>
                                                </motion.div>
                                            ))}
                                        </Box>
                                    </Box>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </Box>
            </motion.div>
        </>
    );
}

export default SituationalContext;
