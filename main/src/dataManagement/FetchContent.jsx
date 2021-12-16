//Get content from dataManagement page content data
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";

import {
    dataAuth, dataBanner, dataEvents, dataFooter,
    dataGeneral, dataMessage, dataNews, dataPolicies
} from "./actions/contentActions";

import AlertMessage from "./components/AlertMessage";
import Loader from "./components/Loader";


//// Fetch data from API (db) with Redux

// TYPE = Component

//  1. {contentState}
//  ! Content useState array. Initial state set with the db contentId as the keys.
//  -> const [content, setContent] = useState({
//         contentId: "",
//         contentId: [],
//     })

//  2. {page}
//  ! Page name, needs to be same as page name in db.

//  4. >children<

export function FetchContent({
                                 contentState,
                                 table,
                                 conditions = "none",
                                 showLoader = true,
                                 spinnerLoader = false,
                                 children
                             }) {
    const dispatch = useDispatch()
    const {loading, error, pageContent} = useSelector(state =>
        table === "Banner" ? state.bannerData :
            table === "message" ? state.messageData :
                table === "events" ? state.eventsData :
                    table === "news" ? state.newsData :
                        table === "auth" ? state.authData :
                            table === "general" ? state.generalData :
                                table === "footer" ? state.footerData :
                                    table === "policies" ? state.policiesData :
                                        null
    )


    useEffect(() => {
        switch (table) {
            case "Banner":
                dispatch(dataBanner(table, conditions))
                break;
            case "footer":
                dispatch(dataFooter(table, conditions))
                break;
            case "message":
                dispatch(dataMessage())
                break;
            case "events":
                dispatch(dataEvents(table, conditions))
                break;
            case "news":
                dispatch(dataNews(table, conditions))
                break;
            case "auth":
                dispatch(dataAuth(table, conditions))
                break;
            case "general":
                dispatch(dataGeneral(table, conditions))
                break;
            case "policies":
                dispatch(dataPolicies(table, conditions))
                break;
        }
    }, [dispatch])

    useEffect(() => {
        !loading && setPageContent(pageContent, contentState[1])
    }, [loading])

    return (
        <>
            {loading ? <Loader showLoader={showLoader} spinner={spinnerLoader}/> : error ?
                <AlertMessage variant="danger">{error}</AlertMessage> :
                <>
                    {children}
                </>
            }
        </>
    );
}

//Helper for UseGetData (above exported function)
function setPageContent(pageContent, setContent) {

    if (pageContent) {

        let content = []
        Object.keys(pageContent).forEach(function (key) {
            content.push(pageContent[key])
        });
        setContent(content)
    }
}
