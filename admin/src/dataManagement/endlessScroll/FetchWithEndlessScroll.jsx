import React, {useContext, useEffect, useState} from 'react';
import DbDataContext from "../../providers/DbDataContext";
import ImOnScreen from "../../components/siteTools/ImOnScreen";
import {endlessScrollReducer} from "./endlessScrollReducers";
import {ENDLESS_SCROLL_CONFIG, FORCE_REFETCH_TIME, DOC_FETCH_QUANTITY} from "./endlessScrollConstants";

function FetchWithEndlessScroll({currentPageDocs, setCurrentPageDocs, type, children}) {
    // Fetch control / ImOnScreen div states:
    const [fetchNext, setFetchNext] = useState(false);
    const [stopFetch, setStopFetch] = useState(false);

    //Start After doc (orderBy field)
    const [startAfter, setStartAfter] = useState(null);
    //Doc field to set as startAfter - doc field same as query ".orderBy()"
    const startAfterField = ENDLESS_SCROLL_CONFIG[type].orderBy

    // Endless Scroll Context
    const contextData = useContext(DbDataContext)
    // Current saved docs in context
    const contextDocs = contextData.dbFetchedData[type]
    // Set fetched docs & timeout to context
    const setDbFetchedData = contextData.setDbFetchedData
    // Current Page timout value
    const contextTimeout = contextData.dbFetchedData[`${type}Timeout`]
    

    useEffect(() => {
        // If docs in current page doc array
        // (So is not on page load)
        if (currentPageDocs[0]) {
            // Update context with page docs
            setDbFetchedData(prevState => {
                return {...prevState, [type]: currentPageDocs}
            })
        } else if (((new Date() - contextTimeout) / 1000) < (FORCE_REFETCH_TIME * 60)) {
            // Else, (On page load)
            // set page docs with context docs
            setCurrentPageDocs(contextDocs)
            // Set startAfter as last doc in context docs
            contextDocs[0] && contextDocs[0][startAfterField] && setStartAfter(contextDocs[contextDocs.length - 1][startAfterField])
        }
    }, [startAfter])

    useEffect(() => {
        if (fetchNext) {
            endlessScroll({type, startAfter})
                .then(docs => {
                    // console.log("GETTING DOCS: ", type, startAfter, docs)
                    setCurrentPageDocs(prevState => [...prevState, ...docs])
                    docs[0] ? setStartAfter(docs[docs.length - 1][startAfterField]) : setStopFetch(true)
                    if (docs.length < DOC_FETCH_QUANTITY) setStopFetch(true)
                    setDbFetchedData(prevState => {
                        return {...prevState, [`${type}Timeout`]: new Date()}
                    })
                })
        }
    }, [fetchNext])


// Main Function
    const endlessScroll = async (action) => {
        let snap = await endlessScrollReducer(action)
        let docsArr = [];
        snap.docs.forEach(doc => docsArr.push(doc.data()))
        return docsArr
    }

    return <>
        {children}
        <ImOnScreen setOnScreenState={[fetchNext, setFetchNext]} showLoader={!stopFetch}/>
    </>
}

export default FetchWithEndlessScroll;