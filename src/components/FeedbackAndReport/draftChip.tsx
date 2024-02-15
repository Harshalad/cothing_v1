import { ExpandMore, OpenInFull, RefreshOutlined } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState, FC, useEffect } from "react";
import Button from "@mui/material/Button";
interface InformationChipProps {
  data: any;
  index: number;
  onclick: (index: any) => void;
}

const DraftChip: FC<InformationChipProps> = ({ data, onclick, index }) => {
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
      header: "Draft 1",
      bulletField: false,
      discription1: "START: Solution based discussion in sales conversations. ",
      discription2:
        "STOP: Pushy/Sales marketing based discussions in sales conversations.  ",
      discription3:
        "DO DIFFERENTLY: Balance of Solutioning related discussions and Marketing discussions, pushing the features and value of our product.  ",
    },
    {
      header: "Draft 2",
      bulletField: true,
      discription1:
        "Start Implementing Solution-Based Discussions in Sales Conversations",
      discription2: "Stop Engaging in Overly Aggressive Sales Tactics ",
      discription3: "Do Differently - Find a Balanced Approach",
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
                <Typography
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    columnGap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {datas.map((item: any, index: any) => (
                    <div
                      key={index}
                      style={{
                        width: "48%",
                        padding: "10px",
                        borderRadius: "16px",
                        background: "rgba(221, 227, 238, 0.25)",
                        height: !openCards[index]
                              ? "fit-content"
                              : "initial",
                          
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ columnGap: "10px", display: "flex" }}>
                          <img
                            className="ml-1"
                            src={"/images/icons/greyStar.svg"}
                          />{" "}
                          <div>{item.header}</div>
                        </div>
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
                      {!item?.bulletField && (
                        <div
                          className={
                            openCards[index] ? "mt-15" : "hideDescriptionDraft , ml-22 mt-5"
                          }
                          style={{
                            fontSize: "11px",
                            fontWeight: 400,
                            // marginTop: "5px",
                          }}
                        >
                          <div> {item.discription1}</div>
                          <div> {item.discription2}</div>
                          <div> {item.discription3}</div>
                        </div>
                      )}
                      {item?.bulletField && (
                        <div
                          className={
                            openCards[index] ? "mt-15" : "hideDescriptionDraft , ml-22 mt-5"
                          }
                          style={{
                            fontSize: "11px",
                            fontWeight: 400,
                            // marginTop: "5px",
                          }}
                        >
                            <ul className="ListStyle">
                                <li> {item.discription1}</li>
                                <li>{item.discription2}</li>
                                <li>{item.discription3}</li>
                            </ul>
                        </div>
                      )}
                      <div>
                        {openCards[index] && (
                          <div
                            style={{
                              display: "flex",
                              columnGap: "10px",
                              marginTop: "20px",
                            }}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              className="cag-blue-bg commonBtnStyle commonBlueBtnStyle"
                              style={{ color: "white" }}
                            >
                              <div style={{ marginTop: "1px" }}>ACCEPT</div>
                              <img
                                className="ml-1"
                                src={"/images/icons/btnDownArrow.svg"}
                              />
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              className="bg-grey commonBtnStyle commonGreyBtnStyle"
                              style={{ color: "black" }}
                            >
                              <div style={{ marginTop: "1px" }}>DISMISS</div>

                              <img
                                className="ml-1"
                                src={"/images/icons/closeBtn.svg"}
                              />
                            </Button>
                            <img
                              className="ml-2 cPointer"
                              src={"/images/icons/moreOption.svg"}
                            />
                          </div>
                        )}
                      </div>
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
export default DraftChip;
