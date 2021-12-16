import React from 'react';
import { ImageUploadForm } from "./ImageUploadForm";
import { Modal } from "react-bootstrap";
import ImageMapper from "./ImageMapper";
import { getFileName } from "./ImageHelpers";

//todo: 1. When upload an image in one model, should appear in another model on same page
//todo 2. Name for model depending on what library it is.


// Library Modal:
function LibraryModal({ propTrain, renderCountState }) {
    //Train Props
    const [showModal, setShowModal] = propTrain.showModalState
    const [selectedImg] = propTrain.selectedImgState
    const handleImageChoice = propTrain.imageChoiceFunc
    const mapIndex = propTrain.mapIndex
    const directory = propTrain.directory


    return (
        <Modal
            style={{ background: "#00000060", zIndex: 99999 }}
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Image Library
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <ImageUploadForm directoryName={directory} renderCountState={renderCountState} />

                <ImageMapper propTrain={propTrain} renderCountState={renderCountState} />

            </Modal.Body>
            <Modal.Footer>
                <button className={"scbtn--small scbtn--2"}
                    onClick={() => {
                        let alt = getFileName(selectedImg)
                        handleImageChoice([selectedImg, alt], mapIndex);
                        setShowModal(false);
                    }}
                >
                    Select Image
                </button>
                <button className={"scbtn--small sc-red-btn"} onClick={() => setShowModal(false)}>Cancel</button>
            </Modal.Footer>
        </Modal>
    );
}

export default LibraryModal;