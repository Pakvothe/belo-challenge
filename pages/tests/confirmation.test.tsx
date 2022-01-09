import { render, screen } from '@testing-library/react';
import Confirmation from '../confirmation';
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

describe('Component <Confirmation />', () => {
	it('Renders on screen', () => {
		render(
			<AppProvider>
				<Confirmation />
			</AppProvider>
		);
		const EmptyTransactionText = screen.getByText('There are no ongoing transactions');
		expect(EmptyTransactionText).toBeInTheDocument();
	});
});
