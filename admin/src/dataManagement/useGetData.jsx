// import {useEffect, useState} from 'react';
// import {getDocById, getDocsByQuery} from "./firebase/dbFunctions";

function useGetData({ collection, byId = false, id, byQuery = false, query }) {
    // const [data, setData] = useState(null);
    // const [err, setErr] = useState(null);
    // useEffect(() => {
    //     if (byId) {
    //         getDocById()
    //             .then(doc => setData(doc))
    //             .catch(err => setErr(err))
    //     } else if (byQuery) {
    //         getDocsByQuery(collection, query.key, query.operator, query.value)
    //             .then(docs => setData(docs))
    //             .catch(err => setErr(err))
    //     }
    // }, [])

    // if (err) return { err: true, data: err }
    // return { err: false, data: data };
    return null
}

export default useGetData;
