import {storage} from "./firebaseConfig";
import {setData} from "./dbFunctions";
import {getFileId} from "../../siteHelper";

export function uploadImage(directoryName, file) {
    return new Promise((resolve, reject) => {
        //Create storage ref
        let storageRef = storage.ref(`/${directoryName}/${file.name}`)
        //Upload file
        let task = storageRef.put(file)
        // state changes
        task.on("state_changed",
            function progress() {
            },
            function error(err) {
                reject(err)
            },
            function complete() {
                storageRef.getDownloadURL()
                    .then((url) => {
                        setData("userDesigns", getFileId(url), {name: file.name})
                            .then(() => resolve(url))
                    })
            }
        )
    })
}