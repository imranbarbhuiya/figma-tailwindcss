import { TailwindConverter } from 'css-to-tailwindcss';

const converter = new TailwindConverter({
	remInPx: 16
});

figma.codegen.on('generate', async (e) => {
	const node = e.node;

	const cssObj = await node.getCSSAsync();

	console.log(cssObj);

	const css = Object.entries(cssObj)
		.map(([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, '').trim()};`)
		.join('\n');

	console.log(css);

	const { nodes } = await converter.convertCSS(`
    div {
        ${css}
    }
    `);

	const parentCss = nodes[0].tailwindClasses.join(' ');

	return [
		{
			title: 'tailwindcss',
			code: parentCss,
			language: 'HTML'
		}
	];
});
