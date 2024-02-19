import { ExpandMore, OpenInFull, RefreshOutlined } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState, FC, useEffect } from "react";

interface InformationChipProps {
  data: any;
  index: number;
  onclick: (index: any) => void;
}

const InformationChip: FC<InformationChipProps> = ({
  data,
  onclick,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsRefreshing(true);
    const timer = setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  const handleRefreshClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };
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
  const [openCards, setOpenCards] = useState(Array(datas?.length).fill(false));

  const toggleCard = (index: any) => {
    setOpenCards((prevOpenCards) => {
      const newOpenCards = [...prevOpenCards];
      newOpenCards[index] = !newOpenCards[index];
      return newOpenCards;
    });
  };
  const skeletonArray = new Array(5).fill({});
  return (
    <Box
      className="informationPill_container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* use isActive class to active */}
      <Box
        sx={{ display: "flex", gap: "8px", alignItems: "center" }}
        onClick={() => {
          onclick(isExpanded ? -1 : index);
          setIsExpanded(!isExpanded);
        }}
      >
        <img src="/images/icons/binocular.svg" alt="Binocular Icon" />
        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
          {data.pillName}
        </Typography>
        {isExpanded && (
          <RefreshOutlined
            onClick={handleRefreshClick}
            sx={{
              fontSize: "14px",
              color: "rgba(0, 0, 0, 0.5)",
              marginLeft: "auto",
            }}
          />
        )}
        {(isHovered || isExpanded) && (
          <OpenInFull sx={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.5)" }} />
        )}
      </Box>
      {isExpanded && (
        <Box sx={{ width: "100%" }}>
          {isRefreshing ? (
            <>
              {" "}
              {/* <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height={300}
              /> */}
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
                height={15}
              />
                  </div>
                  <div
                    className={openCards[index] ? "" : "hideDescription"}
                    style={{
                      marginTop: "5px",
                    }}
                  >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height={15}
              />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <Box sx={{ padding: "5px 15px" }}>
                <Typography sx={{ fontSize: "13px" }}>
                  This is important because it helps you to understand the
                  purpose of the product or service, and how it can benefit your
                  business. It also helps you to make an informed decision about
                  whether or not to use the product or service, and to
                  understand the risks and limitations involved.
                </Typography>
                <Typography
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    columnGap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {datas.map((item: any, index: any) => (
                    <div className="accord-description"
                      key={index}>
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
                        {item.discription}
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
        </Box>
      )}
    </Box>
  );
};
export default InformationChip;
