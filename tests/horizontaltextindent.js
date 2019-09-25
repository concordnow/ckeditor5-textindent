import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { getData as getViewData } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import TextIndent from './../src/textindent';
import HorizontalTextIndent from './../src/horizontaltextindent';
import { getRoundedValue } from '../src/utils';

describe( 'HorizontalTextIndent', () => {
	let editor, model, doc;

	testUtils.createSinonSandbox();

	afterEach( () => {
		if ( editor ) {
			return editor.destroy();
		}
	} );

	it( 'defines plugin name', () => {
		expect( HorizontalTextIndent.pluginName ).to.equal( 'HorizontalTextIndent' );
	} );

	describe( 'conversion', () => {
		beforeEach( () => {
			return VirtualTestEditor
				.create( {
					plugins: [ Paragraph, TextIndent, HorizontalTextIndent ],
				} )
				.then( newEditor => {
					editor = newEditor;
					model = editor.model;
					doc = model.document;
				} );
		} );

		it( 'should keep text-indent in paragraph', () => {
			editor.setData( '<p style="text-indent:24px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'textIndent' ) ).to.be.true;
			expect( paragraph.getAttribute( 'textIndent' ) ).to.equal( 24 );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="text-indent:24px">foo</p>' );
		} );

		it( 'should keep negative text-indent in paragraph', () => {
			editor.setData( '<p style="text-indent:-24px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'textIndent' ) ).to.be.true;
			expect( paragraph.getAttribute( 'textIndent' ) ).to.equal( -24 );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="text-indent:-24px">foo</p>' );
		} );

		it( 'should convert pt in px and keep text-indent in paragraph', () => {
			editor.setData( '<p style="text-indent:24pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const convertedValue = getRoundedValue( '24pt' );

			expect( paragraph.hasAttribute( 'textIndent' ) ).to.be.true;
			expect( paragraph.getAttribute( 'textIndent' ) ).to.equal( convertedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( `<p style="text-indent:${ convertedValue }px">foo</p>` );
		} );

		it( 'should convert pt in px and keep negative text-indent in paragraph', () => {
			editor.setData( '<p style="text-indent:-24pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const convertedValue = getRoundedValue( '-24pt' );

			expect( paragraph.hasAttribute( 'textIndent' ) ).to.be.true;
			expect( paragraph.getAttribute( 'textIndent' ) ).to.equal( convertedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( `<p style="text-indent:${ convertedValue }px">foo</p>` );
		} );
	} );
} );
