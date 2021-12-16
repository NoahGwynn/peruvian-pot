import React, {useContext, useState} from "react";
import {setDocAndUpdateStat, updateTitleInCollectionSearch} from "./database/dbFunctions";
import {Collapse, Spinner} from "react-bootstrap";
import ToastNotification from "../components/blocks/ToastNotification";
import {useHistory} from "react-router-dom";
import TextEditorContext from "../providers/TextEditorContext";
import {cleanupTextEditorImages} from "../components/textEditor/textEditorHelper";

//Update content
function SetSectionDocument({collection, docId, document, btnText, cancelLink, callback = null, isUpdate, oldTitle}) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [updateStatus, setUpdateStatus] = useState({pending: false, err: false});
    const history = useHistory()
    const {textEditorCleanup, setTextEditorCleanup} = useContext(TextEditorContext)


    const handleUpdate = async () => {
        setUpdateStatus({pending: true, err: false});
        await cleanupTextEditorImages(textEditorCleanup, setTextEditorCleanup)
        if (isUpdate) {
            await updateTitleInCollectionSearch(collection, docId, oldTitle, document.title)
        }
        return new Promise((resolve, reject) => {
            setDocAndUpdateStat(collection, docId, document, "docCount", isUpdate ? 0 : 1)
                .then(() => {
                    if (callback) {
                        callback(docId, document.title).then(() => {
                            setUpdateStatus({pending: false, err: false})
                            resolve()
                        })
                    } else {
                        setUpdateStatus({pending: false, err: false})
                        resolve()
                    }
                })
                .catch(() => {
                    setUpdateStatus({pending: false, err: true})
                    setShowToast(true)
                    setOpenConfirm(false)
                    reject()
                })
        })
    }

    // collectionText - only for the update label:
    let collectionText = collection === "events" ? "event?" : collection === "news" ? "post" : collection === "policies" ? "policy" : ""

    return (
        <>
            <div className={"py-5 "}>
                <div className={"mb-5 d-inline-block"}>
                    <button onClick={() => {
                        setOpenConfirm(!openConfirm)
                        setOpenCancel(false)
                    }}
                            aria-expanded={openConfirm}
                            className={"px-4 py-2 scbtn--1 scbtn--med"}>
                        {btnText}
                    </button>
                    <button onClick={() => {
                        setOpenCancel(!openCancel)
                        setOpenConfirm(false)
                    }}
                            aria-expanded={openConfirm}
                            className={"px-4 py-2 scbtn--med sc-red-btn ml-2"} type={"button"}>
                        Cancel & Exit
                    </button>
                    {/*Save Confirm Button*/}
                    <Collapse in={openConfirm}>
                        <div className={"pt-2"}>
                            <p className={"mb-0"}>{`Save ${isUpdate ? "changes to this" : "this"} ${collectionText}`}</p>
                            <hr className={"mt-0"}/>
                            <button className={"scbtn--med btn background__success p-2 mt-2"}
                                    style={{borderRadius: "0"}}
                                    onClick={() => {
                                        handleUpdate()
                                            .then(() => history.push(`/${cancelLink}`))
                                            .catch(() => console.log("Create Error"))
                                    }} disabled={updateStatus.pending}>
                                {updateStatus.pending ? <Spinner animation={"border"}/> : "Confirm Save"}
                            </button>
                        </div>
                    </Collapse>
                    {/*Cancel Confirm*/}
                    <Collapse in={openCancel}>
                        <div className={"pt-2"}>
                            <p className={"mb-0"}>Any changes you made will be lost.</p>
                            <hr className={"mt-0"}/>
                            <button className={"scbtn--med btn background__fail p-2 mt-2"}
                                    style={{borderRadius: "0"}}
                                    onClick={() => {
                                        history.push(`/${cancelLink}`)
                                    }} disabled={updateStatus.pending}>
                                Exit
                            </button>
                        </div>
                    </Collapse>
                    {/*Saved Toast*/}
                    <ToastNotification header={updateStatus.err ? "Oh no!" : "Success!"}
                                       body={updateStatus.err ? "Something went wrong while trying to save your changes. Please try again."
                                           : "You changes have been saved."}
                                       className={updateStatus.err ? "background__fail" : "background__success"}
                                       showState={[showToast, setShowToast]}/>
                </div>
            </div>
        </>
    )
        ;
}

export default SetSectionDocument
