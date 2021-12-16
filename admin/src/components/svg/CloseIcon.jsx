import React from "react";

function Icon({colour}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 200 200">
            <path fill="none" stroke={colour} strokeLinecap="round" strokeWidth="16px" d="M1.36 1.36l198.103 197.829"/>
            <path fill="none" stroke={colour} strokeLinecap="round" strokeWidth="16px" d="M199.19 1.358L1.632 199.19"/>
        </svg>
    );
}

export default Icon;
