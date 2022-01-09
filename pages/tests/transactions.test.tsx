import { render, screen } from '@testing-library/react';
import Transactions from '../index';
import { AppProvider } from '../../context';

Object.defineProperty(window, 'fetch', {
	value: jest.fn(() => Promise.resolve({ json: () => ({}) })),
});

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
