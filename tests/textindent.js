import TextIndent from './../src/textindent';
import HorizontalTextIndent from './../src/horizontaltextindent';
import VerticalTextIndent from './../src/verticaltextindent';

describe( 'TextIndent', () => {
	it( 'requires HorizontalTextIndent and VerticalTextIndent', () => {
		expect( TextIndent.requires ).to.deep.equal( [ HorizontalTextIndent, VerticalTextIndent ] );
	} );

	it( 'defines plugin name', () => {
		expect( TextIndent.pluginName ).to.equal( 'TextIndent' );
	} );
} );
