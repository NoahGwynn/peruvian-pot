import React from 'react';
import DesktopNav from "./DesktopNav";
import ScreenContainer from "../blocks/ScreenContainer";

function Header() {
    return (
        <div className={"header"}>
            <ScreenContainer>
                <div className={"logo"}>
                    <h1>Peruvian Pot</h1>
                </div>
                <div className={"nav-links"}>
                    <DesktopNav/>
                </div>
            </ScreenContainer>
        </div>
    );
}

export default Header;