import { ExpandMore, OpenInFull, RefreshOutlined } from "@mui/icons-material";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState, FC, useEffect } from "react";
import Button from "@mui/material/Button";
interface DraftChipProps {
  data: any;
  index: number;
  onclick: (index: any) => void;
  onDraftSelect: (index: any) => void;
  childRef?: any
}

const DraftChip: FC<DraftChipProps> = ({ data, onclick, index, onDraftSelect, childRef }) => {
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

  const acceptClick = (index: any) => {
    childRef.current.trigger()
    onDraftSelect('')
  }
  const dismissClick = (index: any) => {
    setOpenCards(-1);
    onDraftSelect('')
  }
  const toggleCard = (index: number) => {
    setOpenCards(index);
    onDraftSelect(datas[index] ? datas[index].html : '')
  };
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
      html: `
      <ul>
      <li><b>START:</b> Solution based discussion in sales conversations.</li>
      <li><b>STOP:</b> Pushy/Sales marketing based discussions in sales conversations.</li>
      <li><b>DO DIFFERENTLY:</b> Balance of Solutioning related discussions and Marketing discussions, pushing the features and value of our product.</li>
      </ul>`
    },
    {
      header: "Draft 2",
      bulletField: true,
      discription1:
        "Start Implementing Solution-Based Discussions in Sales Conversations",
      discription2: "Stop Engaging in Overly Aggressive Sales Tactics ",
      discription3: "Do Differently - Find a Balanced Approach",
      html: `
      <ul class="ListStyle">
      <li>Start: Solution based discussion in sales conversations.</li>
      <li>Stop: Pushy/Sales marketing based discussions in sales conversations.</li>
      <li>Do Differently: Balance of Solutioning related discussions and Marketing discussions, pushing the features and value of our product.</li>
      </ul>`
    },
  ];
  const [openCards, setOpenCards] = useState(-1);


  const skeletonArray = new Array(5).fill({});
  return (
    <Box
      className="informationPill_container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <Box
        sx={{ display: "flex", gap: "8px", alignItems: "center" }}
        onClick={() => {
          onclick(isExpanded ? -1 : index);
          setIsExpanded(!isExpanded);
        }}
      >
        <img src="/images/icons/binocular.svg" alt="Binocular Icon" />
        <Typography component="div" sx={{ fontSize: "12px", fontWeight: 600 }}>
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
              {skeletonArray.map((item: any, index) => (
                <Box key={index} sx={{ width: "48%", padding: "10px 0" }}>
                  <Box
                    sx={{
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
                  </Box>
                  <Box
                    className={openCards == index ? "" : "hideDescription"}
                    sx={{
                      marginTop: "5px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width="100%"
                      height={15}
                    />
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <>
              <Box sx={{ padding: "5px 15px" }}>
                <Typography component="div" sx={{
                  marginTop: "10px",
                  display: "flex",
                  columnGap: "20px",
                  flexWrap: "wrap",
                }}>
                  {datas.map((item: any, index: any) => (
                    <Box
                      key={index}
                      sx={{
                        width: "48%",
                        padding: "10px",
                        borderRadius: "16px",
                        background: "rgba(221, 227, 238, 0.25)",
                        height: !openCards == index
                          ? "fit-content"
                          : "initial",
                        border: openCards == index ? '1px solid #2e5db0' : 'none'

                      }}
                      onClick={() => toggleCard(index)}
                    >
                      <Box
                        sx={{
                          fontSize: "13px",
                          fontWeight: 400,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ columnGap: "10px", display: "flex" }}>
                          <img
                            className="ml-1"
                            src={"/images/icons/greyStar.svg"}
                          />{" "}
                          <Box>{item.header}</Box>
                        </Box>
                        <img
                          onClick={(e: any) => { openCards == index ? toggleCard(-1) : toggleCard(index); e.stopPropagation() }}
                          style={{
                            transform: openCards == index
                              ? "rotate(180deg)"
                              : "none",
                          }}
                          src={"/images/icons/downArrow.svg"}
                        />
                      </Box>
                      {!item?.bulletField && (
                        <Box
                          className={
                            openCards == index ? "mt-15" : "hideDescriptionDraft , ml-22 mt-5"
                          }
                          sx={{
                            fontSize: "11px",
                            fontWeight: 400,
                          }}
                        >
                          <Box> {item.discription1}</Box>
                          <Box> {item.discription2}</Box>
                          <Box> {item.discription3}</Box>
                        </Box>
                      )}
                      {item?.bulletField && (
                        <Box
                          className={
                            openCards == index ? "mt-15" : "hideDescriptionDraft , ml-22 mt-5"
                          }
                          sx={{
                            fontSize: "11px",
                            fontWeight: 400,
                          }}
                        >
                          <ul className="ListStyle">
                            <li> {item.discription1}</li>
                            <li>{item.discription2}</li>
                            <li>{item.discription3}</li>
                          </ul>
                        </Box>
                      )}
                      <Box>
                        {openCards == index && (
                          <Box
                            sx={{
                              display: "flex",
                              columnGap: "10px",
                              marginTop: "20px",
                            }}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              className="cag-blue-bg commonBtnStyle commonBlueBtnStyle"
                              sx={{ color: "white" }}
                              onClick={() => acceptClick(index)}
                            >
                              <Box sx={{ marginTop: "1px" }}>ACCEPT</Box>
                              <img
                                className="ml-1"
                                src={"/images/icons/btnDownArrow.svg"}
                              />
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              className="bg-grey commonBtnStyle commonGreyBtnStyle"
                              sx={{ color: "black" }}
                              onClick={() => dismissClick(index)}
                            >
                              <Box sx={{ marginTop: "1px" }}>DISMISS</Box>

                              <img
                                className="ml-1"
                                src={"/images/icons/closeBtn.svg"}
                              />
                            </Button>
                            <img
                              className="ml-2 cPointer"
                              src={"/images/icons/moreOption.svg"}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
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
