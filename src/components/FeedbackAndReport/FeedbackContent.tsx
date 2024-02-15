import { useState, FC } from 'react';
import FeedbackHeader from './FeedbackHeader';
import { Box, Button, Stack, Typography } from '@mui/material';
import FeedbackActionsSidebar from './FeedbackActionsSidebar';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { ExpandMore } from '@mui/icons-material';

import SituationalContext from './SituationalContext';
import FeedbackCard from './FeedbackCard';

interface FeedbackContentProps {
    data: any;
}
//const [isOpen, setIsOpen] = useState(true);
// const onClick = () => {
//   setIsOpen((isShow) => !isShow);
//   }




const FeedbackContent: FC<FeedbackContentProps> = ({ data }) => {
    const modifiedDate = new Date(data.modifiedDate);
    const formattedDate = `${modifiedDate.getDate()} ${modifiedDate.toLocaleString('en-US', { month: 'short' })} • ${modifiedDate.toLocaleString('en-US', { weekday: 'long' })}`;
    const questions = [
        {
            title: 'How is this relevant to my business case?',
            order: 1,
            pills: [
                {
                    title: 'Option Alpha',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 1,
                },
                {
                    title: 'Lorem impsue',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 2,
                },
                {
                    title: 'Dolor Ismut',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 3,
                },
                {
                    title: 'Lorem Ipsum',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 4,
                },
                {
                    title: 'Lorem Ipsum',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 5,
                },
                {
                    title: 'Dolor impsut beta dolor',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 6,
                },
                {
                    title: 'Dolor impsut beta dolor',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 7,
                },
            ]
        },
        {
            title: 'How is this relevant to my business case?',
            order: 2,
            pills: [
                {
                    title: 'Option Alpha',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 1,
                },
                {
                    title: 'Lorem impsue',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 2,
                },
                {
                    title: 'Dolor Ismut',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 3,
                },
                {
                    title: 'Lorem Ipsum',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 4,
                },
                {
                    title: 'Lorem Ipsum',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 5,
                },
                {
                    title: 'Dolor impsut beta dolor',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 6,
                },
                {
                    title: 'Dolor impsut beta dolor',
                    desc: 'This is important because it helps you to understand the purpose of the product or service, and how it can benefit your business. It also helps you to make an informed decision about whether or not to use the product or service, and to understand the risks and limitations involved.',
                    tabs: [
                        {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }, {
                            title: 'Add raw materials costs as variable costs',
                            desc: 'As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have'
                        }

                    ],
                    order: 7,
                },
            ]
        }
    ]






    return (



        <>
            <Box sx={{ width: 'fit-content' }}>
                <FeedbackHeader />
            </Box>
            {/* <Button onClick={onClick}>click</Button> */}
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '19px' }}>
                <Box sx={{ paddingInline: '12px', width: '100%' }}>
                    <div className='contentWrapper'>
                        <Typography variant="caption" sx={{ fontSize: 11, fontWeight: 500 }}>
                            {formattedDate}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ width: '100%' }}>
                            <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700 }}>
                                Give feedback to direct report.
                            </Typography>

                            <Button className="btn_viewmore"
                                endIcon={<ExpandMore />}
                            >
                                View More
                            </Button>
                        </Stack>
                        <Typography variant='body1'>
                            State the observed behavior supporting it with data and/or examples in a specific incident/situation/task. Do not add interpretation/ judgement to keep the focus of the conversation on factual information.
                        </Typography>
                        <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant='outlined' className='btn_pill_transparent'
                                startIcon={<img src='/images/icons/binocular.svg' />}
                            >
                                Giving Feedback Framework
                            </Button>
                            <Button variant='outlined' className='btn_pill_transparent'
                                startIcon={<img src='/images/icons/binocular.svg' />}
                            >
                                15 Mins
                            </Button>
                        </Box>
                        <Box sx={{ marginTop: '32px' }}>
                            <SituationalContext title={'Before we get started, tell us more about your situation'} questions={questions} />
                        </Box>
                        <Box className="buttonstyle">
                            <Button className="nextButton" endIcon={<EastRoundedIcon />}>Next</Button>
                        </Box>
                        
                        {/* <Button variant="contained">Next <EastRoundedIcon /></Button> */}
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

