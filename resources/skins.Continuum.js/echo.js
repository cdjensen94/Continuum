/**
 * Upgrades Echo for icon consistency.
 * Undos work inside Echo to replace our button.
 */
function init() {
	if ( document.querySelectorAll( '#pt-notifications-alert a, #pt-notifications-notice a' ).length !== 2 ) {
		return;
	}

	mw.hook( 'ext.echo.NotificationBadgeWidget.onInitialize' ).add( ( badge ) => {
		const element = badge.$element[ 0 ];
		element.classList.add( 'mw-list-item' );
		const anchor = /** @type {HTMLElement} */ ( element.querySelector( 'a' ) );
		anchor.classList.add(
			'cdx-button',
			'cdx-button--weight-quiet',
			'cdx-button--icon-only',
			'cdx-button--fake-button',
			'cdx-button--fake-button--enabled'
		);
		// Icon classes shouldn't go on the same element as button classes
		// However this cant be avoided due to Echo button's implementation
		// which directly sets the contents of the anchor element every update
		// which would clear out any icon children that we define
		if ( element.id === 'pt-notifications-alert' ) {
			anchor.classList.add( 'continuum-icon' );
		}
		if ( element.id === 'pt-notifications-notice' ) {
			anchor.classList.add( 'continuum-icon' );
		}
		// Workaround T343838
		anchor.classList.add( 'skin-invert' );
	} );
}

module.exports = init;
