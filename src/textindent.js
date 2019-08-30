import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { getRoundedValue } from './utils';

export default class TextIndent extends Plugin {
	static get pluginName() {
		return 'TextIndent';
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const conversion = editor.conversion;

		const knownElements = [ 'paragraph', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6' ];

		knownElements.forEach( elementName => {
			if ( schema.isRegistered( elementName ) ) {
				schema.extend( elementName, { allowAttributes: 'textIndent' } );
			}
		} );

		conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				styles: {
					'text-indent': /[\s\S]+/
				}
			},
			model: {
				key: 'textIndent',
				value: viewElement => getRoundedValue( viewElement.getStyle( 'text-indent' ) )
			}
		} );

		conversion.for( 'downcast' ).attributeToAttribute( {
			model: 'textIndent',
			view: modelAttributeValue => {
				return {
					key: 'style',
					value: {
						'text-indent': modelAttributeValue + 'px'
					}
				};
			}
		} );
	}
}
