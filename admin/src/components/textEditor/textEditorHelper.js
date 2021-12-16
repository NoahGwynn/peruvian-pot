import {deleteFile, fetchFileUrls, uploadImage} from "../../dataManagement/files/fileManager";
import {decode, encode} from "html-entities";

// Upload Adapter


export class UploadAdapter {
    constructor(loader, directoryName) {
        this.loader = loader;
        this.dirName = directoryName
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file =>
                new Promise((resolve, reject) => {
                    uploadImage(this.dirName, file)
                        .then((downloadURL) => {
                            resolve({
                                default: downloadURL
                            });
                        })
                        .catch((err) => {
                            console.log("Upload Err: ", err)
                        })
                })
            )
    }
}


//Handle onFocus
export const handleOnFocus = (setTextEditorCleanup, imageDirectory) => {
    setTextEditorCleanup(prevState => {
        return {...prevState, [imageDirectory]: {directory: imageDirectory, finalVal: null}}
    })
}

//Handle onBlur
export const handleOnBlur = async (val, imageDirectory, textEditorCleanup, setTextEditorCleanup) => {
    // Object.keys(textEditorCleanup).forEach((imgPath) => {
    const tempObj = textEditorCleanup[imageDirectory]
    tempObj.finalVal = val
    setTextEditorCleanup(prevState => {
        return {...prevState, [imageDirectory]: tempObj}
    })
    // })
}


// get Image urls in editor
export const findImageSources = (str, tag, attr) => {
    return new Promise(resolve => {
        let regex = new RegExp('<' + tag + ' .*?' + attr + '="(.*?)"', "gi"), result, res = [];
        while ((result = regex.exec(str))) {
            res.push(result[1]);
        }
        resolve(res)
    })
}

//Cleanup helper
const cleanupHelper = (imgPath, textEditorCleanup, setTextEditorCleanup) => {
    return new Promise(async (resolve) => {

        fetchFileUrls(imgPath)
            .then(initialImages => {
                findImageSources(decode(textEditorCleanup[imgPath].finalVal), "img", "src")
                    .then(finalImages => {
                        let difference = initialImages.filter(x => !finalImages.includes(encode(x)));
                        difference.forEach(url => {
                            deleteFile(imgPath, url)
                        })
                        setTextEditorCleanup({})
                        resolve()
                    }).catch(() => resolve())
            }).catch(() => resolve())

    })
}


//Cleanup Function (images)
export const cleanupTextEditorImages = (textEditorCleanup, setTextEditorCleanup) => {
    return new Promise(async (resolve) => {

        let editorPaths = Object.keys(textEditorCleanup)
        let i = 0

        const cleanupDirectories = () => {
            if (editorPaths[i]) {
                let imgPath = editorPaths[i]
                cleanupHelper(imgPath, textEditorCleanup, setTextEditorCleanup)
                    .then(() => {
                        i += 1
                        cleanupDirectories()
                    })
            } else {
                resolve()
            }
        }

        cleanupDirectories()
    })
}