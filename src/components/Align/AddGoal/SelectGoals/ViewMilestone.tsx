import { Box, Dialog, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ViewMilestone = ( { openViewMilestone, viewGoal, goalIdDevAreaMap, setOpenViewMilestone }: any ) => {
    console.log( viewGoal, "adityGoal" );

    return (
        <Dialog
            open={ openViewMilestone }
            maxWidth="xl"
            style={ { width: "765px", padding: "25px 5px 5px 5px", } }
            sx={ {

                height: "690px", // Adjusted to the specified height
                top: "27px", // Adjusted to the specified top position
                left: "337.5px", // Adjusted to the specified left position
                borderRadius: "16px", // Adjusted to the specified border-radius
            } }
        >
            <CloseIcon
                style={ {
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    zIndex: "1",
                    cursor: "pointer",
                } }
                onClick={ () => {
                    setOpenViewMilestone( false );
                } }
            />
            <Box sx={ { padding: "24px" } }>
                <Typography variant="h5" sx={ {
                    fontWeight: "bold", // or you can use numeric values like 700 or 800
                    color: "#3E4248",
                    marginBottom: "6px",
                    fontSize: "20px",
                } }>
                    { viewGoal?.name }
                </Typography>
                <Typography sx={ { color: "#3E4248", fontSize: "14px", marginBottom: "20px" } }>
                    { goalIdDevAreaMap?.get( viewGoal?.id )
                        ? goalIdDevAreaMap?.get( viewGoal?.id ).length === 1
                            ? `Development Area: ${ goalIdDevAreaMap?.get( viewGoal?.id ).join( ", " ) || "" }`
                            : `Development Areas: ${ goalIdDevAreaMap?.get( viewGoal?.id ).join( ", " ) || "" }`
                        : "" }
                </Typography>
                <Box sx={ { padding: "1px", borderRadius: "8px", marginTop: "5px" } }>
                    <Typography variant="h6" sx={ { fontWeight: "bold", marginBottom: "5px", color: "#3E4248" } }>Milestones</Typography>
                    { viewGoal?.milestones?.map( ( milestone: any, index: number ) => (
                        <Typography
                            key={ index }

                            sx={ {
                                height: "auto",
                                border: "1px solid #EAECEF",
                                borderRadius: "8px",
                                marginBottom: "8px",
                                paddingLeft: "12px",
                                paddingRight: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                backgroundColor: "#ffffff",
                                color: "#3E4248",
                                fontSize: "13px",
                                maxWidth: "calc(100% - 30px)", // Adjust the maxWidth as needed
                                wordWrap: "break-word",
                                overflowWrap: "break-word",
                            } }
                        >
                            <span>{ `${ index + 1 }. ${ milestone?.statement }` }</span>
                        </Typography>
                    ) ) }
                </Box>
            </Box>
        </Dialog>
    );
};

export default ViewMilestone;
