import { describe, expect, test } from 'vitest';
import { cssToTailwind } from '../src/cssToTailwind';

describe('cssToTailwind', () => {
	test('should convert css to tailwind', () => {
		expect(
			cssToTailwind({
				display: 'flex',
				width: '404px',
				height: '336px',
				padding: '68px 16px 16px 16px',
				'flex-direction': 'column',
				'align-items': 'flex-start',
				gap: '64px',
				'flex-shrink': '0'
			})
		).resolves.toMatchSnapshot();
	});

	test('should remove font-style: normal', () => {
		expect(
			cssToTailwind({
				color: 'var(--Primary-A-primary-a-400, #464646)',
				'font-family': 'Montserrat',
				'font-size': '16px',
				'font-style': 'normal',
				'font-weight': '500',
				'line-height': '20px'
			})
		).resolves.toMatchSnapshot();
	});

	test('should remove inline comments', () => {
		expect(
			cssToTailwind({
				color: 'var(--Primary-A-primary-a-400, #464646)',
				'font-family': 'Montserrat',
				'font-size': '16px',
				'font-style': 'normal',
				'font-weight': '500',
				'line-height': '20px /* 125% */'
			})
		).resolves.toMatchSnapshot();
	});

	test('should add bg-color class', () => {
		expect(
			cssToTailwind({
				'border-radius': '12px',
				background: 'var(--Primary-B-primary-b-600, #D1D1D1)'
			})
		).resolves.toMatchSnapshot();
	});
});
