import React from "react";
import {Toast} from "react-bootstrap";


function ToastNotification({header, body, showState, className, autoHide = true, delay = 4000}) {
    return (
        <div className={"position-fixed ml-auto w-25"}
             style={{zIndex: "999", bottom: "2rem", right: "2rem"}}>
            <Toast onClose={() => showState[1](false)} show={showState[0]} delay={delay} autohide={autoHide}
                   className={className}>
                <Toast.Header>
                    <strong className="mr-auto">{header}</strong>
                    {/*<small>11 mins ago</small>*/}
                </Toast.Header>
                <Toast.Body>{body}</Toast.Body>
            </Toast>
        </div>
    );
}

export default ToastNotification