module.exports = {
	plugins: ['preact-i18n'],
	rules: {
		'preact-i18n/no-missing-template-field': 'error',
		'preact-i18n/no-text-as-attribute': 'error',
		// Ignore some characters, possibly surrounded by whitespace
		'preact-i18n/no-text-as-children': [
			'error',
			{ ignoreTextRegex: '^(?:\\s*[()🚩.":<>\\-/]\\s*)*$' }
		],
		'preact-i18n/no-unknown-key': 'error'
	},
	settings: {
		'preact-i18n': {
			languageFiles: [
				{
					name: 'en_US',
					path: 'src/intl/en_US.json'
				}
			],
			textComponents: [
				{ nameRegex: '^Text$' },
				{ nameRegex: '^TextInput$', id: 'placeholderId' },
				{ nameRegex: '^AlignedLabel$', id: 'textId' },
				{ nameRegex: '^(?:Inline)?Modal(?:Dialog|Drawer)', id: 'title' },
				{ nameRegex: '^ContactSuggestion$', id: 'previouslySelectedLabel' }
			]
		}
	}
};
