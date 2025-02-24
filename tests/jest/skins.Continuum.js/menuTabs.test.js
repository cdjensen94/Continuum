const menuTabs = require( '../../../resources/skins.continuum.js/menuTabs.js' );

describe( 'menuTabs', () => {
	beforeEach( () => {
		/** @type {Function} */
		let callback;
		jest.spyOn( mw, 'hook' ).mockImplementation( () => ( {
			add: function ( fn ) {
				callback = fn;

				return this;
			},
			fire: ( data ) => {
				if ( callback ) {
					callback( data );
				}
			}
		} ) );

	} );

	afterEach( () => {
		jest.restoreAllMocks();
	} );

	test( 'adds continuum-tab-noicon class to li element when part of tabs', () => {
		document.body.innerHTML = `
				<div id="p-views" class="continuum-menu mw-portlet mw-portlet-views continuum-menu-tabs">
					<div class="continuum-menu-content">
						<ul class="continuum-menu-content-list">
							<li class="mw-list-item mw-list-item-js" id="test-id">
								<a href="#test-href">
									<span>
										test link content
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
		`;
		const menuItem = document.getElementById( 'test-id' );
		menuTabs();
		mw.hook( 'util' ).fire( menuItem, { id: 'test-id' } );

		expect( document.body.innerHTML ).toMatchSnapshot();
	} );

	test( 'does not add continuum-tab-noicon class to li element when not part of tabs', () => {
		document.body.innerHTML = `
			<div id="p-variants" class="continuum-menu mw-portlet mw-portlet-variants">
				<div class="continuum-menu-content">
					<ul class="continuum-menu-content-list">
						<li class="mw-list-item mw-list-item-js" id="test-id">
							<a href="#test-href">
								<span>
									test link content
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		`;
		const menuItem = document.getElementById( 'test-id' );
		menuTabs();
		mw.hook( 'util' ).fire( menuItem, { id: 'test-id' } );

		expect( document.body.innerHTML ).toMatchSnapshot();
	} );
} );
