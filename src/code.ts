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

	const { convertedRoot, nodes } = await converter.convertCSS(`
    div {
        ${css}
    }
    `);

	return [
		{
			title: 'tailwindcss',
			code: nodes[0].tailwindClasses.join(' '),
			language: 'HTML'
		},
		{
			title: 'css',
			code: convertedRoot.toString(),
			language: 'CSS'
		}
	];
});
