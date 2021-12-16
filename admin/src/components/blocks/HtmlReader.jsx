import React from 'react';
import {decode} from "html-entities";

function HtmlReader({htmlContent, classNames}) {
    return (
        <div className={classNames + " data-from-editor"} dangerouslySetInnerHTML={{__html: decode(htmlContent)}}/>);
}

export default HtmlReader;