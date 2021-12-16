export const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// HEX to RGBA
export function hexToRgba(hex) {
    let r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16), alpha = parseInt(hex.slice(7), 16)
    if (alpha === 0 || alpha) {
        return "rgba(" + r + "," + g + "," + b + "," + parseFloat((alpha / 255).toFixed(3)) + ")";
    } else {
        return "rgba(" + r + "," + g + "," + b + ", 1)";
    }
}

// RGBA to Hex colour
export function rgbaToHex(val, opacity = null) {
    let rgba = val.replace("rgba(", "").replace(")", "").split(",")
    let r = (+rgba[0]).toString(16), g = (+rgba[1]).toString(16), b = (+rgba[2]).toString(16), a = Math.round(+rgba[3] * 255).toString(16);
    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;
    if (a.length === 1) a = "0" + a;
    if (opacity) a = opacity
    return "#" + r + g + b + a;
}

// Check if colour is bright or dark
export const colourBrightnessCheck = (colour, threshold = 110) => {
    const hex = colour.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > threshold;
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