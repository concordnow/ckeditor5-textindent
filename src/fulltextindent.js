import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { getRoundedValues } from './utils';

export default class FullTextIndent extends Plugin {
	static get pluginName() {
		return 'FullTextIndent';
	}

	init() {
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				styles: {
					'margin': /[\s\S]+/
				}
			},
			model: {
				key: 'customMargin',
				value: viewElement => {
					return getRoundedValues( viewElement.getStyle( 'margin' ) );
				}
			}
		} );

		conversion.for( 'downcast' ).attributeToAttribute( {
			model: 'customMargin',
			view: modelAttributeValue => {
				if ( !modelAttributeValue ) {
					return;
				}
				return {
					key: 'style',
					value: {
						'margin': modelAttributeValue.join( 'px ' ) + 'px'
					}
				};
			}
		} );
	}
}
