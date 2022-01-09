import { render, screen } from '@testing-library/react';
import Swap from '../swap';
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

describe('Component <Swap />', () => {
	it('Renders on screen', () => {
		render(
			<AppProvider>
				<Swap />
			</AppProvider>
		);
		const Spinner = screen.getByText('Loading...');
		expect(Spinner).toBeInTheDocument();
	});
});
