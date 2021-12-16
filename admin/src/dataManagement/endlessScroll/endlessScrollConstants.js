// ENDLESS SCROLL CONSTANTS


export const ENDLESS_SCROLL_CONFIG = {
    pastEvents: {orderBy: "expiryUTC"},
    events: {orderBy: "expiryUTC"},
    news: {orderBy: "datePublished"},
}

// Timout after last fetch before must re-fetch all docs when navigating back to same page.
export const FORCE_REFETCH_TIME = 10 // in minutes

// Quantity of documents to be fetched at a time.
export const DOC_FETCH_QUANTITY = 8