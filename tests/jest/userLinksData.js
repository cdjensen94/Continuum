const mustache = require( 'mustache' );
const fs = require( 'fs' );
const menuContents = fs.readFileSync( 'includes/templates/MenuContents.mustache', 'utf8' );
const userLinksTemplate = fs.readFileSync( 'includes/templates/UserLinks.mustache', 'utf8' );
const userLinksDropdownTemplate = fs.readFileSync( 'includes/templates/UserLinksDropdown.mustache', 'utf8' );
const dropdownOpenTemplate = fs.readFileSync( 'includes/templates/Dropdown/Open.mustache', 'utf8' );
const dropdownCloseTemplate = fs.readFileSync( 'includes/templates/Dropdown/Close.mustache', 'utf8' );
const pinnedContainerOpenTemplate = fs.readFileSync( 'includes/templates/PinnableContainer/Pinned/Open.mustache', 'utf8' );
const pinnedContainerCloseTemplate = fs.readFileSync( 'includes/templates/PinnableContainer/Close.mustache', 'utf8' );
const unpinnedContainerOpenTemplate = fs.readFileSync( 'includes/templates/PinnableContainer/Unpinned/Open.mustache', 'utf8' );
const pinnableElementOpenTemplate = fs.readFileSync( 'includes/templates/PinnableElement/Open.mustache', 'utf8' );
const pinnableElementCloseTemplate = fs.readFileSync( 'includes/templates/PinnableElement/Close.mustache', 'utf8' );
const pinnableHeaderTemplate = fs.readFileSync( 'includes/templates/PinnableHeader.mustache', 'utf8' );
const menuTemplate = fs.readFileSync( 'includes/templates/Menu.mustache', 'utf8' );
const linkTemplate = fs.readFileSync( 'includes/templates/Link.mustache', 'utf8' );

