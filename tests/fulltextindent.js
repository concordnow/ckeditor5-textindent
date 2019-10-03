import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { getData as getViewData } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import TextIndent from './../src/textindent';
import FullTextIndent from './../src/fulltextindent';
import { getRoundedValues } from '../src/utils';

describe( 'FullTextIndent', () => {
	let editor, model, doc;

	testUtils.createSinonSandbox();

	afterEach( () => {
		if ( editor ) {
			return editor.destroy();
		}
	} );

	it( 'defines plugin name', () => {
		expect( FullTextIndent.pluginName ).to.equal( 'FullTextIndent' );
	} );

	describe( 'conversion', () => {
		beforeEach( () => {
			return VirtualTestEditor
				.create( {
					plugins: [ Paragraph, TextIndent, FullTextIndent ],
				} )
				.then( newEditor => {
					editor = newEditor;
					model = editor.model;
					doc = model.document;
				} );
		} );

		it( 'should keep margin in paragraph', () => {
			editor.setData( '<p style="margin:24px 8px 12px 6px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'margin' ) ).to.be.true;
			expect( paragraph.getAttribute( 'margin' ) ).to.deep.equal( [ 24, 8, 12, 6 ] );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="margin:24px 8px 12px 6px">foo</p>' );
		} );

		it( 'should keep negative margin in paragraph', () => {
			editor.setData( '<p style="margin:-24px -8px -12px -6px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'margin' ) ).to.be.true;
			expect( paragraph.getAttribute( 'margin' ) ).to.deep.equal( [ -24, -8, -12, -6 ] );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="margin:-24px -8px -12px -6px">foo</p>' );
		} );

		it( 'should convert pt in px and keep margin in paragraph', () => {
			editor.setData( '<p style="margin:24pt 8pt 12pt 6pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const convertedValue = getRoundedValues( '24pt 8pt 12pt 6pt' );

			expect( paragraph.hasAttribute( 'margin' ) ).to.be.true;
			expect( paragraph.getAttribute( 'margin' ) ).to.deep.equal( convertedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="margin:32px 11px 16px 8px">foo</p>' );
		} );

		it( 'should convert pt in px and keep negative margin in paragraph', () => {
			editor.setData( '<p style="margin:-24pt -8pt -12pt -6pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const convertedValue = getRoundedValues( '-24pt -8pt -12pt -6pt' );

			expect( paragraph.hasAttribute( 'margin' ) ).to.be.true;
			expect( paragraph.getAttribute( 'margin' ) ).to.deep.equal( convertedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="margin:-32px -11px -16px -8px">foo</p>' );
		} );
	} );
} );
