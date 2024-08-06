import { TailwindConverter } from 'css-to-tailwindcss';

const converter = new TailwindConverter({
	remInPx: 16,
	arbitraryPropertiesIsEnabled: true
});

export const cssToTailwind = async (cssObj: Record<string, string>, ignoreFields: string[]) => {
	if (ignoreFields.length) {
		for (const field of ignoreFields) {
			if (field.includes('=')) {
				const [key, value] = field.split('=');
				if (cssObj[key] === value) {
					delete cssObj[key];
				}
			} else delete cssObj[field];
		}
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
