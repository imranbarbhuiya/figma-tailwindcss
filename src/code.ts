import { cssToTailwind } from './cssToTailwind';

let ignoreFields = 'font-style=normal';

figma.codegen.on('generate', async (e) => {
	const node = e.node;

	const cssObj = await node.getCSSAsync();

	const { className, css } = await cssToTailwind(
		cssObj,
		ignoreFields.split(',').map((field) => field.trim())
	);

	return [
		{
			title: 'tailwindcss',
			code: className,
			language: 'CSS'
		},
		{
			title: 'css',
			code: css,
			language: 'CSS'
		}
	];
});

figma.codegen.on('preferenceschange', async (e) => {
	if (e.propertyName !== 'ignoreFields') return;

	figma.showUI(
		`
		<div>
			<h1>Ignore Fields</h1>
			<p>Enter the fields you want to ignore separated by comma. You can add a value using <kbd>key=value</kbd> format to ignore a field only when this field matches the value</p>
			<input type="text" value="${ignoreFields}" id="ignoreFields" />
			<button id="save" onclick="parent.postMessage({ pluginMessage: { type: 'save', ignoreFields: document.getElementById('ignoreFields').value } }, '*')">Save</button>
		</div>
		`,
		{ visible: true }
	);
});

figma.ui.onmessage = (message) => {
	if (message.type === 'save') {
		ignoreFields = message.ignoreFields;
		figma.notify('Ignore fields updated');
		figma.ui.close();
		figma.codegen.refresh();
	}
};
