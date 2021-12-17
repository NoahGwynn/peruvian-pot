import React from 'react';
import DesktopNav from "./DesktopNav";
import ScreenContainer from "../blocks/ScreenContainer";

function Header() {
    // const changeLang = (e) => {
    //     changeLanguage(e.target.value)
    //         .then(() => console.log("Language changed to: ", e.target.value))
    //         .catch(err => console.log("LANG CHANGE ERR: ", err))
    // }
    return (
        <div className={"header"}>
            <ScreenContainer>
                <div className={"logo"}>
                    <h1>Admin - Peruvian Pot</h1>
                </div>

                <DesktopNav/>

                <div className={"language-select"}>
                    {/*<select onChange={changeLang}>*/}
                    {/*    <option value={"en"}>{t("English")}</option>*/}
                    {/*    <option value={"es"}>{t("Spanish")}</option>*/}
                    {/*</select>*/}
                </div>

            </ScreenContainer>
        </div>
    );
}

export default Header;