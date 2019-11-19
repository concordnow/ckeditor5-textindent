import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import HorizontalTextIndent from './horizontaltextindent';
import VerticalTextIndent from './verticaltextindent';
import FullTextIndent from './fulltextindent';

export default class TextIndent extends Plugin {
	static get pluginName() {
		return 'TextIndent';
	}

	static get requires() {
		return [ HorizontalTextIndent, VerticalTextIndent, FullTextIndent ];
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		const knownElements = [ 'paragraph', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6' ];

		knownElements.forEach( elementName => {
			if ( schema.isRegistered( elementName ) ) {
				schema.extend( elementName, { allowAttributes: [ 'textIndent', 'marginTop', 'marginBottom', 'customMargin' ] } );
			}
		} );
	}
}
