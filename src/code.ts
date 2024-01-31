import { cssToTailwind } from './cssToTailwind';

figma.codegen.on('generate', async (e) => {
	const node = e.node;

	const cssObj = await node.getCSSAsync();

	const { className, css } = await cssToTailwind(cssObj);

	return [
		{
			title: 'tailwindcss',
			code: className,
			language: 'HTML'
		},
		{
			title: 'css',
			code: css,
			language: 'CSS'
		}
	];
});
