import React, {useContext} from 'react';
import DesignContext from "../../dataManagement/providers/DesignContext";

//// Page title

// 1. {title}
// ! title text

function PageTitle({title}) {
    const {designValues: {font, colour}} = useContext(DesignContext)

    return (
        <div className={"w-100 d-flex justify-content-center"} style={styles.container}>
            <h1 className={" " + font.titles}
                style={{color: colour.nav}}>{title}</h1>
        </div>
    );
}

const styles = {
    container: {
        margin: "10rem auto 5rem"
    }
}

export default PageTitle;