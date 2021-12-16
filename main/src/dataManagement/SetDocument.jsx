import React, {useContext, useState} from "react";
import {setData} from "./database/dbFunctions";
import {Collapse, Spinner} from "react-bootstrap";
import ToastNotification from "../components/blocks/ToastNotification";
import {cleanupTextEditorImages} from "../components/textEditor/textEditorHelper";
import TextEditorContext from "../providers/TextEditorContext";

//Update content
function SetDocument({collection, docId, dataObject, btnText = "Save Changes"}) {
    const [open, setOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [updateStatus, setUpdateStatus] = useState({pending: false, err: false});
    const {textEditorCleanup, setTextEditorCleanup} = useContext(TextEditorContext)


    const handleUpdate = async () => {
        setUpdateStatus({pending: true, err: false})
        await cleanupTextEditorImages(textEditorCleanup, setTextEditorCleanup)
        setData(collection, docId, dataObject)
            .then(() => setUpdateStatus({pending: false, err: false}))
            .catch(() => setUpdateStatus({pending: false, err: true}))
            .finally(() => {
                setShowToast(true)
                setOpen(false)
            })
    }


    return (
        <div className={"pb-3 "}>
            <div className={"mb-5 d-inline-block"}>
                <button onClick={() => setOpen(!open)}
                        aria-controls={"example-collapse-text"}
                        aria-expanded={open}
                        className={"px-4 py-2 scbtn--2 scbtn--med"}>
                    {btnText}
                </button>
                <Collapse in={open}>
                    <div className={"py-2"}>
                        <p className={"mb-0"}>Changes will be published to the main website.</p>
                        <hr className={"mt-0"}/>
                        <button className={"scbtn--med btn background__success p-2 mt-2"} style={{borderRadius: "0"}}
                                onClick={() => {
                                    handleUpdate()
                                }} disabled={updateStatus.pending}>
                            {updateStatus.pending ? <Spinner animation={"border"}/> : "Confirm Save"}
                        </button>
                    </div>
                </Collapse>
            </div>
            <ToastNotification header={updateStatus.err ? "Oh no!" : "Success!"}
                               body={updateStatus.err ? "Something went wrong while trying to save your changes. Please try again."
                                   : "You changes have been saved."}
                               className={updateStatus.err ? "background__fail" : "background__success"}
                               showState={[showToast, setShowToast]}/>
        </div>
    );
}

export default SetDocument
