// this is in js bcz `babel-loader` doesn't support ts

import { TailwindConverter } from 'css-to-tailwindcss';

const converter = new TailwindConverter({
	remInPx: 16,
	arbitraryPropertiesIsEnabled: true
});

/**
 *
 * @param cssObj {Record<string, string>}
 * @returns
 */
export const cssToTailwind = async (cssObj) => {
	if (cssObj['font-style'] === 'normal') {
		delete cssObj['font-style'];
	}

	const css = Object.entries(cssObj)
		.map(([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, '').trim()};`)
		.join('\n');

	const { convertedRoot, nodes } = await converter.convertCSS(`
    div {
        ${css}
    }
    `);

	const doc = {
		className: nodes[0].tailwindClasses.join(' ').trim(),
		css: convertedRoot.toString()
	};

	return doc;
};
