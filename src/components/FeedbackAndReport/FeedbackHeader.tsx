import type { FC } from 'react';
import { Button } from '@mui/material';
import { ChevronLeft, ExpandMore } from '@mui/icons-material';
interface FeedBackHeaderProps {
    titleName: string
    showTitle: boolean
}



const FeedBackHeader: FC<FeedBackHeaderProps | any> = ({ titleName, showTitle }) => {
    const scrollHandler = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
            {showTitle && <div className='centerText' onClick={scrollHandler}>
                <div>
                    {titleName}
                </div>
                <div className='svgicon'>
                    <ExpandMore />
                </div>
            </div>}
        </div>

    </>);
}

export default FeedBackHeader;
