import { IosShare } from '@mui/icons-material';
import { EditorState, Editor, convertFromHTML, ContentState, Modifier } from 'draft-js';
import { useRef, useState, type FC, useEffect } from 'react';

interface PromptTextInputProps { }

const PromptTextInput: FC<PromptTextInputProps> = () => {
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const actionPlanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setShowSuggestion(true)
        }, 2000)
    }, [])

    const onEditorChange = (event: any) => {
        setEditorState(event)
        setShowSuggestion(false)
    }
    return (<div>
        <div

            style={{ width: 'auto', minHeight: '200px', height: 'auto', background: 'lightgrey', border: '1px solid grey', paddingInline: '15px' }}
        >
            <Editor
                editorState={editorState}
                onChange={onEditorChange}
                placeholder="Enter your feedback here..."
            />
            <div className='promptSuggestionArea'>
                {showSuggestion && (
                    <div style={{ marginTop: '20px', cursor: 'pointer', fontSize: '16px', border: '1px solid grey' }}>
                        <IosShare sx={{ float: 'right' }} onClick={() => {
                            const actionPlan = actionPlanRef.current ? actionPlanRef.current.innerHTML : '';
                            const blocksFromHTML = convertFromHTML(actionPlan);
                            const newState = EditorState.createWithContent(
                                ContentState.createFromBlockArray(
                                    blocksFromHTML.contentBlocks,
                                    blocksFromHTML.entityMap,
                                )
                            );
                            const contentState = Modifier.replaceWithFragment(
                                editorState.getCurrentContent(),
                                editorState.getSelection(),
                                newState.getCurrentContent().getBlockMap(),
                            );
                            const newEditorState = EditorState.push(editorState, contentState, 'insert-fragment');
                            onEditorChange(newEditorState);
                        }} />
                        <div ref={actionPlanRef}>
                            <strong>Action Plan:</strong><ul><li><strong>Start:</strong> Implementing Solution-Based Discussions in Sales Conversations - Aim to integrate this approach within the next 30 days.</li><li><strong>Stop:</strong> Engaging in Overly Aggressive Sales Tactics - Cease these tactics immediately to foster better client relationships.</li><li><strong>Do Differently:</strong> Find a Balanced Approach - Over the next 60 days, work on finding a balance between solution-based discussions and sales aggressiveness.</li></ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div>

        </div>
    </div>);
}

export default PromptTextInput;
