import type { FC } from 'react';
import { Button, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ChevronLeft, ExpandMore } from '@mui/icons-material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

interface FeedBackHeaderProps { }



const FeedBackHeader: FC<FeedBackHeaderProps> = () => {
    return (<>
        <div className='headerWrapper'>
            <div className="backButton">
                <Button
                    className='btn_back'
                    sx={{ width: 'auto' }}
                    variant="text"
                    startIcon={<ChevronLeft />}>
                    Back
                </Button>
            </div>
            <div className='centerText'>
                <div>
                    Give feedback to direct report.
                </div>
                <div className='svgicon'>
                    <ExpandMore />
                </div>
            </div>
        </div>
        
    </>);
}

export default FeedBackHeader;
