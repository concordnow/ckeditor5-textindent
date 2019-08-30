import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { getData as getViewData } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import TextIndent from './../src/textindent';

describe( 'TextIndent', () => {
	let editor, model, doc;

	testUtils.createSinonSandbox();

	afterEach( () => {
		if ( editor ) {
			return editor.destroy();
		}
	} );

	it( 'defines plugin name', () => {
		expect( TextIndent.pluginName ).to.equal( 'TextIndent' );
	} );

	describe( 'conversion', () => {
		beforeEach( () => {
			return VirtualTestEditor
				.create( {
					plugins: [ Paragraph, TextIndent ],
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
	} );
} );
