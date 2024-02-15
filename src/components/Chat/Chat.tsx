import Link from "next/link";
import {useCallback,useEffect,useState} from "react";
import {Helmet,HelmetProvider} from "react-helmet-async";
import HeaderNav from "../../components/common/HeaderNav/HeaderNav";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import FormatColorTextRoundedIcon from "@mui/icons-material/FormatColorTextRounded";
import askQuestionIcon from "../../../public/images/icons/ask-question.svg";
import CloseIcon from "@mui/icons-material/Close";
import {useSelector} from "react-redux";
import {fetchChatUsersByStreaming} from "../../actions/chat/fetchChatUsersByStreaming";
import {isEmptyObject} from "../../utils/isEmptyObject";
import ChatUsers from "./ChatUsers/ChatUsers";
import {fetchChatThreadByStreaming} from "../../actions/chat/fetchChatThreadByStreaming";
import {addChatRequest} from "../../actions/chat/addChatRequest";
import ChatThread from "./ChatThread/ChatThread";
import Spinner from "../common/Spinner/Spinner";
import {resetUnreadCount} from "../../actions/chat/resetUnreadCount";
import {fetchChatUsersFromOrg} from "../../actions/chat/fetchChatUsersFromOrg";
import {MANAGER_VIEW_STATE} from "../../constants/auth";

const drawerWidth=250;

