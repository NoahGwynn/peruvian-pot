import React, { useEffect, useState } from 'react';
import { Accordion, Col, Image, Row, Spinner } from "react-bootstrap";
import { deleteFile } from "./ImageHelpers";

function ImageMapper({ propTrain, renderCountState }) {
    const [imageUrls] = propTrain.imageUrlsState
    const [selectedImg, setSelectedImg] = propTrain.selectedImgState
    const [rerenderCount, setRerenderCount] = useState(0)
    const directory = propTrain.directory
    const [imagesStatus, setImagesStatus] = propTrain.imagesStatusState

    useEffect(() => {
        let n;
        let x = 0;

        function rerender() { // set rerender count to force rerender
            n = imageUrls.length
            setRerenderCount(n)
        }

        let renderInterval = setInterval(() => {
            if (n !== imageUrls.length) {
                rerender()
            }
            if (x++ === 10) {
                clearInterval(renderInterval)
            }
            n = imageUrls.length
        }, 900)
    }, [imageUrls])

    // console.log(imageUrls)


    return (
        <div className={"d-flex flex-wrap"}>
            {imagesStatus.loading ?
                <Spinner className="spinner" animation="border" style={{
                    width: "2rem",
                    height: "2rem",
                    margin: "2rem",
                }} />
                :
                !imagesStatus.foundImages ? <p>No images found</p>
                    :
                    imageUrls.map((img, index) => {
                        return (
                            <span key={index + rerenderCount}>
                                <span key={index} className={"p-1 d-flex border-red border-thin position-relative"}
                                    style={{
                                        flexDirection: "column",
                                        maxWidth: "11rem",
                                        margin: ".4rem",
                                        outline: selectedImg && img === selectedImg && "solid 3px #FF9605"
                                    }}
                                >
                                    <Image fluid thumbnail src={img}
                                        className={"mb-2"} style={{ backgroundColor: "#bdbdbd" }} alt={img} />

                                    <Row className={"mt-auto"}>
                                        <Col xs={12}>
                                            <button
                                                onClick={(e) => setSelectedImg(img)}
                                                className={"scbtn--small scbtn--1 text-small w-100 p-0 mb-1"}>
                                                Select
                                            </button>


                                            <Accordion defaultActiveKey="0" className={"position-relative"}>
                                                <Accordion.Toggle eventKey="1"
                                                    className={"sc-red-btn text-small w-100"}
                                                    onClick={(e) => e.currentTarget.blur()}
                                                >
                                                    Delete
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="1"
                                                    className={"position-absolute z-index-front border border-danger background-colour"}
                                                    style={{ zIndex: "5" }}
                                                >
                                                    <div className={"p-3"}>
                                                        <small
                                                            className={"d-inline-block mb-1 mr-1 text-small text-danger"}>
                                                            Delete this image?
                                                        </small>
                                                        <button
                                                            onClick={() => {
                                                                setImagesStatus({ loading: true, foundImages: false })
                                                                deleteFile(directory, img).then(() => renderCountState[1](renderCountState[0] + 1))
                                                            }}
                                                            id={img}
                                                            className={"scbtn--small sc-red-btn px-0"}>
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </Accordion.Collapse>
                                            </Accordion>
                                        </Col>
                                    </Row>


                                    {/*todo: notifications for delete and upload success / fail*/}
                                    {/*<ToastNotification header={deleteSuccess ? "Éxito" : "Fallar"}*/}
                                    {/*                   body={deleteSuccess ? "La imagen se ha eliminado correctamente" : "\n" +*/}
                                    {/*                       "Se produjo un error al intentar eliminar la imagen. Inténtalo de nuevo."}*/}
                                    {/*                   showState={[showNotify, setShowNotify]}*/}
                                    {/*                   className={deleteSuccess ? "notifications__success" : "notifications__fail"}/>*/}

                                </span>
                            </span>

                        )
                    })}
        </div>
    );
}

export default ImageMapper;