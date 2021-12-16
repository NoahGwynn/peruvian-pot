import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import ScrollToTop from "./components/siteTools/ScrollToTop";

//Components
import Footer from "./components/blocks/Footer";
import Header from "./components/header/Header";

//Screens
import Home from "./screens/Home";

function App() {


    return (
        <>
            <ScrollToTop />

            <Header />

            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/hi" component={<p>Hi</p>} exact />
                <Redirect to={"/"}>
                    <Route path={"*"} />
                </Redirect>
            </Switch>

            <Footer />

            {/*<SiteCookieConsent/>*/}
        </>
    );
}

export default App;

