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
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState<any>([]);
    const [expandedChip, setExpandedChip] = useState<any>(-1);
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
                    <img height={18} src="/images/icons/stars.svg" />
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
                                        <InformationChip key={index} data={question} index={index} onclick={(e) => setExpandedChip(e)} />
                                    ) : null
                                )
                            }
                        </div>


                    </Box>
                )}


            </Box>
        </>
    );
}

export default SituationalContext;
