import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { getData as getViewData } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import TextIndent from './../src/textindent';
import VerticalTextIndent from './../src/verticaltextindent';
import { getRoundedValue } from '../src/utils';

describe( 'VerticalTextIndent', () => {
	let editor, model, doc;

	testUtils.createSinonSandbox();

	afterEach( () => {
		if ( editor ) {
			return editor.destroy();
		}
	} );

	it( 'defines plugin name', () => {
		expect( VerticalTextIndent.pluginName ).to.equal( 'VerticalTextIndent' );
	} );

	describe( 'conversion', () => {
		beforeEach( () => {
			return VirtualTestEditor
				.create( {
					plugins: [ Paragraph, TextIndent, VerticalTextIndent ],
				} )
				.then( newEditor => {
					editor = newEditor;
					model = editor.model;
					doc = model.document;
				} );
		} );

		it( 'should keep margin-top in paragraph', () => {
			editor.setData( '<p style="margin-top:24px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'customMarginTop' ) ).to.be.true;
			expect( paragraph.getAttribute( 'customMarginTop' ) ).to.equal( 24 );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="margin-top:24px">foo</p>' );
		} );

		it( 'should keep negative margin-top in paragraph', () => {
			editor.setData( '<p style="margin-top:-24px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'customMarginTop' ) ).to.be.true;
			expect( paragraph.getAttribute( 'customMarginTop' ) ).to.equal( -24 );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="margin-top:-24px">foo</p>' );
		} );

		it( 'should convert pt in px and keep margin-top in paragraph', () => {
			editor.setData( '<p style="margin-top:24pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const convertedValue = getRoundedValue( '24pt' );

			expect( paragraph.hasAttribute( 'customMarginTop' ) ).to.be.true;
			expect( paragraph.getAttribute( 'customMarginTop' ) ).to.equal( convertedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( `<p style="margin-top:${ convertedValue }px">foo</p>` );
		} );

		it( 'should convert pt in px and keep negative margin-top in paragraph', () => {
			editor.setData( '<p style="margin-top:-24pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const convertedValue = getRoundedValue( '-24pt' );

			expect( paragraph.hasAttribute( 'customMarginTop' ) ).to.be.true;
			expect( paragraph.getAttribute( 'customMarginTop' ) ).to.equal( convertedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( `<p style="margin-top:${ convertedValue }px">foo</p>` );
		} );

		it( 'should keep margin-bottom in paragraph', () => {
			editor.setData( '<p style="margin-bottom:24px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'customMarginBottom' ) ).to.be.true;
			expect( paragraph.getAttribute( 'customMarginBottom' ) ).to.equal( 24 );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="margin-bottom:24px">foo</p>' );
		} );

		it( 'should keep negative margin-bottom in paragraph', () => {
			editor.setData( '<p style="margin-bottom:-24px;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );

			expect( paragraph.hasAttribute( 'customMarginBottom' ) ).to.be.true;
			expect( paragraph.getAttribute( 'customMarginBottom' ) ).to.equal( -24 );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( '<p style="margin-bottom:-24px">foo</p>' );
		} );

		it( 'should convert pt in px and keep margin-bottom in paragraph', () => {
			editor.setData( '<p style="margin-bottom:24pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const convertedValue = getRoundedValue( '24pt' );

			expect( paragraph.hasAttribute( 'customMarginBottom' ) ).to.be.true;
			expect( paragraph.getAttribute( 'customMarginBottom' ) ).to.equal( convertedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( `<p style="margin-bottom:${ convertedValue }px">foo</p>` );
		} );

		it( 'should convert pt in px and keep negative margin-bottom in paragraph', () => {
			editor.setData( '<p style="margin-bottom:-24pt;">foo</p>' );

			const paragraph = doc.getRoot().getChild( 0 );
			const convertedValue = getRoundedValue( '-24pt' );

			expect( paragraph.hasAttribute( 'customMarginBottom' ) ).to.be.true;
			expect( paragraph.getAttribute( 'customMarginBottom' ) ).to.equal( convertedValue );

			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( `<p style="margin-bottom:${ convertedValue }px">foo</p>` );
		} );
	} );
} );
