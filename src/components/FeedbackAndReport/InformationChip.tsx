import { ExpandMore, OpenInFull, RefreshOutlined } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState, FC, useEffect } from "react";
import { fetchSectionClarity } from "../../actions/coThinkPrep/fetchSectionClarity";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { elements } from "chart.js";
import {motion} from 'framer-motion';

interface InformationChipProps {
  data: any;
  index: number;
  onclick: (index: any) => void;
  section: any;
  pillname: any;
  worksheet: any;
  from: any;
}

const InformationChip: FC<InformationChipProps> = ({
  data,
  onclick,
  index,
  section,
  pillname,
  worksheet,
  from,
}) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const router = useRouter();
  const [userWorkSheetId, setUserWorksheetId] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  useEffect(() => {
    setUserWorksheetId(router?.query?.id);
    setType(router?.query?.type === "prep" ? "PREPARE" : "QP");
  }, [router]);
  console.log(
    data,
    index,
    section,
    pillname,
    worksheet,
    "elementelementelementaaaa"
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pillResponse, setPillResponse] = useState<any>(null);

  useEffect(() => {
    if (from === "SECTION") {
      const sectionClarity: any[] = worksheet?.sectionClarity || []; // Ensure sectionClarity is an array or initialize it as an empty array
      const sectionClarityObj =
        sectionClarity.find((obj: any) => obj.sectionId === section.id) || null;

      let childPillsObj = null;
      if (sectionClarityObj) {
        const childPills = sectionClarityObj.sectionPills || [];
        childPillsObj =
          childPills.find((obj: any) => obj.pillName === pillname) || null;
      }

      let pillResponseObj = null;
      if (childPillsObj) {
        const pillResponse = childPillsObj.childPills || [];
        console.log(pillResponse, "pillresponse");
        pillResponseObj =
          pillResponse.find((obj: any) => obj.pillName === data?.pillName) ||
          null;
      }
      setPillResponse(pillResponseObj?.response);

      console.log(
        sectionClarityObj,
        childPillsObj,
        pillResponseObj,
        "sectionclaritty"
      );
    }
  }, [section, worksheet, data, index]);
  useEffect(() => {
    setIsRefreshing(true);
    const timer = setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isExpanded]);
  console.log(section, data, "sectioninsection");

  //const handleRefreshClick = (
  //  e: React.MouseEvent<SVGSVGElement, MouseEvent>
  //) => {
  //  e.stopPropagation();
  //  setIsRefreshing( true );
  //  setTimeout( () => setIsRefreshing( false ), 2000 );
  //};
  const datas = [
    {
      header: "Add raw materials costs as variable costs",
      discription:
        "As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have a significant impact on operations.e costs can have a significant impact on operations.",
    },
    {
      header: "Add raw materials costs as variable costs",
      discription:
        " As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have a significant impact on operations.e costs can have a significant impact on operations.",
    },
    {
      header: "Add raw materials costs as variable costs",
      discription:
        " As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have a significant impact on operations.e costs can have a significant impact on operations.",
    },
    {
      header: "Add raw materials costs as variable costs",
      discription:
        " As environmental standards become more stringent, compliance costs can have a significant impact on operations.e costs can have a significant impact on operations.e costs can have a significant impact on operations.",
    },
  ];
  const [openCards, setOpenCards] = useState(
    Array(pillResponse?.items?.length).fill(false)
  );
  const handleChildClick = async () => {
    setIsRefreshing(true);
    if (from === "SECTION") {
      const response = await fetchSectionClarity({
        userId: user?.id,
        programId: user?.activeProgramId,
        userWorksheetId: userWorkSheetId,
        type: type,
        sectionId: section?.id,
        pillName: pillname,
        pillChildName: data.pillName,
      });
      console.log(response, "fetchSectionClarityfetchSectionClarity");
      //@ts-ignore
      setPillResponse(response?.response);
      setIsRefreshing(false);
    }
  };
  const toggleCard = (index: any) => {
    setOpenCards((prevOpenCards) => {
      const newOpenCards = [...prevOpenCards];
      newOpenCards[index] = !newOpenCards[index];
      return newOpenCards;
    });
  };
  const skeletonArray = new Array(4).fill({});
  return (
    <Box
      className={`informationPill_container innerStyleWidth`}
      style={{
        minWidth: "fit-content",
        width: isExpanded ? "100%" : "fit-content",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* use isActive class to active */}
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <img src="/images/icons/binocular.svg" alt="Binocular Icon" />
        <Typography
          sx={{ fontSize: "12px", fontWeight: 600 }}
          onClick={(e) => {
            e.stopPropagation();
            onclick(isExpanded ? -1 : index);
            setIsExpanded(!isExpanded);
            if (pillResponse === null) {
              handleChildClick();
            }
          }}
        >
          {data.pillName}
        </Typography>
        {isExpanded && (
          <RefreshOutlined
            onClick={(e) => {
              e.stopPropagation();
              handleChildClick();
            }}
            sx={{
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.5)",
              marginLeft: "auto",
            }}
          />
        )}
        {(isHovered || isExpanded) && (
          <OpenInFull
            sx={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.5)" }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) {
                handleChildClick();
              }

              onclick(isExpanded ? -1 : index);
              setIsExpanded(!isExpanded);
            }}
          />
        )}
      </Box>
      {isExpanded && (
        <motion.div style={{ width: "100%" }}
        initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {isRefreshing ? (
            <>
              <div style={{ width: "99%" }}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={12}
                  style={{ borderRadius: "32px", marginTop: "5px" }}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={12}
                  style={{ borderRadius: "32px", marginTop: "5px" }}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={12}
                  style={{ borderRadius: "32px", marginTop: "5px" }}
                />
              </div>
              <Typography
                component="div"
                sx={{
                  marginTop: "5px",
                  display: "flex",
                  columnGap: "20px",
                  flexWrap: "wrap",
                }}
              >
                {skeletonArray.map((item: any, index) => (
                  <div key={index} style={{ width: "48%", padding: "10px 0" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={12}
                        style={{ borderRadius: "32px" }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={12}
                        style={{ borderRadius: "32px" }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={12}
                        style={{ borderRadius: "32px" }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={12}
                        style={{ borderRadius: "32px" }}
                      />
                    </div>
                  </div>
                ))}
              </Typography>
            </>
          ) : (
            <>
              <Box sx={{ padding: "5px 15px" }} onClick={(e) => e.stopPropagation()}>
                <Typography sx={{ fontSize: "13px" }} >
                  {pillResponse?.summary}
                </Typography>
                <Typography
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    columnGap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {pillResponse?.items.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="accord-description"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.header}
                        <img
                          onClick={() => toggleCard(index)}
                          style={{
                            transform: openCards[index]
                              ? "rotate(180deg)"
                              : "none",
                          }}
                          src={"/images/icons/downArrow.svg"}
                        />
                      </div>
                      <div
                        className={openCards[index] ? "" : "hideDescription"}
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          marginTop: "5px",
                        }}
                      >
                        {item.description}
                      </div>
                      <div
                        className={
                          index >= datas.length - 2 ? "" : "slitBorder"
                        }
                      ></div>
                    </div>
                  ))}
                </Typography>
              </Box>
            </>
          )}
        </motion.div>
      )}
    </Box>
  );
};
export default InformationChip;
