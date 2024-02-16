import { IosShare } from "@mui/icons-material";
import {
  EditorState,
  Editor,
  convertFromHTML,
  ContentState,
  Modifier,
} from "draft-js";
import { useRef, useState, type FC, useEffect, forwardRef, useImperativeHandle } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { Button } from "@mui/material";
interface PromptTextInputProps {
  promptSelect: string
  setPromptSelect: any,
  setAnswerAceepted: any
}

const PromptTextInput: FC<PromptTextInputProps | any> = forwardRef
  (({ promptSelect, setPromptSelect, setAnswerAceepted }, ref) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const actionPlanRef = useRef<HTMLDivElement>(null);
    const [isHovered, textAreaIsHovered] = useState(false);
    const [showMenuOnclick, setIsClicked] = useState(false);
    const handleClick = () => {
      setIsClicked(!showMenuOnclick);
    };
    const handleAccept = () => {
      {
        const actionPlan = actionPlanRef.current
          ? actionPlanRef.current.innerHTML
          : "";
        const blocksFromHTML = convertFromHTML(actionPlan);
        const newState = EditorState.createWithContent(
          ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          )
        );
        const contentState = Modifier.replaceWithFragment(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          newState.getCurrentContent().getBlockMap()
        );
        const newEditorState = EditorState.push(
          editorState,
          contentState,
          "insert-fragment"
        );

        onEditorChange(newEditorState);
        setPromptSelect('')
        setAnswerAceepted(true)
      }
    }
    useImperativeHandle(ref, () => ({
      trigger: () => {
        handleAccept()
      }
    }));
    const onEditorChange = (event: any) => {
      setEditorState(event);

    };
    return (
      <div style={{ backgroundColor: "white"}}>
        <div
          onMouseEnter={() => textAreaIsHovered(true)}
          onMouseLeave={() => textAreaIsHovered(false)}
          className={`${isHovered ? "textAreaHover" : ""}`}
          style={{
            width: "auto",
            minHeight: "200px",
            height: "auto",
            background: "#F8F8F8",
            border: "1px solid #F8F8F8",
            paddingInline: "15px",
            borderRadius: "20px",
            padding: "20px",
            margin: "20px 10px",
            position: "relative"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Editor
              editorState={editorState}
              onChange={onEditorChange}
              placeholder="Type to respond"
            />
            {isHovered && (
              <Button onClick={handleClick} className="expandbutton editBtn">
                <CreateIcon style={{ width: "21px", color: "grey" }} />
              </Button>
            )}
          </div>
          <div className="promptSuggestionArea">
            {promptSelect && (
              <div
                style={{
                  marginTop: "20px",
                  cursor: "pointer",
                  fontSize: "16px",
                  border: "1px solid grey",
                  borderRadius: "20px",
                  padding: "20px",
                }}
              >
                <IosShare
                  sx={{ float: "right" }}
                  onClick={handleAccept}
                />

                <div ref={actionPlanRef}>
                  <div dangerouslySetInnerHTML={{ __html: promptSelect }} />
                </div>
              </div>
            )}
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

export default PromptTextInput;
