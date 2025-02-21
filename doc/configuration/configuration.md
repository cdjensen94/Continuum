# Continuum Configuration Options and User Preferences

For documentation on Minerva preferences and configuration options see [https://github.com/wikimedia/mediawiki-skins-MinervaNeue/blob/master/README.md](https://github.com/wikimedia/mediawiki-skins-MinervaNeue/blob/master/README.md)

## Topics

[Using Query Parameters](#using-query-parameters)

[Configuration Options Glossary](#configuration-options-glossary)

[Developer Only Configuration](#developer-only-configuration-temporary)

[Site-level Configuration](#site-level-configuration)

[User Preference Options Glossary](#user-preference-options-glossary)

## Using Query Parameters

Query parameters can be used to override user preferences and/or configuration within Continuum.  We typically use these during development to aid testing and perform community outreach. They are not intended to be used by standard users and should always be considered temporary.

The following are examples of query parameter usage:

In the URL:

- https://en.wikipedia.beta.wmflabs.org/wiki/Spain?continuummainmenupinned=0

- https://en.wikipedia.beta.wmflabs.org/wiki/Spain?continuummainmenupinned=1

- https://en.wikipedia.beta.wmflabs.org/wiki/Spain?continuumpagetoolspinned=0

- https://en.wikipedia.beta.wmflabs.org/wiki/Spain?continuumpagetoolspinned=1

Note: There is currently a bug relating to certain querystring parameters which is documented in [https://phabricator.wikimedia.org/T347900](https://phabricator.wikimedia.org/T347900)


## Configuration Options Glossary

Each option controls specific aspects of the Continuum skin's behavior and appearance, and some are configurable per-wiki to accommodate diverse preferences and requirements.

The following explains each configuration option in the `InitialiseSettings.php` file from the `mediawiki-config` repo:


## Developer-only Configuration (Temporary)

Certain configuration is used by us during rollout of new features with the expectation that they will later be removed. At times temporary configuration may become Site-level configuration if new requirements emerge post-deployment.

Do not rely on any of the feature flags documented here. They should not be considered stable.

- wgContinuumPromoteAddTopic

  - Determines whether the Add topic feature is promoted in discussions.

  - Default: `false`

  - Removal ticket: [https://phabricator.wikimedia.org/T331312](https://phabricator.wikimedia.org/T331312)

- wgContinuumDefaultSkinVersionForExistingAccounts

  - Sets the default skin version for existing accounts in Continuum skin. Exists to assist roll out of desktop improvements project.

  - Default: `'2'`

  - `legacy-continuum` set to `'1'`.

  - Removal ticket:  [https://phabricator.wikimedia.org/T358273](https://phabricator.wikimedia.org/T358273)

- wgContinuumDefaultSkinVersionForNewAccounts

  - Sets the default skin version for new accounts in Continuum skin. Exists to assist roll out of desktop improvements project.

  - Default: `'2'`

  - `legacy-continuum` set to `'1'`.

  - Removal ticket: [https://phabricator.wikimedia.org/T358273](https://phabricator.wikimedia.org/T358273)

- wgContinuumLanguageInMainPageHeader

  - Shows language selector beside the main page title.

  - Removal ticket: [https://phabricator.wikimedia.org/T179159](https://phabricator.wikimedia.org/T179159)

- wgContinuumNightMode

  - Enables the night mode feature in client preferences

  - Removal ticket: [https://phabricator.wikimedia.org/T179159](https://phabricator.wikimedia.org/T179159)

- wgContinuumResponsive

  - Enables an experimental responsive version of the Continuum 20 skin.

  - Removal ticket: [https://phabricator.wikimedia.org/T106463](https://phabricator.wikimedia.org/T106463)

- wgContinuumWebABTestEnrollment

  - Configures web A/B test enrollment for the Continuum skin. This is intended to only be used by developers, as it requires writing associated code.

  - Specifies experiment details and sampling rates.

  - Note: The assumption is that A/B testing will always be occurring in this skin so would never be removed unlike the other flags.

- wgContinuumWrapTablesTemporary
   - When enabled, certain tables will be wrapped in a div to make them horizontally scrollable when no
     space is available.
  - Removal ticket: [https://phabricator.wikimedia.org/T361737](https://phabricator.wikimedia.org/T361737)

## Site-level Configuration

Different projects have different needs, so some configuration on the site level is necessary. Site level configuration should be considered permanent and removing configuration should be carefully managed and based on usage.

- wgContinuumTableOfContentsCollapseAtCount

  - Sets the number of sections at which the Table of Contents collapses.

  - Default: `28`

- wgContinuumMaxWidthOptions

  - Configures maximum width options for the Continuum skin.

  - Defines exclusions and inclusions for specific pages.

- wgContinuumLanguageInHeader

  - Controls language display in the header for the Continuum skin. When disabled languaged appear in the sidebar.

  - Configurable for different wikis. This is currently used on projects like Wikimedia Commons, MediaWiki and Wikidata which do not have separate language sites.

- wgContinuumWvuiSearchOptions

  - Configures search options for the Continuum skin.

  - Includes thumbnail and description display.

- wgContinuumSearchApiUrl

  - Allows site to specify an alternative API for search queries. If not set uses default MediaWiki search. Mostly used for development purposes.

## User Preference Options Glossary

The following are interface elements or settings that users can customize within the Continuum skin, such as toggling night mode, adjusting the width of the content area, or changing the font size.

- Continuum Limited Width (`continuum-limited-width`): This preference allows the user to specify whether they prefer a limited width It can be set to either 1 (enabled) or 0 (disabled), which will stretch the article body to full width.

- Continuum Page Tools Pinned (`continuum-page-tools-pinned`): Indicates whether the user wants the page tools menu to be pinned (visible) to the right of the content body. It can be set to either 1 (pinned) or 0 (not pinned).

- Continuum Main Menu Pinned (`continuum-main-menu-pinned`): Specifies whether the user prefers to have the main menu pinned (visible) to the left of the content body. It can be set to either 1 (pinned) or 0 (not pinned).

- Continuum Table of Contents (TOC) Pinned (`continuum-toc-pinned`): Determines if the user wants the table of contents on the left side to be pinned (visible) on desktop. It can be set to either 1 (pinned) or 0 (not pinned).

- Continuum Appearance Pinned (`continuum-appearance-pinned`): Indicates whether the user wants the appearance menu to be pinned (visible) on desktop. It can be set to either 1 (pinned) or 0 (not pinned).

- Continuum Font Size (`continuum-font-size`): Allows the user to select the preferred font size for the Continuum. It can be set to 0 for regular, 1 for large, or 2 for x-large.

- Continuum Night Mode (`continuum-theme`): Specifies the preference for night mode in Continuum. It can be set to 'day' for (disabled), 'night' (enabled), and 'os' (automatic based on system preferences). For logged in users this feature can be forced on via the ?continuumnightmode=night or ?continuumnightmode=1 query string parameter.
