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

		const knownElement = 'paragraph';

		if ( schema.isRegistered( knownElement ) ) {
			schema.extend( knownElement, {
				allowAttributes: [
					'textIndent', 'customMarginLeft', 'customMarginRight', 'customMarginTop', 'customMarginBottom', 'customMargin'
				]
			} );
		}
	}
}
