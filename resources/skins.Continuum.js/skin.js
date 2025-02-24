const languageButton = require( './languageButton.js' ),
	pinnableElement = require( './pinnableElement.js' ),
	searchToggle = require( './searchToggle.js' ),
	echo = require( './echo.js' ),
	initExperiment = require( './AB.js' ),
	ABTestConfig = require( /** @type {string} */ ( './activeABTest.json' ) ),
	initSearchLoader = require( './searchLoader.js' ).initSearchLoader,
	portletsManager = require( './portlets.js' ),
	dropdownMenus = require( './dropdownMenus.js' ).dropdownMenus,
	tables = require( './tables.js' ).init,
	watchstar = require( './watchstar.js' ).init,
	setupIntersectionObservers = require( './setupIntersectionObservers.js' ),
	menuTabs = require( './menuTabs.js' ),
	userPreferences = require( './userPreferences.js' ),
	{ isNightModeGadgetEnabled, disableNightModeForGadget, alterExclusionMessage, removeBetaNotice } = require( './disableNightModeIfGadget.js' ),
	teleportTarget = /** @type {HTMLElement} */require( /** @type {string} */ ( 'mediawiki.page.ready' ) ).teleportTarget;

/**
 * Wait for first paint before calling this function. That's its whole purpose.
 *
 * Some CSS animations and transitions are "disabled" by default as a workaround to this old Chrome
 * bug, https://bugs.chromium.org/p/chromium/issues/detail?id=332189, which otherwise causes them to
 * render in their terminal state on page load. By adding the `continuum-animations-ready` class to the
 * `html` root element **after** first paint, the animation selectors suddenly match causing the
 * animations to become "enabled" when they will work properly. A similar pattern is used in Minerva
 * (see T234570#5779890, T246419).
 *
 * Example usage in Less:
 *
 * ```less
 * .foo {
 *     color: #f00;
 *     transform: translateX( -100% );
 * }
 *
 * // This transition will be disabled initially for JavaScript users. It will never be enabled for
 * // non-JavaScript users.
 * .continuum-animations-ready .foo {
 *     transition: transform 100ms ease-out;
 * }
 * ```
 *
 * @param {Document} document
 * @return {void}
 */
function enableCssAnimations( document ) {
	document.documentElement.classList.add( 'continuum-animations-ready' );
}

/**
 * @param {Window} window
 * @return {void}
 */
function main( window ) {
	enableCssAnimations( window.document );
	initSearchLoader( document );
	languageButton();
	echo();
	portletsManager.main();
	watchstar();
	// Initialize the search toggle for the main header only. The sticky header
	// toggle is initialized after Codex search loads.
	const searchToggleElement = document.querySelector( '.mw-header .search-toggle' );
	if ( searchToggleElement ) {
		searchToggle( searchToggleElement );
	}
	pinnableElement.initPinnableElement();
	// Initializes the TOC and sticky header, behaviour of which depend on scroll behaviour.
	setupIntersectionObservers.main();
	// Apply body styles to teleported elements
	teleportTarget.classList.add( 'continuum-body' );

	// Load client preferences
	const appearanceMenuSelector = '#continuum-appearance';
	const appearanceMenuExists = document.querySelectorAll( appearanceMenuSelector ).length > 0;
	if ( appearanceMenuExists ) {
		mw.loader.using( [
			'skins.continuum.clientPreferences',
			'skins.continuum.search.codex.styles'
		] ).then( () => {
			const clientPreferences = require( /** @type {string} */ ( 'skins.continuum.clientPreferences' ) );
			const clientPreferenceConfig = ( require( './clientPreferences.json' ) );
			// Can be removed once wgContinuumNightMode is removed.
			if ( document.documentElement.classList.contains( 'continuum-feature-night-mode-disabled' ) ) {
				// @ts-ignore issues relating to delete operator are not relevant here.
				delete clientPreferenceConfig[ 'skin-theme' ];
			}

			// while we're in beta, temporarily check if the night mode gadget is installed and
			// disable our night mode if so
			if ( isNightModeGadgetEnabled() ) {
				disableNightModeForGadget();
				clientPreferences.render(
					appearanceMenuSelector, clientPreferenceConfig, userPreferences
				);
				alterExclusionMessage();
				removeBetaNotice();
			} else {
				clientPreferences.render(
					appearanceMenuSelector, clientPreferenceConfig, userPreferences
				);
			}
		} );
	}

	dropdownMenus();
	// menuTabs should follow `dropdownMenus` as that can move menu items from a
	// tab menu to a dropdown.
	menuTabs();
	tables();
}

/**
 * @param {Window} window
 * @return {void}
 */
function init( window ) {
	const now = mw.now();
	// This is the earliest time we can run JS for users (and bucket anonymous
	// users for A/B tests).
	// Where the browser supports it, for a 10% sample of users
	// we record a value to give us a sense of the expected delay in running A/B tests or
	// disabling JS features. This will inform us on various things including what to expect
	// with regards to delay while running A/B tests to anonymous users.
	// When EventLogging is not available this will reject.
	// This code can be removed by the end of the Desktop improvements project.
	// https://www.mediawiki.org/wiki/Desktop_improvements
	mw.loader.using( 'ext.eventLogging' ).then( () => {
		if (
			mw.eventLog &&
			mw.eventLog.eventInSample( 100 /* 1 in 100 */ ) &&
			window.performance &&
			window.performance.timing &&
			window.performance.timing.navigationStart
		) {
			mw.track( 'timing.Continuum.ready', now - window.performance.timing.navigationStart ); // milliseconds
		}
	} );
}

init( window );
if ( ABTestConfig.enabled && !mw.user.isAnon() ) {
	initExperiment( ABTestConfig, String( mw.user.getId() ) );
}
if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
	main( window );
} else {
	// This is needed when document.readyState === 'loading'.
	document.addEventListener( 'DOMContentLoaded', () => {
		main( window );
	} );
}

// Provider of skins.continuum.js module:
/**
 * skins.continuum.js
 *
 * @stable for use inside WikimediaEvents ONLY.
 */
module.exports = { pinnableElement };

mw.loader.using(['mediawiki.util', 'mediawiki.user'], function () {
    console.log("Continuum JS Loaded ✅");

    // Apply User Preferences
    const applyTheme = () => {
        mw.user.getOptions().then(options => {
            const theme = options.get('continuum-theme') || 'day';

            // Remove existing theme classes
            document.body.classList.remove('continuum-day', 'continuum-night', 'continuum-os', 'continuum-light', 'continuum-medium');

            // Apply new theme
            document.body.classList.add(`continuum-${theme}`);
            console.log(`Applied Continuum theme: ${theme}`);
        });
    };

    // Run on page load
    $(document).ready(function () {
        applyTheme();
    });

    // Listen for preference changes (if applicable)
    mw.hook('user.options').add(applyTheme);
});

