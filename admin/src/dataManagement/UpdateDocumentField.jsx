import React, { useState } from "react";
// import { updateData } from "./firebase/dbFunctions";
// import SaveAndCancelBtns from "./components/SaveAndCancelBtns";

//Update content
function UpdateDocumentField({ collection, docId, updateKey, updateValue, saveBtnText = "Save Changes", redirectLink = null }) {
    // const [updateStatus, setUpdateStatus] = useState({ pending: false, success: false, err: false });

    // const handleUpdate = async () => {
    //     setUpdateStatus({ pending: true, success: false, err: false });
    //     updateData(updateKey, updateValue, docId, collection)
    //         .then(() => setUpdateStatus({ pending: false, success: true, err: false }))
    //         .catch(() => setUpdateStatus({ pending: false, success: false, err: true }))
    // }

    return null

    // return <SaveAndCancelBtns saveBtnTxt={saveBtnText} cancelBtnTxt={"Cancel"} handleSave={handleUpdate} updateStatus={updateStatus}
    //                           redirectLink={redirectLink} isUpdate/>;
}

export default UpdateDocumentField