const Chat=() => {
  //@ts-ignore
  const user=useSelector((state) => state?.auth?.nWorxUser);

  const program=useSelector(
    // @ts-ignore
    (state) => state?.user?.program
  );

  const [active,setActive]=useState("");
  const [showDeleteModal,setDeleteModal]=useState(false);

  const [chatUsersLoading,setChatUsersLoading]=useState(false);
  const [userThreadLoading,setUserThreadLoading]=useState(false);
  const [chatUsersObject,setChatUsersObject]=useState<any>({});
  const [orgChatUsersObject,setOrgChatUsersObject]=useState<any>({});
  const [selectedChatUser,setSelectedChatUser]=useState<any>(null);
  const [selectedChatThread,setSelectedChatThread]=useState<any>(null);
  const [updatePostFlag,setUpdatePostFlag]=useState(0);
  const [updateChatThreadFlag,setUpdateChatThreadFlag]=useState(0);
  const [sendMessageLoading,setSendMessageLoading]=useState(false);

  const [chatText,setChatText]=useState("");

  let localChatUsers: any={};
  let localChatThread: any={};

  const currentUserRole=useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  useEffect(() => {
    if(chatUsersObject&&Object.keys(chatUsersObject)?.length) {
      setChatUsersObject(chatUsersObject);
    }
  },[localChatUsers,updatePostFlag]);

  useEffect(() => {
    if(selectedChatThread&&Object.keys(selectedChatThread)?.length) {
      setSelectedChatThread(selectedChatThread);
    }
  },[selectedChatThread,updateChatThreadFlag]);

  // GET CHAT USERS BY STREAMING
  useEffect(() => {
    let instance: any=null;
    const getChatUsers=async () => {
      setChatUsersLoading(true);
      let parsedResponse: any;
      try {
        instance=await fetchChatUsersByStreaming({
          userId: user?.id,
        });
        instance.on("data",function(response: any) {
          console.log("DATA CHATS USERS",response);
          parsedResponse=JSON.parse(response?.array?.[0]);

          if(!isEmptyObject(parsedResponse)) {
            localChatUsers[parsedResponse?.response?.document?.id]=
              parsedResponse?.response?.document;
          }

          setChatUsersObject(localChatUsers);
          setUpdatePostFlag((prevState: any) => prevState+1);

          setChatUsersLoading(false);

          //   setChatUsersObject(parsedResponse?.response);
        });

        // const response = await fetchUserWorksheet({ worksheetId });
      } catch(error) {
        console.log(error);
        setChatUsersLoading(false);
      }
    };
    getChatUsers();
    return () => {
      if(instance) {
        instance?.cancel();
      }
    };
  },[user?.id]);

  // GET CHAT THREAD
  useEffect(() => {
    let instance: any=null;
    const getChatThread=async () => {
      try {
        let parsedResponse: any;
        const idsArray=[selectedChatUser?.partnerUserId,user?.id].sort();
        const chatThreadId=idsArray?.join("_");
        instance=await fetchChatThreadByStreaming({chatThreadId});

        instance.on("data",function(response: any) {
          console.log("DATA CHATS THREADS",response);
          parsedResponse=JSON.parse(response?.array?.[0]);
          if(!isEmptyObject(parsedResponse)) {
            localChatThread[parsedResponse?.response?.document?.id]=
              parsedResponse?.response?.document;
          }
          //if (
          //  parsedResponse?.response?.document?.messageFromUserId !==
          //  selectedChatUser?.id
          //) {
          setSelectedChatThread(localChatThread);
          setUpdateChatThreadFlag((prevState: any) => prevState+1);
          //}

          setChatUsersLoading(false);
        });
      } catch(error) {
        console.log(error);
      }
    };
    getChatThread();
    return () => {
      if(instance) {
        instance?.cancel();
      }
    };
  },[selectedChatUser,user?.id]);

  const getChatUsersFromOrg=useCallback(async () => {
    try {
      if(
        currentUserRole===MANAGER_VIEW_STATE.LP&&
        program?.configMap?.enableOrgChat
      ) {
        const orgMembers: any=await fetchChatUsersFromOrg({
          orgId: user?.organisationId,
        });
        let localOrgMembersToBeAddedToChatObject: any={};
        if(orgMembers?.length) {
          orgMembers.map((orgMember: any,index: number) => {
            console.log(orgMember?.id,"ORG MEMBER ID",chatUsersObject);
            if(Object.keys(chatUsersObject).includes(orgMember?.id)) {
              return;
            }
            const localOrgMemberObj=orgMember;
            localOrgMemberObj.partnerUserId=orgMember?.id;
            localOrgMembersToBeAddedToChatObject[orgMember?.id]=
              localOrgMemberObj;
          });

          // TODO REMOVE MY OWN USER FROM ORG USERS TO CHAT WITH
          Object.keys(localOrgMembersToBeAddedToChatObject).filter(
            (orgMemberId: string) => orgMemberId!==user?.id
          );
          setOrgChatUsersObject(localOrgMembersToBeAddedToChatObject);
        }
      }
    } catch(error) {
      console.log(error);
    }
  },[currentUserRole,user?.organisationId]);

  useEffect(() => {
    getChatUsersFromOrg();
  },[getChatUsersFromOrg]);

  const onSendMessage=async () => {
    try {
      console.log(chatText.length,"chatText");
      if(chatText&&selectedChatUser) {
        setSendMessageLoading(true);
        const idsArray=[selectedChatUser?.partnerUserId,user?.id].sort();
        const chatThreadId=idsArray?.join("_");
        addChatRequest({
          id: new Date().valueOf().toString(),
          message: chatText,
          formattedMessage: chatText,
          chatThreadId,
          repliedToChatMessage: false,
          repliedToChatId: "NA",
          status: "ADDED",
          messageFromUserId: user?.id,
          messageFromUserName: user?.name,
          messageToUserId: selectedChatUser?.partnerUserId,
          messageToUserName: selectedChatUser?.name,
          serviceProvider: "NA",
          orgName: "NA",
        });
        setChatText("");
      }
    } catch(error) {
      console.log(error);
    } finally {
      setSendMessageLoading(false);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Chat</title>
        </Helmet>
      </HelmetProvider>
      <HeaderNav />
      <Box
        component="main"
        sx={{
          width: {tablet: `calc(100% - ${drawerWidth}px)`},
          ml: {tablet: "auto"},
          marginLeft: "250px",
        }}
      >
        <Box
          sx={{backgroundColor: "#EAECEF",padding: "112px 32px 32px"}}
          className="chat"
        >
          <Typography
            variant="h1"
            sx={{fontWeight: "700",color: "#1C2129",marginBottom: "24px"}}
            className="dash_title"
          >
            Chat
          </Typography>
          {Object.keys(chatUsersObject).length!==0? (
            <Stack className="chat_contr_flex">
              <Box className="chat_lft_box">
                {/* <Stack className="chat_lft_hdr_flx">
                <TextField
                  id="search"
                  placeholder="Seacrh by"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{
                    sx: {
                      fontSize: "16px",
                      color: "#3E4248",
                      fontWeight: "500",
                    },
                    className: "serach",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="search"
                          edge="start"
                          size="small"
                        >
                          <SearchIcon sx={{ color: "#989EA5" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    maxWidth: "350px",
                    "& ::placeholder": { color: "#999CA0", opacity: "1" },
                  }}
                  className="search_field"
                />
                <FilterListRoundedIcon sx={{ color: "#989EA5" }} />
              </Stack> */}
                <Box className="chat_lft_msg_contr">
                  <ChatUsers
                    chatUsersObject={chatUsersObject}
                    active={active}
                    setActive={setActive}
                    selectedChatUser={selectedChatUser}
                    setSelectedChatUser={setSelectedChatUser}
                    type="RECENT_USER"
                  />
                  <ChatUsers
                    chatUsersObject={orgChatUsersObject}
                    active={active}
                    setActive={setActive}
                    selectedChatUser={selectedChatUser}
                    setSelectedChatUser={setSelectedChatUser}
                    type="ORG_USER"
                  />
                  {/* <Box
                  className={`chat_lft_msg_box ${
                    active === "id1" && "selected"
                  }`}
                  onClick={() => setActive("id1")}
                >
                  <Stack className="chat_lft_msg_flx">
                    <Box>
                      <Stack className="chat_lft_inr_flx">
                        <Avatar
                          sx={{
                            width: "40px",
                            height: "40px",
                            bgcolor: "#DFFFF2",
                            color: "#1BAD70",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          J
                        </Avatar>
                        <Box>
                          <Typography className="chat_lft_name">
                            Joshuva Michael
                          </Typography>
                          <Typography className="chat_lft_desg">
                            Manager | Team Lead
                          </Typography>
                          <Typography className="chat_lft_txt">
                            The clarification for your question...
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Stack className="chat_lft_tym_flx">
                      <Typography className="chat_lft_msg_tym">
                        09:30
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Box
                  className={`chat_lft_msg_box ${
                    active === "id2" && "selected"
                  }`}
                  onClick={() => setActive("id2")}
                >
                  <Stack className="chat_lft_msg_flx">
                    <Box>
                      <Stack className="chat_lft_inr_flx">
                        <Avatar
                          sx={{
                            width: "40px",
                            height: "40px",
                            bgcolor: "#FDF9E4",
                            color: "#EFD02E",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          J
                        </Avatar>
                        <Box>
                          <Typography className="chat_lft_name">
                            Sunil Gupta
                          </Typography>
                          <Typography className="chat_lft_desg">
                            Software Engineer
                          </Typography>
                          <Typography className="chat_lft_txt">
                            The clarification for your question...
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Stack className="chat_lft_tym_flx">
                      <Typography className="chat_lft_msg_tym">
                        Yesterday
                      </Typography>
                      <Box className="new_msg_badge">
                        <Typography className="badge_text">3</Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
                <Box
                  className={`chat_lft_msg_box ${
                    active === "id3" && "selected"
                  }`}
                  onClick={() => setActive("id3")}
                >
                  <Stack className="chat_lft_msg_flx">
                    <Box>
                      <Stack className="chat_lft_inr_flx">
                        <Avatar
                          sx={{
                            width: "40px",
                            height: "40px",
                            bgcolor: "#D9F6FF",
                            color: "#55B6C3",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          J
                        </Avatar>
                        <Box>
                          <Typography className="chat_lft_name">
                            Johnson
                          </Typography>
                          <Typography className="chat_lft_desg">
                            Manager
                          </Typography>
                          <Typography className="chat_lft_txt">
                            The clarification for your question...
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Stack className="chat_lft_tym_flx">
                      <Typography className="chat_lft_msg_tym">
                        20/05/23
                      </Typography>
                    </Stack>
                  </Stack>
                </Box> */}
                </Box>
              </Box>
              <Box className="chat_right_box">
                {selectedChatUser!==null? (
                  <Stack className="chat_rgt_flx">
                    <Box className="chat_rgt_top_box">
                      <Stack className="chat_rgt_top_flx">
                        <Stack className="chat_rgt_top_inrflx">
                          <Avatar
                            sx={{
                              width: "40px",
                              height: "40px",
                              bgcolor: "#D9F6FF",
                              color: "#55B6C3",
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                          >
                            {selectedChatUser?.name?.substring(0,1)}
                          </Avatar>
                          <Box>
                            <Typography className="chat_rgt_name">
                              {selectedChatUser?.name}
                            </Typography>
                            <Typography className="chat_rgt_desg">
                              {selectedChatUser?.relationLabel}
                            </Typography>
                          </Box>
                        </Stack>
                        {/* <Button className="outlined_cta">View Profile</Button> */}
                      </Stack>
                    </Box>
                    <Box className="chat_rgt_conv_box">
                      <ChatThread
                        selectedChatThread={selectedChatThread}
                        localChatThread={localChatThread}
                      />
                    </Box>
                    <Stack className="chat_rgt_btm_box">
                      {/* <Box>
                    <FormatColorTextRoundedIcon sx={{ color: "#989EA5" }} />
                  </Box> */}
                      <Box sx={{width: "100%"}}>
                        {/* <Box className="chat_rply_msg_box">
                      <Stack className="chat_rply_msg_flx">
                        <Typography className="chat_rply_msg_name">
                          Sunil
                        </Typography>
                        <CloseIcon
                          sx={{ cursor: "pointer", color: "#5D636B" }}
                        />
                      </Stack>
                      <Typography className="chat_rply_msg_text">
                        Please let me know your queries...
                      </Typography>
                    </Box> */}
                        <Box className="chat_txfld">
                          <TextField
                            id="chat"
                            placeholder="Type your message...."
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={chatText}
                            onPaste={(e) => {
                              e.preventDefault();
                              const pastedText=
                                e.clipboardData.getData("text/plain");
                              const modifiedText=pastedText.replace(
                                /\r\n|\r|\n/g,
                                "\n"
                              );
                              setChatText(
                                (prevChatText) => prevChatText+modifiedText
                              );
                            }}
                            onChange={(e) => setChatText(e.target.value)}
                            inputProps={{
                              sx: {fontSize: "16px",color: "#1C2129"},
                            }}
                            onKeyDown={(e) => {
                              if(
                                ((e.key==="Enter"&&e.shiftKey)||
                                  (e.key==="Enter"&&e.ctrlKey))&&
                                chatText?.length>0
                              ) {
                                e.preventDefault();
                                setChatText(
                                  (prevChatText) => prevChatText+"\n"
                                );
                              } else if(
                                e.key==="Enter"&&
                                chatText.trim()!==""
                              ) {
                                e.preventDefault();
                                onSendMessage();
                              }
                            }}
                            multiline
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {sendMessageLoading? (
                                    <Spinner />
                                  ):(
                                    <img
                                      src={"/images/icons/ask-question.svg"}
                                      alt="chat"
                                      width={20}
                                      height={17}
                                      onClick={onSendMessage}
                                    ></img>
                                  )}
                                </InputAdornment>
                              ),
                              sx: {cursor: "pointer"},
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </Stack>
                ):(
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "80vh",
                      textAlign: "center",
                    }}
                  >
                    Please select a user to send a message.
                  </div>
                )}
              </Box>
            </Stack>
          ):(
            <div
              style={{
                height: "72vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              No users available to chat with. Reach out to your NWORX Partner.
            </div>
          )}
        </Box>
      </Box>
      <Dialog
        className="manager-time-modal chat_del_modal"
        open={showDeleteModal}
        sx={{textAlign: "center",padding: "30px"}}
      >
        <CloseIcon
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: "1",
            cursor: "pointer",
          }}
          onClick={() => {
            setDeleteModal(false);
          }}
        />
        <DialogTitle
          id="title"
          className="chat_modal_title"
          sx={{
            padding: "0 0 0px 0",
          }}
        >
          Delete
        </DialogTitle>
        <DialogContent>
          <Typography className="gdnc-modal-subtxt">
            Are you sure you want to delete this message?
          </Typography>
        </DialogContent>
        <DialogActions sx={{margin: "0 auto"}}>
          <Stack className="chat_del_btn_contr">
            <Button
              className="outlined_cta"
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="standard_cta"
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              Delete
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Chat;
