import { Stack, Checkbox, Typography } from "@mui/material";

const PermissionCheckbox = ({
  allPermissions,
  setAllPermissions,
  label,
  hulProgramId
}: any) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      className="profile_permission_box"
      sx={{ margin: "15px auto 15px 0" }}
    >
      <Checkbox
        id="checkbox"
        sx={{
          padding: "0",
          color: "#EAECEF",
          "&.Mui-checked": {
            color: "#2E5DB0",
          },
        }}
        checked={allPermissions}
        disabled={hulProgramId}
        onChange={() => setAllPermissions(!allPermissions)}
      />
      <Typography
        color="#989EA5"
        sx={{
          fontSize: { mobile: "13px", tablet: "16px" },
          fontWeight: "400",
          textAlign: "left",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

export default PermissionCheckbox;
