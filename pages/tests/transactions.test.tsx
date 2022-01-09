import { render, screen } from '@testing-library/react';
import Transactions from '../index';
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

describe('Component <Transactions />', () => {
	it('Renders on screen', () => {
		render(
			<AppProvider>
				<Transactions />
			</AppProvider>
		);
		const LoadSpinner = screen.getByText('Loading...');
		expect(LoadSpinner).toBeInTheDocument();
	});
});
