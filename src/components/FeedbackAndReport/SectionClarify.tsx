import { AddCircleOutline, AddCircleOutlineOutlined, AddCircleOutlined, RemoveCircleOutline, RemoveCircleOutlined } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { useState, type FC, useEffect } from 'react';
import InformationChip from './InformationChip';
import DraftChip from './DraftChip';



interface SituationalContextProps {
    title: string
    questions: any;
    parentRef: any;
    childRef?: any
    index: number;
    element: any;
    setPromptSelect?: any,
    onclick: (index: any) => void;
    data: any
    from: any
    questionId: any
}
const SituationalContext: FC<SituationalContextProps> = ({ title, questions, parentRef, index, onclick, setPromptSelect, childRef, element, data, from, questionId }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState<any>([]);
    const [expandedChip, setExpandedChip] = useState<any>(-1);
    const borderColor = '#2E5DB0'
    console.log(title, questions, parentRef, index, setPromptSelect, childRef, element, data, "elementelementelement");
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

    console.log("adityapratapsinghlodhiadityapratapsinghlodhi", title, questions, element, data, from);

    return (
        <>
            <Box className={`questionPill_container-get ${isExpanded ? "addHoverClass" : "removeHoverClass"}`}

                sx={{
                    border: isHovered ? `1px solid ${borderColor}` : `0.5px solid ${borderColor}`, width: isExpanded ? '100%' : 'fit-content'
                }}
                onMouseEnter={() => !isExpanded ? setIsHovered(true) : null}
                onMouseLeave={() => !isExpanded ? setIsHovered(false) : null}

            >
                <Box className='questionPill' onClick={(e: any) => { e.stopPropagation(); if (!isExpanded) { parentRef.current.style.background = "#eef4fa"; } else { parentRef.current.style.background = "white"; } { !isExpanded ? onclick(index) : onclick(-1) } setIsExpanded(!isExpanded); }} style={{padding: "0 10px"}}>
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


                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {
                                questions.map((question: any, index: number) =>
                                    expandedChip === -1 || expandedChip === index ? (
                                        question.pillAcceptReject ?
                                            <DraftChip childRef={childRef} key={index} data={question} index={index} onclick={(e) => setExpandedChip(e)} onDraftSelect={onDraftSelect} from={from} worksheet={data} section={element} questionId={questionId} title={title} />
                                            :
                                            <InformationChip key={index} data={question} index={index} onclick={(e) => setExpandedChip(e)} section={element} pillname={title} worksheet={data} from={from} />

                                    ) : null
                                )
                            }
                        </div>


                    </Box>
                )}


            </Box >
        </>
    );
}

export default SituationalContext;
