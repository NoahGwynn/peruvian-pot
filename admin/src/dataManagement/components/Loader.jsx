import React from 'react'
import {Spinner} from "react-bootstrap";

function Loader({show = true}) {
    return (
        <>
            {show && <>
                <Spinner animation={"border"} style={styles.loader}/>
            </>}
        </>
    );
}

const styles = {
    loader: {
        borderTopColor: "#fff",
        borderBottomColor: "#fff",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderWidth: "2px",
        animationDuration: "1s",
    },

}

export default Loader
