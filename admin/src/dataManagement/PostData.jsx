import React, { useState } from "react";
import { postData } from "./db/dbFunctions";
import SaveAndCancelBtns from "./components/SaveAndCancelBtns";


function PostData({ apiPath, data, saveBtnText = "Save Changes", redirectLink = null, isUpdate = false }) {
    const [updateStatus, setUpdateStatus] = useState({ pending: false, success: false, err: false });

    const handleSave = async () => {
        setUpdateStatus({ pending: true, success: false, err: false });
        return new Promise(async (resolve, reject) => {
            postData(apiPath, data)
                .then(() => {
                    setUpdateStatus({ pending: false, success: true, err: false });
                    resolve()
                })
                .catch(() => {
                    setUpdateStatus({ pending: false, success: false, err: true });
                    reject()
                })
        })
    }

    return <SaveAndCancelBtns saveBtnTxt={saveBtnText} cancelBtnTxt={"Cancel"} handleSave={handleSave} updateStatus={updateStatus}
        redirectLink={redirectLink} isUpdate={isUpdate} />
}

export default PostData
