import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { getRoundedValue } from './utils';

export default class HorizontalTextIndent extends Plugin {
	static get pluginName() {
		return 'HorizontalTextIndent';
	}

	init() {
		const conversion = this.editor.conversion;

		const horizontalIndents = [
			[ 'textIndent', 'text-indent' ],
			[ 'customMarginLeft', 'margin-left' ],
			[ 'customMarginRight', 'margin-right' ]
		];

		const horizontalIndentsMap = new Map( horizontalIndents );

		horizontalIndentsMap.forEach( ( mapValue, mapKey ) => {
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
