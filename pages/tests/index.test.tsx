import { render, screen } from '@testing-library/react';
import Home from '../index';
import { AppProvider } from '../../context';

Object.defineProperty(window, 'fetch', {
	value: jest.fn(() => Promise.resolve({ json: () => ({}) })),
});

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

describe('Component <Home />', () => {
	it('Renders on screen', () => {
		render(
			<AppProvider>
				<Home />
			</AppProvider>
		);
		const Spinner = screen.getByText('Loading...');
		expect(Spinner).toBeInTheDocument();
	});
});
