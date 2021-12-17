import React from 'react';
import { Link } from "react-router-dom";

function Recipes() {
    return (
        <>
            <Link to={"/admin/recipes/new"}>
                <button className={"btn-default"} style={styles.newBtn}>New Recipe</button>
            </Link>

        </>
    );
}

const styles = {
    newBtn: {
        position: "absolute",
        right: "0",
        top: "1rem",
    }
}

export default Recipes;