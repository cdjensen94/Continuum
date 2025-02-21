let /** @type {MwApi} */ api;

/**
 * @param {Object<string,string|number>} options
 * @return {JQuery.Promise<Object>}
 */
function saveOptions( options ) {
	api = api || new mw.Api();
	// @ts-ignore
	return api.saveOptions( options, {
		global: 'update'
	} );
}

module.exports = {
	saveOptions
};
/*
$(document).ready(function () {
	mw.loader.using('user.options', function () {
		var selectedTheme = mw.user.options.get('continuum-custom-theme') || 'medium'; // Default if null

		// Apply the theme class to the body
		$('body').addClass('continuum-theme-' + selectedTheme);

		console.log('Current Theme:', selectedTheme); // Debugging
	});
});
*/