import TextIndent from './../src/textindent';
import HorizontalTextIndent from './../src/horizontaltextindent';
import VerticalTextIndent from './../src/verticaltextindent';
import FullTextIndent from './../src/fulltextindent';

describe( 'TextIndent', () => {
	it( 'requires HorizontalTextIndent, VerticalTextIndent and FullTextIndent', () => {
		expect( TextIndent.requires ).to.deep.equal( [ HorizontalTextIndent, VerticalTextIndent, FullTextIndent ] );
	} );

	it( 'defines plugin name', () => {
		expect( TextIndent.pluginName ).to.equal( 'TextIndent' );
	} );
} );
