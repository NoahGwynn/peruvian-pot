/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

class Editor extends InlineEditor {
}

// Plugins to include in the build.
Editor.builtinPlugins = [
    Alignment,
    AutoLink,
    Bold,
    CKFinderUploadAdapter,
    Essentials,
    Heading,
    HorizontalLine,
    Indent,
    Italic,
    Link,
    PageBreak,
    Paragraph,
    RemoveFormat,
    SpecialCharacters,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersText,
    TextTransformation,
    Underline
];

// Editor configuration.
Editor.defaultConfig = {
    toolbar: {
        items: ['heading', '|', 'bold', 'italic', 'underline', 'removeFormat', '|', 'alignment', 'outdent', 'indent', '|', 'horizontalLine', 'pageBreak', '|', 'specialCharacters', 'link', 'undo', 'redo']
    },
    language: 'en-gb'
};

export default Editor;
