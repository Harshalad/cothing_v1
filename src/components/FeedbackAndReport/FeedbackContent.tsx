import { useState, FC } from 'react';
import FeedbackHeader from './FeedbackHeader';
import { Box, Button, Stack, Typography } from '@mui/material';
import FeedbackActionsSidebar from './FeedbackActionsSidebar';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { ExpandMore } from '@mui/icons-material';
import { motion } from 'framer-motion'
import SituationalContext from './SituationalContext';
import FeedbackCard from './FeedbackCard';

interface FeedbackContentProps {
    data: any;
}




const FeedbackContent: FC<FeedbackContentProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(true);
    const modifiedDate = new Date(data.modifiedDate);
    const formattedDate = `${modifiedDate.getDate()} ${modifiedDate.toLocaleString('en-US', { month: 'short' })} • ${modifiedDate.toLocaleString('en-US', { weekday: 'long' })}`;
    const questions = [
        {
            questionName: 'How is this relevant to my business case?',
            order: 1,
            pills: [
                {
                    name: 'Option Alpha',
                },
                {
                    name: 'Lorem impsue',

                    order: 2,
                },
                {
                    name: 'Dolor Ismut',

                    order: 3,
                },
                {
                    name: 'Lorem Ipsu2m',

                    order: 4,
                },
                {
                    name: 'Lorem Ipsum',

                    order: 5,
                },
                {
                    name: 'Dolor impsut beta dolor222',

                    order: 6,
                },
                {
                    name: 'Dolor impsut beta dolor',

                    order: 7,
                },
            ]
        },
        {
            questionName: 'How is this relevant to my business case?',
            order: 2,
            pills: [
                {
                    name: 'Option Alpha1',

                    order: 1,
                },
                {
                    name: 'Lorem impsue2',

                    order: 2,
                },
                {
                    name: 'Dolor Ismut3',

                    order: 3,
                },
                {
                    name: 'Lorem Ipsum4',

                    order: 4,
                },
                {
                    name: 'Lorem Ipsum5',

                    order: 5,
                },
                {
                    name: 'Dolor impsut beta dolor6',

                    order: 6,
                },
                {
                    name: 'Dolor impsut beta dolor7',

                    order: 7,
                },
            ]
        }
    ]
    console.clear()
    console.log(data)
    const handleHide = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <Box sx={{ width: 'fit-content' }}>
                <FeedbackHeader titleName={data['name']} />
            </Box>


            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '19px' }}>
                <Box sx={{ paddingInline: '12px', width: '100%' }}>
                    <div className='contentWrapper'

                    >
                        <Typography variant="caption" sx={{ fontSize: 11, fontWeight: 500 }}>
                            {formattedDate}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ width: '100%' }}>
                            <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
                                {data['name']}
                            </Typography>

                            {(!isOpen) && <Button className="btn_viewmore" onClick={() => setIsOpen(!isOpen)}
                                endIcon={<ExpandMore />}
                            >
                                View More
                            </Button>}
                        </Stack>
                        <Typography variant='body1'>
                            {data['description']}
                        </Typography>
                        {isOpen && (
                            <motion.div>
                                <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant='outlined' className='btn_pill_transparent'
                                        startIcon={<img src='/images/icons/binocular.svg' alt="Binocular Icon" />}
                                    >
                                        Giving Feedback Framework
                                    </Button>
                                    <Button variant='outlined' className='btn_pill_transparent'
                                        startIcon={<img src='/images/icons/binocular.svg' alt="Binocular Icon" />}
                                    >
                                        15 Mins
                                    </Button>
                                </Box>
                                <Box sx={{ marginTop: '32px' }}>
                                    {data['sectionPills'].map((element: any, index: number) => (
                                        <SituationalContext title={'Before we get started, tell us more about your situation'} questions={questions} />

                                    ))
                                    }
                                </Box>
                                <Box className="buttonstyle">
                                    <Button onClick={handleHide} className="nextButton" endIcon={<EastRoundedIcon />}>Next</Button>
                                </Box>
                            </motion.div>
                        )

                        }


                    </div>
                    <Box sx={{ marginTop: '32px' }}>
                        <FeedbackCard />
                    </Box>
                </Box>



                <Box sx={{ width: 286, height: '100vh', background: 'lightgrey' }}>
                    <FeedbackActionsSidebar />
                </Box>
            </Box>
        </>
    );
}

export default FeedbackContent;

