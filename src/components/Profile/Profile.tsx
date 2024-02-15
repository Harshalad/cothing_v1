import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "./ProfileForm.tsx/ProfileForm";
import { NEXT_6_MONTHS_FOCUS_OPTIONS } from "../../constants/profile";
import SelectNextFocus from "./SelectNextFocus/SelectNextFocus";
import { Stack, Checkbox, Typography, Button, Box } from "@mui/material";
import AllPermissions from "./AllPermissions/AllPermisions";
import Spinner from "../common/Spinner/Spinner";
import { onboardNworxUser } from "../../actions/user/onboardNworxUser";
import { useRouter } from "next/router";
import { fetchNworxUser } from "../../actions/auth/fetchNworxUser";
import { toast } from "react-toastify";
import PermissionCheckbox from "./AllPermissions/AllPermisions";
import nworxuser from "../../constants/proto/fetchNworxUser/fetch-nworx-user_grpc_web_pb";


const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //@ts-ignore
  const nWorxUser = useSelector((state) => state?.auth?.nWorxUser);

  //@ts-ignore
  const firebaseUser = useSelector((state) => state?.auth?.firebaseUser);
  // console.log(firebaseUser,firebaseUser.stsTokenManager.accessToken,"I am firebase user")

  const [nextSixMonthsFocus, setNextSixMonthsFocus] = useState(null);
  const [managerPermissions, setManagerPermissions] = useState(true);
  const [expertPermissions, setExpertPermissions] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [hulProgramId, setHulProgramId] = useState(nWorxUser?.activeProgramId === "d877b519-5260-44b5-b532-8a9e341942ec")

  console.log(managerPermissions, expertPermissions, nWorxUser, "aditypermission");

  useEffect(() => {
    if (!hulProgramId) {
      if (nWorxUser && nWorxUser?.nextSixMonthsFocus) {
        setNextSixMonthsFocus(nWorxUser?.nextSixMonthsFocus);
      }
      // console.log(nWorxUser,"Here is user");
      setManagerPermissions(nWorxUser?.managerPermissions);
      setExpertPermissions(nWorxUser?.expertPermissions);
    }
  }, [nWorxUser]);

  // if (nWorxUser?.onboarded) router.push("/goals/overview");

  const onNextClick = async () => {
    try {
      //@ts-ignore
      setUpdateLoading(true);

      const updateObject = {
        id: nWorxUser?.id,
        nextSixMonthsFocus,
        managerPermissions,
        expertPermissions,
        showGoalOverview: nWorxUser?.showGoalOverview,

      };
      //@ts-ignore
      await dispatch(onboardNworxUser(updateObject));
      //@ts-ignore
      await dispatch(fetchNworxUser(nWorxUser?.email));
      toast.success("Profile updated successfully!", {
        toastId: "PROFILE_SUCCESS",
      });
      setUpdateLoading(false);
      if (nWorxUser?.showGoalOverview) {
        router.push("/goal/overview");
      } else {
        router.push("/action-center");
      }
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Profile</title>
        </Helmet>
      </HelmetProvider>
      <Box className="profile_flex">
        <Box className="profile_inner">
          <ProfileForm
            name={nWorxUser?.name}
            email={nWorxUser?.email}
            phoneNumber={nWorxUser?.mobile}
            department={nWorxUser?.department}
            managerName={nWorxUser?.manager}
            designation={nWorxUser?.designation}
          />

          {/* <Box className="profile_inner"> */}
         {!hulProgramId &&  <SelectNextFocus
            nextSixMonthsFocus={nextSixMonthsFocus}
            setNextSixMonthsFocus={setNextSixMonthsFocus}
          />}
          <PermissionCheckbox
            allPermissions={managerPermissions}
            setAllPermissions={setManagerPermissions}
            hulProgramId={hulProgramId}
            label={"Allow my manager to access my information"}
          />
          <PermissionCheckbox
            allPermissions={expertPermissions}
            setAllPermissions={setExpertPermissions}
            hulProgramId={hulProgramId}
            label={"Allow my NWORX platform expert to access my information"}
          />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            className="profile_permission_box"
            sx={{ margin: "15px auto 50px 0" }}
          >
            {/* <Checkbox
            id="checkbox"
            sx={{
              padding: "0",
              color: "#EAECEF",
              "&.Mui-checked": {
                color: "#2E5DB0",
              },
            }}
          /> */}
            <Typography
              color="#989EA5"
              sx={{
                fontSize: { mobile: "13px", tablet: "16px" },
                fontWeight: "400",
                textAlign: "left",
              }}
            >
              If any information given above is incorrect, please
              <span
                style={{
                  color: "#2E5DB0",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              // onClick={() => {}}
              >
                <a href="mailto:support@nworx.ai?subject=Request for update of profile information">
                  {" "}
                  request for change
                </a>
              </span>
            </Typography>
          </Stack>
          {updateLoading ? (
            <Spinner />
          ) : (
            <Button
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#F58A43",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#F58A43", boxShadow: "none" },
                textTransform: "capitalize",
                width: "150px !important",
              }}
              onClick={onNextClick}
              disabled={hulProgramId?false:!nextSixMonthsFocus}
            >
              Save
            </Button>
          )}
          {/* </Box> */}
        </Box>
      </Box>
    </>
  );
};
export default Profile;
