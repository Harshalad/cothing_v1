import React, { useEffect, useState } from 'react';
import FeedbackActionSidebar from './FeedbackActionsSidebar';
import FeedbackContent from './FeedbackContent';
import HeaderNav from '../common/HeaderNav/HeaderNav';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fetchUserSheet } from '../../actions/coThinkPrep/fetchUserSheet';

const FeedbackReportPage: React.FC = () => {
  const drawerWidth = 250;
  const [ worksheet, setWorksheet ] = useState<any>( null );
  const router = useRouter();
  const [ userWorkSheetId, setUserWorksheetId ] = useState<any>( null );
  const [ type, setType ] = useState<any>( null );
  useEffect( () => {
    setUserWorksheetId( router?.query?.id );
    setType( router?.query?.type === "prep" ? "PREPARE" : "QP" );
  }, [ router ] )
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  useEffect( () => {
    const getUserWorksheet = async () => {
      const response = await fetchUserSheet( { userId: user?.id, programId: user?.activeProgramId, userWorksheetId: userWorkSheetId, type: type } );
      setWorksheet( response );
    }
    getUserWorksheet();
  }, [ userWorkSheetId, type ] )
  console.log( worksheet, "worksheetatcothink" )
  const json = {

    "sections": [
      {
        "name": "Reflect",
        "description": "Maintaining a Growth Mindset starts with self-awareness. Stay aware of your thinking, behavior, and language patterns. Use this awareness to shift your mindset to functional behaviors.",
        "completeText": null,
        "id": "e3bf29c6-9ca4-4878-b34a-bdd3f4d6e8e1",
        "status": null,
        "promptQuestionsMap": [
          {
            "question": "Look back on the last 15 days at the workplace. What, in your thinking, actions and/or language, was a Fixed Mindset? What triggered it? As a result what, perhaps, was a dysfunctional consequence for you?",
            "answer": null
          },
          {
            "question": "Look back on the last 15 days at the workplace. What, in your thinking, actions or language, was a Growth Mindset? What enabled it? What, as a result, was a functional consequence for you?",
            "answer": null
          }
        ],
        "durationInMins": 0
      },
      {
        "name": "Observe your mind",
        "description": "Pay attention to your thoughts. What is a pattern you observe? Observing ‘inner chatter’ will reveal the patterns in which the mind works. It will reveal what situation (or what conversation) could trigger Fixed Mindset.",
        "completeText": null,
        "id": "c61958aa-2077-4563-a1ac-c285f4341e26",
        "status": null,
        "promptQuestionsMap": [
          {
            "question": "In the coming 15 days in what situation could you experience a Fixed Mindset trigger?",
            "answer": null
          },
          {
            "question": "To ensure that you continue to operate from a Growth Mindset - what will you start, stop or continue?",
            "answer": null
          }
        ],
        "durationInMins": 0
      },
      {
        "name": "Adopt a Growth Mindset",
        "description": "Our mind has a tendency to function like prediction machines, creating formulas that can increase the chances of predictability. To enable this function our mind tends to limit the information that comes to us. If we are going to wake up thinking ‘I am going to fail’ then our mind will start collecting data to prove it. Then we failed because we allowed ourselves to fall into a Fixed Mindset. A classic sign of a Fixed Mindset is a debilitating fear of making mistakes. Growth Mindset may not be a cure-all, but research shows it to be an effective method for improving performance.",
        "completeText": null,
        "id": "c9420c10-d791-46b9-84ae-c6040f0c94d7",
        "status": null,
        "promptQuestionsMap": [
          {
            "question": "In the coming 15 days what will you do to consciously adopt a Growth Mindset – and specifically in which situations or conversations?",
            "answer": null
          },
          {
            "question": "What thinking, actions, language will you use to role model a Growth Mindset?",
            "answer": null
          },
          {
            "question": "What will you start? What will you stop? What will you continue?",
            "answer": null
          }
        ],
        "durationInMins": 0
      }
    ],
    "name": "Adopt a Continuous Growth Mindset",
    "modifiedDate": 1684948063232,
    "typeOfWorksheet": "Preparation",
    "status": "added",
    "milestoneId": "70b58c0e-8e1b-4e62-a5d5-480b5807767f",
    "worksheetId": "0c647333-9cec-4dca-ad11-5edc4a8d251d",
    "description": "State the observed behavior supporting it with data and/or examples in a specific incident/situation/task. Do not add interpretation/ judgement to keep the focus of the conversation on factual information.",
    "noOfSectionsCompleted": 0,
    "worksheetCompletionStatus": null,
    "programId": "zOMjIflQWzC8NpzfmqxX",
    "sectionClarity": [
      {
        "sectionId": "e3bf29c6-9ca4-4878-b34a-bdd3f4d6e8e1",
        "sectionPills": [
          {
            "pillName": "Need clarification on the question?",
            "childPills": [
              {
                "pillName": "How do I connect this to my business context?",
                "order": 1
              },
              {
                "pillName": "Can I skip this?",
                "order": 2
              },
              {
                "pillName": "Why is this important?",
                "order": 3
              },
              {
                "pillName": "Simplify the question",
                "order": 4
              }
            ],
            "order": 1
          }
        ]
      },
      {
        "sectionId": "c61958aa-2077-4563-a1ac-c285f4341e26",
        "sectionPills": [
          {
            "pillName": "Need clarification on the question?",
            "childPills": [
              {
                "pillName": "How do I connect this to my business context?",
                "order": 1
              },
              {
                "pillName": "Can I skip this?",
                "order": 2
              },
              {
                "pillName": "Why is this important?",
                "order": 3
              },
              {
                "pillName": "Simplify the question",
                "order": 4
              }
            ],
            "order": 1
          }
        ]
      },
      {
        "sectionId": "c9420c10-d791-46b9-84ae-c6040f0c94d7",
        "sectionPills": [
          {
            "pillName": "Need clarification on the question?",
            "childPills": [
              {
                "pillName": "How do I connect this to my business context?",
                "order": 1
              },
              {
                "pillName": "Can I skip this?",

                "order": 2
              },
              {
                "pillName": "Why is this important?",
                "order": 3
              },
              {
                "pillName": "Simplify the question",
                "order": 4
              }
            ],
            "order": 1
          }
        ]
      }
    ],
    "preQuestionClarity": [
      {
        "sectionId": "e3bf29c6-9ca4-4878-b34a-bdd3f4d6e8e1",
        "questions": [
          {
            "questionId": "Look back on the last 15 days at the workplace. What, in your thinking, actions and/or language, was a Fixed Mindset? What triggered it? As a result what, perhaps, was a dysfunctional consequence for you?",
            "questionPills": [
              {
                "pillName": "Need clarification on the question?",
                "childPills": [
                  {
                    "pillName": "How do I connect this to my business context?",
                    "pillAcceptReject": false,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Can I skip this?",
                    "pillAcceptReject": false,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Why is this important?",
                    "pillAcceptReject": false,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  },
                  {
                    "pillName": "Simplify the question",
                    "pillAcceptReject": false,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 4
                  }
                ],
                "order": 1
              },
              {
                "pillName": "Help me get started",
                "childPills": [
                  {
                    "pillName": "Give me an example response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Ideas to get started",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "How do I find a relevant information to answer this? ",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 2
              }
            ]
          }

        ]
      },
      {
        "sectionId": "c61958aa-2077-4563-a1ac-c285f4341e26",
        "questions": [
          {
            "questionId": "In the coming 15 days in what situation could you experience a Fixed Mindset trigger?",
            "questionPills": [
              {
                "pillName": "Need clarification on the question?",
                "childPills": [
                  {
                    "pillName": "How do I connect this to my business context?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Can I skip this?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Why is this important?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  },
                  {
                    "pillName": "Simplify the question",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 4
                  }
                ],
                "order": 1
              },
              {
                "pillName": "Help me get started",
                "childPills": [
                  {
                    "pillName": "Give me an example response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Ideas to get started",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "How do I find a relevant information to answer this? ",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 2
              }
            ]
          },
          {
            "questionId": "To ensure that you continue to operate from a Growth Mindset - what will you start, stop or continue?",
            "questionPills": [
              {
                "pillName": "Need clarification on the question?",
                "childPills": [
                  {
                    "pillName": "How do I connect this to my business context?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Can I skip this?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Why is this important?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  },
                  {
                    "pillName": "Simplify the question",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 4
                  }
                ],
                "order": 1
              },
              {
                "pillName": "Help me get started",
                "childPills": [
                  {
                    "pillName": "Give me an example response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Ideas to get started",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "How do I find a relevant information to answer this? ",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 2
              }
            ]
          }
        ]
      },
      {
        "sectionId": "c9420c10-d791-46b9-84ae-c6040f0c94d7",
        "questions": [
          {
            "questionId": "In the coming 15 days what will you do to consciously adopt a Growth Mindset – and specifically in which situations or conversations?",
            "questionPills": [
              {
                "pillName": "Need clarification on the question?",
                "childPills": [
                  {
                    "pillName": "How do I connect this to my business context?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Can I skip this?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Why is this important?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  },
                  {
                    "pillName": "Simplify the question",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 4
                  }
                ],
                "order": 1
              },
              {
                "pillName": "Help me get started",
                "childPills": [
                  {
                    "pillName": "Give me an example response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Ideas to get started",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "How do I find a relevant information to answer this? ",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 2
              }
            ]
          },
          {
            "questionId": "What thinking, actions, language will you use to role model a Growth Mindset?",
            "questionPills": [
              {
                "pillName": "Need clarification on the question?",
                "childPills": [
                  {
                    "pillName": "How do I connect this to my business context?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Can I skip this?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Why is this important?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  },
                  {
                    "pillName": "Simplify the question",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 4
                  }
                ],
                "order": 1
              },
              {
                "pillName": "Help me get started",
                "childPills": [
                  {
                    "pillName": "Give me an example response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Ideas to get started",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "How do I find a relevant information to answer this? ",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 2
              }
            ]
          },
          {
            "questionId": "What will you start? What will you stop? What will you continue?",
            "questionPills": [
              {
                "pillName": "Need clarification on the question?",
                "childPills": [
                  {
                    "pillName": "How do I connect this to my business context?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Can I skip this?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Why is this important?",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  },
                  {
                    "pillName": "Simplify the question",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 4
                  }
                ],
                "order": 1
              },
              {
                "pillName": "Help me get started",
                "childPills": [
                  {
                    "pillName": "Give me an example response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Ideas to get started",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "How do I find a relevant information to answer this? ",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 2
              }
            ]
          }
        ]
      }
    ],
    "postQuestionClarity": [
      {
        "sectionId": "e3bf29c6-9ca4-4878-b34a-bdd3f4d6e8e1",
        "questions": [
          {
            "questionId": "Look back on the last 15 days at the workplace. What, in your thinking, actions and/or language, was a Fixed Mindset? What triggered it? As a result what, perhaps, was a dysfunctional consequence for you?",
            "questionPills": [
              {
                "pillName": "Help me improve my response ",
                "childPills": [
                  {
                    "pillName": "Ideas for improvement",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Identify gaps in my response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Check for clarity",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 1
              }
            ]
          },
          {
            "questionId": "Look back on the last 15 days at the workplace. What, in your thinking, actions or language, was a Growth Mindset? What enabled it? What, as a result, was a functional consequence for you?",
            "questionPills": [
              {
                "pillName": "Help me improve my response ",
                "childPills": [
                  {
                    "pillName": "Ideas for improvement",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Identify gaps in my response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Check for clarity",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 1
              }
            ]
          }
        ]
      },
      {
        "sectionId": "c61958aa-2077-4563-a1ac-c285f4341e26",
        "questions": [
          {
            "questionId": "In the coming 15 days in what situation could you experience a Fixed Mindset trigger?",
            "questionPills": [
              {
                "pillName": "Help me improve my response ",
                "childPills": [
                  {
                    "pillName": "Ideas for improvement",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Identify gaps in my response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Check for clarity",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 1
              }
            ]
          },
          {
            "questionId": "To ensure that you continue to operate from a Growth Mindset - what will you start, stop or continue?",
            "questionPills": [
              {
                "pillName": "Help me improve my response ",
                "childPills": [
                  {
                    "pillName": "Ideas for improvement",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Identify gaps in my response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Check for clarity",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 1
              }
            ]
          }
        ]
      },
      {
        "sectionId": "c9420c10-d791-46b9-84ae-c6040f0c94d7",
        "questions": [
          {
            "questionId": "In the coming 15 days what will you do to consciously adopt a Growth Mindset – and specifically in which situations or conversations?",
            "questionPills": [
              {
                "pillName": "Help me improve my response ",
                "childPills": [
                  {
                    "pillName": "Ideas for improvement",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Identify gaps in my response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Check for clarity",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 1
              }
            ]
          },
          {
            "questionId": "What thinking, actions, language will you use to role model a Growth Mindset?",
            "questionPills": [
              {
                "pillName": "Help me improve my response ",
                "childPills": [
                  {
                    "pillName": "Ideas for improvement",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Identify gaps in my response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Check for clarity",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 1
              }
            ]
          },
          {
            "questionId": "What will you start? What will you stop? What will you continue?",
            "questionPills": [
              {
                "pillName": "Help me improve my response ",
                "childPills": [
                  {
                    "pillName": "Ideas for improvement",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 1
                  },
                  {
                    "pillName": "Identify gaps in my response",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 2
                  },
                  {
                    "pillName": "Check for clarity",
                    "pillAcceptReject": true,
                    "pillChildPrompt": "",
                    "questionChildResponse": null,
                    "order": 3
                  }
                ],
                "order": 1
              }
            ]
          }
        ]
      }
    ],
    "preQuestionPills": [
      {
        "pillName": "Need clarification on the question?",
        "childPills": [
          {
            "pillName": "How do I connect this to my business context?",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 1
          },
          {
            "pillName": "Can I skip this?",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 2
          },
          {
            "pillName": "Why is this important?",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 3
          },
          {
            "pillName": "Simplify the question",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 4
          }
        ],
        "order": 1
      },
      {
        "pillName": "Help me get started",
        "childPills": [
          {
            "pillName": "Give me an example response",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 1
          },
          {
            "pillName": "Ideas to get started",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 2
          },
          {
            "pillName": "How do I find a relevant information to answer this? ",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 3
          }
        ],
        "order": 2
      }
    ],
    "postQuestionPills": [
      {
        "pillName": "Help me improve my response ",
        "childPills": [
          {
            "pillName": "Ideas for improvement",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 1
          },
          {
            "pillName": "Identify gaps in my response",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 2
          },
          {
            "pillName": "Check for clarity",
            "pillAcceptReject": true,
            "pillChildPrompt": "",
            "questionChildResponse": null,
            "order": 3
          }
        ],
        "order": 1
      }
    ],
    "sectionPills": [
      {
        "pillName": "Need clarification on the question?",
        "childPills": [
          {
            "pillName": "How do I connect this to my business context?",
            "pillHeader": null,
            "pillResponse": null,
            "order": 1
          },
          {
            "pillName": "Can I skip this?",
            "pillHeader": null,
            "pillResponse": null,
            "order": 2
          },
          {
            "pillName": "Why is this important?",
            "pillHeader": null,
            "pillResponse": null,
            "order": 3
          },
          {
            "pillName": "Simplify the question",
            "pillHeader": null,
            "pillResponse": null,
            "order": 4
          }
        ],
        "order": 1
      }
    ]
  }
  return (
    <>
      <HeaderNav />

      <Box
        component="main"
        sx={ {
          width: { tablet: `calc(100% - ${ drawerWidth }px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
        } }
      >
        <Box sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px", minHeight: "100vh" } }>
          <FeedbackContent data={ worksheet } user={ user } type={ type } />
        </Box>
      </Box>
      <Box>

      </Box>
    </>
  );
};

export default FeedbackReportPage;