import { NumbersOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Spinner } from "@react-pdf-viewer/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const EventRedirecting = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const [id, setId] = useState<any>(null);

  useEffect(() => {
    setId(router?.query?.id);
  }, [router?.isReady]);

  useEffect(() => {
    const userEventId = id + "_" + user?.id;
    if (id && id?.length > 0) {
      router.push({
        pathname: "/events",
        query: {
          id: userEventId,
        },
      });
    }
  }, [id]);
  return (
    <>
      <Spinner />
      <Typography
        variant="h2"
        align="center"
        color="#1C2129"
        sx={{ fontWeight: "700" }}
        className="feature_title"
      >
        Redirecting
      </Typography>
    </>
  );
};
