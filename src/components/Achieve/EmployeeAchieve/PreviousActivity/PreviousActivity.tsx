import { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Link from "next/link";
import { fetchUserActivity } from "../../../../actions/actionCenter/fetchUserActivity";
import Spinner from "../../../common/Spinner/Spinner";

const PreviousActivity = ({ userId, programId, name }: any) => {
  const [userActvity, setUserActivity] = useState<any>(null);
  const [userActivityLoading, setUserActivityLoading] = useState(false);

  // FETCH USER ACTIVITY
  useEffect(() => {
    const getUserActivity = async () => {
      try {
        setUserActivityLoading(true);
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function (idToken) {
        //   return idToken;
        // });
        
        const response = await fetchUserActivity({
          userId,
          programId,
        });
        console.log("getUserActivity response?.userActivity ", response);
        //@ts-ignore
        if (response?.userActivity) {
          //@ts-ignore
          setUserActivity(response?.userActivity);
        }
      } catch (error) {
        console.error(error, " ERROR getUserActivity");
      } finally {
        setUserActivityLoading(false);
      }
    };
    getUserActivity();
  }, []);

  return (
    <Box className="mngr_actcntr_tprgt_flex">
      <Box
        className="action_center_box low_align"
        sx={{ height: "829px", overflowX: "auto" }}
      >
        <Typography
          className="action_title prev_actvty"
          sx={{ marginBottom: "20px" }}
        >
          {name ? `${name}'s Previous Activity` : `Previous Activity`}
        </Typography>
        {userActivityLoading ? (
          <Spinner />
        ) : userActvity?.length ? (
          userActvity
            ?.filter((item: any) => item?.role === "SELF")
            ?.map((item: any, index: number) => {
              return (
                <>
                  {/* <Link
                    href={`${item?.pageLink}`}
                    className="prev_actvty_link"
                    key={index}
                  > */}
                  <Typography className="prev_act_title">
                    {item?.statement}
                  </Typography>
                  {/* </Link> */}
                  <Divider sx={{ color: "#EAECEF", margin: "12px 0" }} />
                </>
              );
            })
        ) : (
          <Typography className="no_data">No activity found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PreviousActivity;
