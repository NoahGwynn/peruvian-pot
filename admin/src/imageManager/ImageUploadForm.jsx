import React, { useState } from "react";
import { postData } from "../dataManagement/db/dbFunctions";
import { getFileId } from "./ImageHelpers";


//// File upload to a given directory --- with axios ////

export function ImageUploadForm({ directoryName, renderCountState }) {
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [showProgress, setShowProgress] = useState(false)

    function onChangeHandler(e) {
        if (e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)
        }
    }

    //
    function onClickHandler(e) {
        e.target.blur()
        //Create storage ref
    }

    return (
        <>
            <div className={"position-relative"} style={{ height: "0" }}>
                <div className={"m-0 position-absolute progress-bar " + (!showProgress && "collapse")}
                    style={{ width: `${progress}%` }}><span /></div>
            </div>
            <div className={"d-flex py-3 border-thin-grey"}>
                <form>
                    <input type={"file"} />
                </form>
                {/* <Form>
                    <Form.File
                        id="file"
                        className={"text-small"}
                        custom
                        // value={selectedFile.name}
                        onChange={onChangeHandler}
                    />
                </Form> */}
                <button type="button" className="scbtn--small scbtn--1 ml-2 py-0"
                    disabled={file === null}
                    onClick={onClickHandler}
                >
                    Upload
                </button>
            </div>
        </>
    );
}

