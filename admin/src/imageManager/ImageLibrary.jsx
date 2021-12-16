import React, { useEffect, useState } from 'react';
import LibraryModal from "./LibraryModal";
import { fetchFileUrls } from "./ImageHelpers"

//  1. {directory}
//  ! Name of directory or bucket images can be found


//  2. {handleImageChoice}
//  ! Function that takes in an array with the image chosen.
// -> [Image, Alt]  // Image in array is the image URL


function ImageLibrary({ directory, handleImageChoice, mapIndex = 0, label = null }) {
    const [showModal, setShowModal] = useState(false);
    const [imageUrls, setImageUrls] = useState([])
    const [imagesStatus, setImagesStatus] = useState({ loading: false, foundImages: false })
    const [fetchError, setFetchError] = useState(null)
    const [renderCount, setRenderCount] = useState(0)
    const [selectedImg, setSelectedImg] = useState("")

    let propTrain = {
        showModalState: [showModal, setShowModal],
        imageUrlsState: [imageUrls, setImageUrls],
        fetchErrorState: [fetchError, setFetchError],
        selectedImgState: [selectedImg, setSelectedImg],
        imageChoiceFunc: handleImageChoice,
        mapIndex: mapIndex,
        directory: directory,
        imagesStatusState: [imagesStatus, setImagesStatus],
    }

    // Fetch Image URLS
    useEffect(() => {
        setImagesStatus({ loading: true, foundImages: false })
        fetchFileUrls(directory)
            .then(urls => {
                setImageUrls(urls)
                setImagesStatus({ loading: false, foundImages: urls.length !== 0 })
            })
            .catch((err) => setFetchError(err))
    }, [renderCount, showModal])

    return (
        <div>
            <div>{label && <label className={"mb-1"}>{label}</label>}</div>
            <button onClick={() => setShowModal(true)}
                className={"scbtn--1 scbtn--small"} type={"button"} style={{ height: "3.7rem", fontSize: "1.6rem" }}
                onClickCapture={(e) => e.currentTarget.blur()}>
                Choose Image
            </button>
            <LibraryModal propTrain={propTrain} renderCountState={[renderCount, setRenderCount]} />
        </div>
    );
}

export default ImageLibrary;