import { ExpandMore, OpenInFull, RefreshOutlined } from '@mui/icons-material';
import { Box, Typography, Skeleton } from '@mui/material';
import { useState, FC, useEffect } from 'react';

interface InformationChipProps {
    data: any;
    index: number
    onclick: (index: any) => void;
}

const InformationChip: FC<InformationChipProps> = ({ data, onclick, index }) => {
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





    return (
        <Box className='informationPill_container' onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* use isActive class to active */}
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                onClick={() => { onclick(isExpanded ? -1 : index); setIsExpanded(!isExpanded) }}>
                <img src="/images/icons/binocular.svg" alt="Binocular Icon" />
                <Typography>{data.pillName}</Typography>
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
                                    This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.
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
