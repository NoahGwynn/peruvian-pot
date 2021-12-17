import React, { useEffect } from "react";
import { Switch, Route } from 'react-router-dom';
import ScrollToTop from "./components/siteTools/ScrollToTop";
import { postData } from "./dataManagement/db/dbFunctions";

//Components
import Footer from "./components/blocks/Footer";
import Header from "./components/header/Header";

//Screens
import Home from "./screens/Home";
import Recipes from "./screens/Recipes";
// import HomeIntro from "./screens/HomeIntro";
import RecipeEditor from "./screens/RecipeEditor";
import ScreenContainer from "./components/blocks/ScreenContainer";


function App() {
    useEffect(() => {
        postData("/reset-to-main", {})
    }, [])


    return (
        <>
            <ScrollToTop />

            <Header />

            <ScreenContainer>
                <Switch>
                    <Route path="/admin" component={Home} exact />
                    <Route path="/admin/recipes" component={Recipes} exact />
                    <Route path="/admin/recipes/:recipeId" component={RecipeEditor} />
                    {/* <Route path="/admin/home-intro" component={HomeIntro} exact /> */}
                    {/* <Redirect to={"/admin"}>
                        <Route path={"/admin/*"} />
                    </Redirect> */}
                </Switch>
            </ScreenContainer>

            <Footer />

            {/*<SiteCookieConsent/>*/}
        </>
    );
}


export default App;

