import { IosShare } from "@mui/icons-material";
import {
  EditorState,
  Editor,
  convertFromHTML,
  ContentState,
  Modifier,
  convertToRaw,
} from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { useRef, useState, type FC, useEffect, forwardRef, useImperativeHandle } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { Box, Button, Typography } from "@mui/material";
import { updateQuestionClarity } from "../../actions/coThinkPrep/updateQuestionClarity";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import NorthTwoToneIcon from '@mui/icons-material/NorthTwoTone';

interface PromptTextInputProps {
  promptSelect: string
  setPromptSelect: any,
  setAnswerAceepted: any
}

const PromptTextInput: FC<PromptTextInputProps | any> = forwardRef
  (({ promptSelect, setPromptSelect, setAnswerAceepted }, ref) => {
    //@ts-ignore
    const user = useSelector((state) => state?.auth?.nWorxUser);
    const router = useRouter();
    const [userWorkSheetId, setUserWorksheetId] = useState<any>(null);
    const [type, setType] = useState<any>(null);
    useEffect(() => {
      setUserWorksheetId(router?.query?.id);
      setType(router?.query?.type === "prep" ? "PREPARE" : "QP");
    }, [router])
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const actionPlanRef = useRef<HTMLDivElement>(null);
    const editor = useRef<any>(null)
    const [isHovered, textAreaIsHovered] = useState(false);
    const [showMenuOnclick, setIsClicked] = useState(false);
    const handleClick = () => {
      setIsClicked(!showMenuOnclick);
      setEditorState(EditorState.createEmpty()); // Clear existing rich editor on button click
    };
    const dismissClick = () => {
      setPromptSelect('')
      setAnswerAceepted(false)
    }
    const handleAccept = (e?: any) => {

      e?.stopPropagation();
      setPromptSelect('')
      const actionPlan = actionPlanRef.current
        ? actionPlanRef.current.innerHTML
        : "";
      const blocksFromHTML = convertFromHTML(actionPlan);
      const newContentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const newEditorState = EditorState.createWithContent(newContentState);


      onEditorChange(newEditorState);
      setPromptSelect('')
      setAnswerAceepted(true)

    }
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())), "editorstate");
    useImperativeHandle(ref, () => ({
      trigger: () => {
        handleAccept()
      }
    }));
    const onEditorChange = (event: any) => {
      setEditorState(event);
    };
    console.log(editorState.getCurrentContent().getBlockMap(), promptSelect, "editior state");
    return (
      <div style={{ backgroundColor: "white" }} className="checkEditor">
        <div
          onMouseEnter={() => textAreaIsHovered(true)}
          onMouseLeave={() => textAreaIsHovered(false)}
          onClick={() => { editor?.current?.focus() }}
          className={`${isHovered ? "textAreaHover" : ""}`}
          style={{
            width: "auto",
            minHeight: "200px",
            height: "auto",
            background: "#F8F8F8",
            border: "1px solid #F8F8F8",
            paddingInline: "15px",
            borderRadius: "20px",
            padding: "10px 20px",
            cursor: 'text',
            position: "relative"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Editor
              ref={editor}
              editorState={editorState}
              onChange={onEditorChange}
              placeholder="Type to respond"
              readOnly={false} // Added to make the editor editable
            />
            {isHovered && (
              <Button onClick={handleClick} className="expandbutton editBtn">
                <CreateIcon style={{ width: "21px", color: "grey" }} />
              </Button>
            )}
          </div>
          <div className="promptSuggestionArea">
            {promptSelect && <div className="textEditorDisplay">
              <div className="flex" style={{ alignContent: "center", backgroundColor: "#f8f8f8", padding: "0" }}>
                <div><img height={18} src="/images/icons/greyStar.svg" /></div>
                <div style={{ marginLeft: "auto" }}>
                  <NorthTwoToneIcon onClick={handleAccept} /><CloseTwoToneIcon onClick={() => { dismissClick() }} />
                </div>
              </div>
              <div ref={actionPlanRef}>
                <div dangerouslySetInnerHTML={{ __html: promptSelect }} />
              </div>
            </div>}

          </div>
          <div className="mt-15 ">
            {showMenuOnclick && (
              <div className="d-flex ml-auto"
                style={{ justifyContent: "end", position: "absolute", right: "20px", bottom: "15px" }} >
                <div className="showOnEdit">
                  <div className="f-14 f-500 cPointer">Aa</div>
                  <div
                    className="f-12 f-400 cPointer"
                    style={{ color: "rgba(0, 0, 0, 0.50)" }}
                  >
                    Body
                  </div>
                  <div className="rightSpliter"></div>
                  <img className="cPointer" src="/images/icons/galareyImgIcon.svg" />
                  <img className="cPointer" src="/images/icons/tableIcon.svg" />
                  <img className="cPointer" src="/images/icons/menuIcon.svg" />
                </div>
                <div className="showOnEdit ml-10 f-14 cPointer" onClick={handleClick}>
                  Done
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });
PromptTextInput.displayName = 'PromptTextInput';
export default PromptTextInput;
