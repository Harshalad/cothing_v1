import { useState, FC, useRef, useEffect } from 'react';
import FeedbackHeader from './FeedbackHeader';
import { Box, Button, Stack, Typography } from '@mui/material';
import FeedbackActionsSidebar from './FeedbackActionsSidebar';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { motion } from 'framer-motion'
import SituationalContext from './SituationalContext';
import FeedbackCard from './FeedbackCard';
import { updateSituationContext } from '../../actions/coThinkPrep/updateSituationContext';
import { getMultiSectionDigitalClockSectionUtilityClass } from '@mui/x-date-pickers/MultiSectionDigitalClock/multiSectionDigitalClockSectionClasses';

interface FeedbackContentProps {
    data: any;
    user: any
    type: any;
}

const FeedbackContent: FC<FeedbackContentProps> = ({ data, user, type }) => {
    const cardRef: any = useRef([]);
    const [isOpen, setIsOpen] = useState(true);
    const [sectionStarted, setSectionStarted] = useState(false)
    const [showTitle, setShowTitle] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState<any>([]);
    const [expandIndex, setExpandIndex] = useState(-1);
    const modifiedDate = new Date(data?.modifiedDate);
    const formattedDate = `${modifiedDate.getDate()} ${modifiedDate.toLocaleString('en-US', { month: 'short' })} • ${modifiedDate.toLocaleString('en-US', { weekday: 'long' })}`;
    console.log(data, "cothinkdata");

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
            questionName: 'How is this relevant to my case?',
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
    const elementRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (elementRef?.current && headerRef?.current) {
                //@ts-ignore
                if (elementRef?.current?.getBoundingClientRect().top < headerRef?.current?.getBoundingClientRect()?.bottom) {
                    setShowTitle(true);
                } else {
                    setShowTitle(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleHide = (e: any) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
        setExpandIndex(0);
        setSectionStarted(true);
        cardRef.current?.[0]?.trigger()
        console.log('trigger')
    }

    useEffect(() => {
        setSelectedBtn(data?.situationContext !== null ? data?.situationContext : []);
    }, [data])
    return (
        <>
            <Box >
                <Box sx={{ width: 'fit-content' }} ref={headerRef}>
                    <FeedbackHeader titleName={data?.name} showTitle={showTitle} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'left', gap: '24px', marginTop: '70px', position: 'relative', }}>
                    <Box className="mainContainer" sx={{ paddingInline: '12px' }}>
                        <div className='contentWrapper'

                        >
                            <Typography variant="caption" sx={{ fontSize: 11, fontWeight: 500 }}>
                                Last Modified: {formattedDate}
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ width: '100%' }}>
                                <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }} ref={elementRef}>
                                    {data?.name}
                                </Typography>
                                {sectionStarted && <Button className="btn_viewmore" onClick={() => setIsOpen(!isOpen)} endIcon={isOpen ? <ExpandLess /> : <ExpandMore />}>
                                    View {isOpen ? 'Less' : 'More'}
                                </Button>}
                            </Stack>
                            <Typography variant='body1'>
                                {data?.description}
                            </Typography>
                            {isOpen && (
                                <motion.div
                                >
                                    <Box >
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            transition={{ delay: 0.1, duration: 0.5 }}
                                            style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}
                                        >
                                            <Button variant='outlined' className='btn_pill_transparent'
                                                startIcon={<img src='/images/icons/binocular.svg' alt="Binocular Icon" />}
                                            >
                                                Giving Feedback Framework todo rt
                                            </Button>
                                            <Button variant='outlined' className='btn_pill_transparent'
                                                startIcon={<img src='/images/icons/binocular.svg' alt="Binocular Icon" />}
                                            >
                                                {data?.totalTime} mins
                                            </Button>
                                        </motion.div>
                                    </Box>
                                    <Box sx={{ marginTop: '32px' }}>
                                        <motion.span
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                            {data?.sectionPills?.map((element: any, index: number) => (
                                                <SituationalContext title={'Before we get started, tell us more about your situation'} questions={questions} key={index} selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />

                                            ))
                                            }
                                        </motion.span>
                                    </Box>
                                    {!sectionStarted && <Box className="buttonstyle">
                                        <Button onClick={handleHide} className="nextButton" endIcon={<EastRoundedIcon />}>Next</Button>
                                    </Box>}
                                </motion.div>
                            )}
                        </div>
                        <Box sx={{ marginTop: '32px', opacity: sectionStarted ? 1 : 0.5, pointerEvents: sectionStarted ? 'auto' : 'none' }} >
                            {data?.sections.map((e: any, index: any) => (
                                <FeedbackCard key={index} sectionData={data} index={index} expandIndex={expandIndex} setExpandIndex={setExpandIndex} user={user} ref={(el: any) => (cardRef.current[index] = el)} />
                            ))}
                        </Box>
                    </Box>
                    <Box className="sidebarContainer">
                        <FeedbackActionsSidebar />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default FeedbackContent;
