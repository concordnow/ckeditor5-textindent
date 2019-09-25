import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { getRoundedValue } from './utils';

export default class VerticalTextIndent extends Plugin {
	static get pluginName() {
		return 'VerticalTextIndent';
	}

	init() {
		const conversion = this.editor.conversion;

		const margins = [
			[ 'marginTop', 'margin-top' ],
			[ 'marginBottom', 'margin-bottom' ]
		];

		const marginsMap = new Map( margins );

		marginsMap.forEach( ( mapValue, mapKey ) => {
			conversion.for( 'upcast' ).attributeToAttribute( {
				view: {
					name: 'p',
					styles: {
						[ mapValue ]: /[\s\S]+/
					}
				},
				model: {
					key: mapKey,
					value: viewElement => getRoundedValue( viewElement.getStyle( mapValue ) )
				}
			} );

			conversion.for( 'downcast' ).attributeToAttribute( {
				model: mapKey,
				view: modelAttributeValue => {
					return {
						key: 'style',
						value: {
							[ mapValue ]: modelAttributeValue + 'px'
						}
					};
				}
			} );
		} );
	}
}
