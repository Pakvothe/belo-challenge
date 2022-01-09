import { render, screen } from '@testing-library/react';
import MyApp from '../index';
import { AppProvider } from '../../context';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
	route: '/',
	pathname: '',
	query: '',
	asPath: '',
	push: jest.fn(),
	events: {
		on: jest.fn(),
		off: jest.fn(),
	},
	beforePopState: jest.fn(() => null),
	prefetch: jest.fn(() => null),
}));

describe('Component <MyApp />', () => {
	it('The entire application is rendered', () => {
		render(
			<AppProvider>
				<MyApp />
			</AppProvider>
		);
		const components = screen.getAllByRole('link');
		expect(components.length).toBe(4);
	});
});
