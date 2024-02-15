import { Dialog } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";
export const ExpandLink = ({ open, handleOpen, link }: any) => {
    const maxWidth = "600px"
    return (
        <Dialog open={open} className="manager-time-modal checkin_modal expandLink">
            <CloseIcon
                style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    zIndex: "1",
                    cursor: "pointer",
                }}
                onClick={() => {
                    handleOpen();
                }}
            />
            <iframe
                src={link}
                title="Embedded Website"
                height={"600px"}
                width={"100%"}
            />
        </Dialog>
    )
}