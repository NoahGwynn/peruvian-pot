import React from 'react';
import { Link } from "react-router-dom";

function DesktopNav() {
    return (
        <div className={"nav-links"}>
            <Link to={"/admin/home-intro"}>Home Intro</Link>
            <Link to={"/admin/recipes"}>Recipes</Link>
        </div>
    );
}

export default DesktopNav;