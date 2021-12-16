// REDUCER
import {eventsFetch, newsFetch, pastEventsFetch} from "./endlessScrollActions";

export const endlessScrollReducer = async (action) => {
    switch (action.type) {
        //Events
        case "events":
            return await eventsFetch(action.startAfter)
        // Past Events
        case "pastEvents":
            return await pastEventsFetch(action.startAfter)
        //News
        case "news":
            return await newsFetch(action.startAfter)
        default:
            return []
    }
}