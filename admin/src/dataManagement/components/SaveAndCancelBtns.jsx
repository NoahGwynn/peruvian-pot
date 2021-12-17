import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Collapse, Spinner} from "react-bootstrap";
import ToastNotification from "./ToastNotification";

function SaveAndCancelBtns({saveBtnTxt, cancelBtnTxt, isUpdate = false, handleSave, redirectLink = null, updateStatus}) {
    const [open, setOpen] = useState({openSave: false, openCancel: false});
    const [showToast, setShowToast] = useState(false);
    const history = useHistory()

    return (
        <div className={"py-5 "}>
            <div className={"mb-5 d-inline-block"}>
                <button onClick={() => setOpen({openSave: !open.openSave, openCancel: false})} aria-expanded={open.openSave} className={"px-4 py-2"}>
                    {saveBtnTxt}
                </button>
                <button onClick={() => setOpen({openSave: false, openCancel: !open.openCancel,})} aria-expanded={open.openCancel}
                        className={"px-4 py-2 ml-2"}>
                    Cancel & Exit
                </button>

                {/*Save Confirm*/}
                <Collapse in={open.openSave}>
                    <div className={"pt-2"}>
                        <p className={"mb-0"}>{`Save${isUpdate ? " your changes?" : "?"}`}</p>
                        <hr className={"mt-0"}/>
                        <button className={"btn-default background__success p-2 mt-2"}
                                style={{borderRadius: "0"}}
                                onClick={() => {
                                    handleSave()
                                        .then(() => redirectLink ? history.push(`/${redirectLink}`) : setShowToast(true))
                                        .catch(() => console.log("Create Error"))
                                }} disabled={updateStatus.pending}>
                            {updateStatus.pending ? <Spinner animation={"border"}/> : "Confirm Save"}
                        </button>
                    </div>
                </Collapse>

                {/*Cancel Confirm*/}
                <Collapse in={open.openCancel}>
                    <div className={"pt-2"}>
                        <p className={"mb-0"}>Any changes you made will be lost.</p>
                        <hr className={"mt-0"}/>
                        <button className={"btn-default background__fail p-2 mt-2"}
                                style={{borderRadius: "0"}}
                                onClick={() => {
                                    history.push(`/${redirectLink}`)
                                }} disabled={updateStatus.pending}>
                            {cancelBtnTxt}
                        </button>
                    </div>
                </Collapse>
                {/*Saved Toast*/}
                <ToastNotification header={updateStatus.err ? "Oh no!" : "Success!"}
                                   body={updateStatus.err ? "Something went wrong. Please try again."
                                       : "Your work has been saved!."}
                                   className={updateStatus.err ? "background__fail" : "background__success"}
                                   showState={[showToast, setShowToast]}/>
            </div>
        </div>
    );
}

export default SaveAndCancelBtns;