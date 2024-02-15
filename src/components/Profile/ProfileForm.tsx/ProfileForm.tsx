import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Badge,
  Avatar,
  TextField,
} from "@mui/material";

interface ProfileFormProps {
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
  managerName: string;
}

const ProfileForm = ({
  name,
  email,
  phoneNumber,
  department,
  designation,
  managerName,
}: ProfileFormProps) => {
  if (!name) return <></>;
  return (
    <Box>
      {/* <Box className="profile_flex"> */}
      {/* <Box className="profile_inner"> */}
      <Typography className="profile_title">
        Please verify this information
      </Typography>
      {name ? (
        <Stack
          flexDirection="row"
          gap="16px"
          alignItems="center"
          mb="40px"
          justifyContent="center"
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <img
              style={{ width: "80px", height: "80px" }}
              alt="profile"
              src=""
              id="profile_img"
            />
            <Avatar
              id="default_avatar"
              sx={{
                width: "80px",
                height: "80px",
                bgcolor: "#E8E3FF",
                color: "#6755C3",
                fontSize: "35px",
                fontWeight: "700",
              }}
            >
              {
                //@ts-ignore
                name ? Array.from(name)[0] : ""
              }
            </Avatar>
          </Badge>
          <Box sx={{ textAlign: "left" }}>
            <Typography className="profile_name" variant="h2">
              {name}
            </Typography>
            {/* <Typography className="profile_desgn" variant="h4">
                {"Software Engineer"}
              </Typography> */}
          </Box>
        </Stack>
      ) : null}
      <Box
        sx={{
          // maxWidth: { tablet: "700px", mobile: "400px" },
          margin: "0 auto",
        }}
        className="profile_form_block"
      >
        <Box
          sx={{ display: "grid", marginBottom: "20px" }}
          className="profile_form_flex"
        >
          <article className="profile_textfield_label">
            Primary Reporting Manager
          </article>
          <TextField
            placeholder="Primary Reporting Manager Name"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{
              sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
            }}
            value={managerName}
            InputProps={{
              readOnly: true,
            }}
            className="readOnlyInput"
          />
        </Box>
        {/* <Box
            sx={{ display: "grid", marginBottom: "20px" }}
            className="profile_form_flex"
          >
            <article className="profile_textfield_label">
              Secondary Reporting Manager
            </article>
            <TextField
              placeholder="Secondary Reporting Manager Name"
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{
                sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
              }}
              value={"Reuben Thomas, Watan, Vidhi"}
              InputProps={{
                readOnly: true,
              }}
              className="readOnlyInput"
            />
          </Box> */}
        <Box
          sx={{ display: "grid", marginBottom: "20px" }}
          className="profile_form_flex"
        >
          <article className="profile_textfield_label">Team</article>
          <TextField
            placeholder="Enter Team"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{
              sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
            }}
            value={department}
            InputProps={{
              readOnly: true,
            }}
            className="readOnlyInput"
          />
        </Box>
        <Box
          sx={{ display: "grid", marginBottom: "20px" }}
          className="profile_form_flex"
        >
          <article className="profile_textfield_label">Email Address</article>
          <TextField
            placeholder="Enter Email Address"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{
              sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
            }}
            value={email}
            InputProps={{
              readOnly: true,
            }}
            className="readOnlyInput"
          />
        </Box>
        <Box
          sx={{ display: "grid", marginBottom: "20px" }}
          className="profile_form_flex"
        >
          <article className="profile_textfield_label">Phone Number</article>
          <TextField
            placeholder="Phone Number"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{
              sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
            }}
            value={phoneNumber}
            InputProps={{
              readOnly: true,
            }}
            className="readOnlyInput"
          />
        </Box>
        <Box
          sx={{ display: "grid", marginBottom: "20px" }}
          className="profile_form_flex"
        >
          <article className="profile_textfield_label">Designation</article>
          <TextField
            placeholder="Enter Designation"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{
              sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
            }}
            value={designation}
            InputProps={{
              readOnly: true,
            }}
            className="readOnlyInput"
          />
        </Box>
        {/* <Box></Box> */}
      </Box>
      {/* </Box> */}
      {/* </Box> */}
    </Box>
  );
};

export default ProfileForm;
