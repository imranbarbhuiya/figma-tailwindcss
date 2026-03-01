import { TailwindConverter } from 'css-to-tailwindcss';

const converter = new TailwindConverter({
	remInPx: 16,
	arbitraryPropertiesIsEnabled: true
});

const normalizeVarSpaces = (value: string): string => {
	let result = '';
	let depth = 0;
	let i = 0;
	while (i < value.length) {
		const char = value[i];
		if (char === '(') {
			depth++;
			result += char;
		} else if (char === ')') {
			depth--;
			result += char;
		} else if (char === ',' && depth > 0) {
			result += ',';
			while (i + 1 < value.length && value[i + 1] === ' ') {
				i++;
			}
		} else {
			result += char;
		}

		i++;
	}

	return result;
};

export const cssToTailwind = async (cssObj: Record<string, string>, ignoreFields: string[] = []) => {
	if (ignoreFields.length) {
		for (const field of ignoreFields) {
			if (field.includes('=')) {
				const [key, value] = field.split('=');
				if (value === '*' && cssObj[key]) {
					delete cssObj[key];
				}

				if (cssObj[key] === value) {
					delete cssObj[key];
				}
			} else delete cssObj[field];
		}
	}

	const css = Object.entries(cssObj)
		.map(([key, value]) => `${key}: ${normalizeVarSpaces(value.replace(/\/\*.*\*\//g, '').trim())};`)
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
