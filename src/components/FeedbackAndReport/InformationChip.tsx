import { ExpandMore, OpenInFull, RefreshOutlined } from '@mui/icons-material';
import { Box, Typography, Skeleton } from '@mui/material';
import { useState, FC, useEffect } from 'react';

interface InformationChipProps {
    data: any;
    keyIndex: string;
    inProps: any;
    onclick: (index: any) => void;
}

const InformationChip: FC<InformationChipProps> = ({ data, keyIndex, onclick, inProps }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setIsRefreshing(true)
        const timer = setTimeout(() => {
            setIsRefreshing(false)
        }, 1000);

        return () => clearTimeout(timer);
    }, [isExpanded]);



    const handleRefreshClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
    };

    useEffect(() => {
        if (inProps.selected.qnOrder !== inProps.renderQuestionIndex || inProps.selected.pillIndex !== inProps.renderPillIndex) {
            setIsExpanded(false)
        }
    }, [inProps])



    return (
        <Box className='informationPill_container'  onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* use isActive class to active */}
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                onClick={() => { onclick(isExpanded ? null : keyIndex); setIsExpanded(!isExpanded) }}>
                <img src="/images/icons/binocular.svg" alt="Binocular Icon" />
                <Typography>{data.title}</Typography>
                {
                    isExpanded && (
                        <RefreshOutlined
                            onClick={handleRefreshClick}
                            sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)', marginLeft: 'auto' }} />
                    )
                }
                {(isHovered || isExpanded) && (
                    <OpenInFull
                        sx={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)' }} />
                )}
            </Box>
            {
                isExpanded && (
                    <Box sx={{ width: '100%' }}>
                        {isRefreshing ? (
                            <> <Skeleton variant="rectangular" animation="wave" width="100%" height={300} /></>
                        ) : (
                            <>
                                <Box>
                                    {data.desc}
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {data.tabs?.map((tab: { title: string; desc: string }, index: number) => (
                                        <Box key={index} className='suggestionTab'>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                {tab.title}
                                                <ExpandMore />
                                            </Box>
                                            <Box className='suggestionTab_desc'>
                                                {tab.desc}
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>
                )
            }
        </Box >
    );
}
export default InformationChip;
