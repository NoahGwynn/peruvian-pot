import {db} from "firebaseConfig";


//// Get Doc(s) from db with query ////
export function getDocsByQuery(collection, queryKey, queryOperator, queryValue) {
    return new Promise(function (resolve, reject) {
        db.collection(collection)
            .where(queryKey, queryOperator, queryValue)
            .get()
            .then((snapshot) => {
                let dataArray = [];
                snapshot.docs.forEach(doc => {
                    dataArray.push(doc.data())
                })
                resolve(dataArray)
            })
            .catch(err => {
                reject(Error("Error: ", err))
            })
    })
}


//get single doc from db - with doc ID
export const getDocById = (collection, docId) => new Promise((async (resolve, reject) => {
    const cityRef = db.collection(collection).doc(docId);
    const doc = await cityRef.get();
    if (!doc.exists) {
        reject('No such document!')
    } else {
        resolve(doc.data())
    }
}));


//// Get data from db ////
export function getAllDocs(collection) {
    return new Promise(function (resolve, reject) {
        db.collection(collection)
            .get()
            .then((snapshot) => {
                let dataArray = [];
                snapshot.docs.forEach(doc => {
                    dataArray.push(doc.data())
                })
                resolve(dataArray)
            })
            .catch(err => {
                reject(Error("Error: ", err))
            })
    })
}


//// Update single field in an existing doc in a collection ////
export function updateData(collection, docId, keyToUpdate, valueToUpdate) {

    db.collection(collection)
        .doc(docId)
        .update(keyToUpdate, valueToUpdate)
        .then(res => {
        })
        .catch(reason => {
        })

}


//// Set data to db ////
export function setData(collection, docId, dataObj) {
    return new Promise((resolve, reject) => {
        db.collection(collection)
            .doc(docId)
            .set(dataObj)
            .then(res => {
                resolve([true, res])
            })
            .catch(reason => {
                reject([false, reason])
            })
    })
}


//// Delete data to db ////
export function deleteData(collection, docId) {
    db.collection(collection)
        .doc(docId)
        .delete()
        .then((snapshot) => {
            console.log("delete request to db complete")
        })
}