const templateData = {
	'is-wide': false,
	'data-user-links-notifications': {
		id: 'p-personal-notifications',
		class: '',
		'html-items': `<li id="pt-notifications-alert" class="mw-list-item"><a href="/wiki/Special:Notifications" class="mw-echo-notifications-badge mw-echo-notification-badge-nojs oo-ui-icon-bell mw-echo-notifications-badge-all-read" data-counter-num="0" data-counter-text="0" title="Your alerts"><span>Alerts (0)</span></a></li>
		<li id="pt-notifications-notice" class="mw-list-item"><a href="/wiki/Special:Notifications" class="mw-echo-notifications-badge mw-echo-notification-badge-nojs oo-ui-icon-tray mw-echo-notifications-badge-all-read" data-counter-num="0" data-counter-text="0" title="Your notices"><span>Notices (0)</span></a></li>`
	},
	'data-user-links-preferences': {
		id: 'p-personal-preferences',
		class: '',
		'html-items': '<li id="ca-uls" class="user-links-collapsible-item mw-list-item active"><a href="#" class="uls-trigger cdx-button cdx-button--weight-quiet"><span class="continuum-icon mw-ui-icon-wikimedia-language"></span> <span>English</span></a></li>'
	},
	'data-user-links-user-page': {
		id: 'p-personal-user-page',
		class: '',
		'html-items': '<li id="pt-userpage-2" class="user-links-collapsible-item mw-list-item"><a href="/wiki/User:Admin" class="cdx-button cdx-button--weight-quiet" title="Your user page [⌃⌥.]" accesskey="."><span>Admin</span></a></li>'
	},
	'data-user-links-overflow': {
		id: 'p-personal-more',
		class: 'mw-portlet mw-portlet-continuum-user-menu-overflow continuum-user-menu-overflow',
		label: 'Toggle sidebar',
		'html-items': `
			<li id="pt-watchlist-2" class="user-links-collapsible-item mw-list-item"><a href="/wiki/Special:Watchlist" class="cdx-button cdx-button--weight-quiet continuum-icon cdx-button--icon-only mw-ui-icon-watchlist mw-ui-icon-wikimedia-watchlist" title="A list of pages you are monitoring for changes [⌃⌥l]" accesskey="l"><span>Watchlist</span></a></li>
		`
	},
	'data-user-links-dropdown': {
		id: 'continuum-user-links-dropdown',
		class: 'continuum-user-menu continuum-user-menu-logged-in',
		label: 'Personal tools'
	},
	'data-user-links-menus': [ {
		class: 'mw-portlet mw-portlet-personal',
		id: 'p-personal',
		'html-items': `
			<li id="pt-userpage" class="user-links-collapsible-item mw-list-item"><a href="/wiki/User:Admin" title="Your user page [.]" accesskey="."><span class="continuum-icon mw-ui-icon-userAvatar mw-ui-icon-wikimedia-userAvatar"></span> <span>Admin</span></a></li>
			<li id="pt-mytalk" class="mw-list-item"><a href="/wiki/User_talk:Admin" title="Your talk page [n]" accesskey="n"><span class="continuum-icon mw-ui-icon-userTalk mw-ui-icon-wikimedia-userTalk"></span> <span>Talk</span></a></li>
			<li id="pt-sandbox" class="new mw-list-item"><a href="/w/index.php?title=User:Admin/sandbox&amp;action=edit&amp;redlink=1" title="Your sandbox (page does not exist)"><span class="continuum-icon mw-ui-icon-sandbox mw-ui-icon-wikimedia-sandbox"></span> <span>Sandbox</span></a></li>
			<li id="pt-preferences" class="mw-list-item"><a href="/wiki/Special:Preferences" title="Your preferences"><span class="continuum-icon mw-ui-icon-appearance mw-ui-icon-wikimedia-appearance"></span> <span>Preferences</span></a></li>
			<li id="pt-betafeatures" class="mw-list-item"><a href="/wiki/Special:Preferences#mw-prefsection-betafeatures" title="Beta features"><span class="continuum-icon mw-ui-icon-labFlask mw-ui-icon-wikimedia-labFlask"></span> <span>Beta</span></a></li>
			<li id="pt-watchlist" class="user-links-collapsible-item mw-list-item"><a href="/wiki/Special:Watchlist" title="A list of pages you are monitoring for changes [l]" accesskey="l"><span class="continuum-icon mw-ui-icon-watchlist mw-ui-icon-wikimedia-watchlist"></span> <span>Watchlist</span></a></li>
			<li id="pt-uploads" class="mw-list-item"><a href="/w/index.php?title=Special:ListFiles/Admin&amp;ilshowall=1" title="List of files you have uploaded"><span class="continuum-icon mw-ui-icon-imageGallery mw-ui-icon-wikimedia-imageGallery"></span> <span>Uploads</span></a></li>
			<li id="pt-mycontris" class="mw-list-item"><a href="/wiki/Special:Contributions/Admin" title="A list of your contributions [y]" accesskey="y"><span class="continuum-icon mw-ui-icon-userContributions mw-ui-icon-wikimedia-userContributions"></span> <span>Contributions</span></a></li>
			<li id="pt-custom" class="mw-list-item mw-list-item-js">Gadget added item</li>
		`
	}, {
		id: 'p-user-menu-logout',
		class: 'mw-portlet mw-portlet-user-menu-logout',
		'html-items': `
			<li id="ca-logout" class="mw-list-item"><a data-mw="interface" href="/w/index.php?title=Special:UserLogout&amp;returnto=Main+Page" title="Log out"><span class="continuum-icon mw-ui-icon-logOut mw-ui-icon-wikimedia-logOut"></span> <span>Log out</span></a></li>
		`
	} ]
};

const dropdownPartials = {
	UserLinksDropdown: userLinksDropdownTemplate,
	'Dropdown/Open': dropdownOpenTemplate,
	'Dropdown/Close': dropdownCloseTemplate,
	'PinnableContainer/Pinned/Open': pinnedContainerOpenTemplate,
	'PinnableContainer/Close': pinnedContainerCloseTemplate,
	'PinnableContainer/Unpinned/Open': unpinnedContainerOpenTemplate,
	'PinnableElement/Open': pinnableElementOpenTemplate,
	'PinnableElement/Close': pinnableElementCloseTemplate,
	PinnableHeader: pinnableHeaderTemplate,
	Menu: menuTemplate,
	MenuContents: menuContents,
	Link: linkTemplate
};

const renderedHTML = mustache.render( userLinksTemplate, templateData, dropdownPartials );

module.exports = {
	dropdownPartials,
	userLinksHTML: renderedHTML
};
