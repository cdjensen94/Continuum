/** @module search */

const
	Vue = require( 'vue' ),
	App = require( './App.vue' ),
	config = require( './config.json' );

/**
 * @param {Element} searchBox
 * @return {void}
 */
function initApp( searchBox ) {
	const searchForm = searchBox.querySelector( '.cdx-search-input' ),
		titleInput = /** @type {HTMLInputElement|null} */ (
			searchBox.querySelector( 'input[name=title]' )
		),
		search = /** @type {HTMLInputElement|null} */ ( searchBox.querySelector( 'input[name=search]' ) ),
		searchPageTitle = titleInput && titleInput.value,
		searchContainer = searchBox.querySelector( '.continuum-typeahead-search-container' );

	if ( !searchForm || !search || !titleInput ) {
		throw new Error( 'Attempted to create Vue search element from an incompatible element.' );
	}

	// @ts-ignore MediaWiki-specific function
	Vue.createMwApp(
		App, Object.assign( {
			id: searchForm.id,
			autocapitalizeValue: search.getAttribute( 'autocapitalize' ),
			autofocusInput: search === document.activeElement,
			action: searchForm.getAttribute( 'action' ),
			searchAccessKey: search.getAttribute( 'accessKey' ),
			searchPageTitle: searchPageTitle,
			searchTitle: search.getAttribute( 'title' ),
			searchPlaceholder: search.getAttribute( 'placeholder' ),
			searchQuery: search.value,
			autoExpandWidth: searchBox ? searchBox.classList.contains( 'continuum-search-box-auto-expand-width' ) : false
		// Pass additional config from server.
		}, config )
	)
		.mount( searchContainer );
}
/**
 * @param {Document} document
 * @return {void}
 */
function main( document ) {
	document.querySelectorAll( '.continuum-search-box' )
		.forEach( initApp );
}
main( document );
