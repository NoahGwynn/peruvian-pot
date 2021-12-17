export const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const createId = (title) => {
    return title.toLowerCase().replaceAll(" ", "-").replace(/[`~!@#$%^&*£()<>+_|=?;:'",.{}[\]\\/]/gi, '');
}

export const createUserId = () => {
    return (new Date().getTime() / 1000).toString().replace(".", "");
}


// Get id for image uploads & fetches
export function getFileId(fileUrl) {
    return fileUrl
        .replace("https://firebasestorage.googleapis.com/", "")
        .replace("v0/b/", "")
        .replace("my-website-56acd", "")
        .replace(".appspot.com/o", "")
        .replace(new RegExp("/", 'g'), "")
        .replace("?", "")
        .replace(new RegExp("=", 'g'), "")
        .replace("media&token", "")
        .replace(new RegExp("%2F", 'g'), "")
}