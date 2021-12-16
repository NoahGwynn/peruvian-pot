import {db} from "../firebaseConfig";
import {ENDLESS_SCROLL_CONFIG, DOC_FETCH_QUANTITY} from "./endlessScrollConstants";

const endlessScrollConfig = ENDLESS_SCROLL_CONFIG


//FETCH ACTIONS:

// Events
export const eventsFetch = (startAfter) => {
    if (startAfter) {
        return db.collection("events")
            .where("online", "==", true)
            .where("expiryUTC", ">", new Date())
            .orderBy(endlessScrollConfig.events.orderBy, "asc")
            .startAfter(startAfter)
            .limit(DOC_FETCH_QUANTITY)
            .get()
            .then((snap) => snap)
    } else {
        return db.collection("events")
            .where("online", "==", true)
            .where("expiryUTC", ">", new Date())
            .orderBy(endlessScrollConfig.events.orderBy, "asc")
            .limit(DOC_FETCH_QUANTITY)
            .get()
            .then((snap) => snap)
    }
}

// Past Events
export const pastEventsFetch = (startAfter) => {
    if (startAfter) {
        return db.collection("events")
            .where("online", "==", true)
            .where("expiryUTC", "<", new Date())
            .orderBy(endlessScrollConfig.pastEvents.orderBy, "desc")
            .startAfter(startAfter)
            .limit(DOC_FETCH_QUANTITY)
            .get()
            .then((snap) => snap)
    } else {
        return db.collection("events")
            .where("online", "==", true)
            .where("expiryUTC", "<", new Date())
            .orderBy(endlessScrollConfig.pastEvents.orderBy, "desc")
            .limit(DOC_FETCH_QUANTITY)
            .get()
            .then((snap) => snap)
    }
}

//News
export const newsFetch = (startAfter) => {
    if (startAfter) {
        return db.collection("news")
            .where("online", "==", true)
            .orderBy(endlessScrollConfig.news.orderBy, "desc")
            .startAfter(startAfter)
            .limit(DOC_FETCH_QUANTITY)
            .get()
            .then((snap) => snap)
    } else {
        return db.collection("news")
            .where("online", "==", true)
            .orderBy(endlessScrollConfig.news.orderBy, "desc")
            .limit(DOC_FETCH_QUANTITY)
            .get()
            .then((snap) => snap)
    }
}