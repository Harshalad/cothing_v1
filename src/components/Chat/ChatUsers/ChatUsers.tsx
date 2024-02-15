import { Box, Stack, Avatar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { resetUnreadCount } from "../../../actions/chat/resetUnreadCount";
import { useSelector } from "react-redux";

const ChatUsers = ({
  active,
  setActive,
  chatUsersObject,
  selectedChatUser,
  setSelectedChatUser,
  type,
}: any) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);

  // RESET UNREAD COUNT
  useEffect(() => {
    try {
      const res = resetUnreadCount({
        userId: user?.id,
        partnerId: selectedChatUser?.partnerUserId,
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedChatUser]);

  const sortByLastMessageDate = (a: any, b: any) => {
    return b[1]?.lastMessageDate - a[1]?.lastMessageDate;
  };
  const sortByName = (a: any, b: any) => {
    return a[1]?.name - b[1]?.name;
  };

  if (!chatUsersObject) return <></>;
  return (
    <div>
      {Object.entries(chatUsersObject)
        ?.sort(type === "RECENT_USER" ? sortByLastMessageDate : sortByName)
        ?.map((user: any, index: number) => {
          return (
            <ChatUser
              key={index}
              active={active}
              setActive={setActive}
              user={user[1]}
              selectedChatUser={selectedChatUser}
              setSelectedChatUser={setSelectedChatUser}
              type={type}
            />
          );
        })}
    </div>
  );
};

export default ChatUsers;

const ChatUser = ({
  active,
  setActive,
  user,
  selectedChatUser,
  setSelectedChatUser,
  type,
}: any) => {
  const getCurrentTimeDuration = (timestamp: any) => {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 12);
    const year = Math.floor(months / 365);

    if (year > 0) {
      return `${year} year${year > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `Just Now`;
    }
  };
  return (
    <Box
      className={`chat_lft_msg_box ${
        selectedChatUser?.id === user?.id && "selected"
      }`}
      onClick={() => {
        setSelectedChatUser(user);
      }}
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
              {user?.name?.substring(0, 1)}
            </Avatar>
            <Box>
              <Typography className="chat_lft_name">{user?.name}</Typography>
              <Typography className="chat_lft_desg">
                {user?.relationLabel}
              </Typography>
              <Typography className="chat_lft_txt">
                {user?.lastChatMessage?.length > 45
                  ? user?.lastChatMessage.substring(0, 45) + "..."
                  : user?.lastChatMessage}
              </Typography>
            </Box>
          </Stack>
        </Box>
        {type === "RECENT_USER" ? (
          <Stack className="chat_lft_tym_flx">
            <Typography className="chat_lft_msg_tym">
              {getCurrentTimeDuration(user.lastMessageDate)}
            </Typography>
            {user?.unreadMessageCount ? (
              <Box className="new_msg_badge">
                <Typography className="badge_text">
                  {user?.unreadMessageCount}
                </Typography>
              </Box>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
};
