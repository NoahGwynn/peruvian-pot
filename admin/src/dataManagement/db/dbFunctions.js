import axios from 'axios'

//get single doc from db - with doc ID
export const fetchById = (path, id) => new Promise((async (resolve, reject) => {
    axios.get(`${path}/${id}`)
        .then(res => resolve(res))
        .catch(err => {
            console.log(err);
            reject(err)
        })
}));


//// Get all data from db collection ////
export function fetchAll(path) {
    return new Promise(function (resolve, reject) {
        axios.get(path)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err);
                reject(err)
            })
    })
}


//// Set data to db ////
export function postData(path, data) {
    console.log(path, data);
    return new Promise(function (resolve, reject) {
        axios.post(path, data)
            .then(res => resolve(res))
            .catch(err => {
                console.log(err);
                reject(err)
            })
    })
}


//// Delete data by ID ////
export function deleteData(path, docId) {
    return new Promise(function (resolve, reject) {
        axios.delete(path, docId)
            .then(res => resolve(res))
            .catch(err => {
                console.log(err);
                reject(err)
            })
    })
}