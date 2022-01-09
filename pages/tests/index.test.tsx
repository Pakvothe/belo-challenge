import { render, screen } from '@testing-library/react';
import Home from '../index';
import { AppProvider } from '../../context';

Object.defineProperty(window, 'fetch', {
	value: jest.fn(() => Promise.resolve({ json: () => ({}) })),
});

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
