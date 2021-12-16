import React from 'react';
import CookieConsent from "react-cookie-consent";
import {Link} from "react-router-dom";

function SiteCookieConsent() {
    return (
        <>
            <CookieConsent
                location="bottom"
                buttonText="Got it"
                cookieName="Skipton-Camerata-Cookie-Consent"
                style={{
                    background: "#fff",
                    color: "#6c757d",
                    fontSize: "2rem",
                    fontFamily: "'Roboto', sans-serif",
                    padding: "1rem",
                    borderTop: "solid 1px #cccccc",
                }}
                buttonStyle={{
                    background: "#ff9605",
                    color: "#ffffff",
                    fontSize: "2.2rem",
                    padding: ".5rem 1.5rem",
                    position: "relative",
                    top: "1rem",
                }}
                expires={365}
            >
                <h5 className={"mb-0 line-height-tight"}>Cookies</h5>
                <p className={"m-0 line-height-tight"}>We use cookies to give you the best experience on our
                    site. <br/> By continuing to use our website you are agreeing to our
                    use of cookies. <Link to={"/cookie-policy"}>Learn More</Link></p>
            </CookieConsent>
        </>
    );
}

export default SiteCookieConsent;