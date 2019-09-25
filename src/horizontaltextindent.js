import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { getRoundedValue } from './utils';

export default class HorizontalTextIndent extends Plugin {
	static get pluginName() {
		return 'HorizontalTextIndent';
	}

	init() {
		const conversion = this.editor.conversion;

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
