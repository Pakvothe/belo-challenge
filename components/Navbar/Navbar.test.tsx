import Navbar from '.';
import { AppProvider } from '../../context';
import { render, screen, act } from '@testing-library/react';

Object.defineProperty(window, 'fetch', {
	value: jest.fn(() => Promise.resolve({ json: () => ({}) })),
});

describe('Component <Navbar />', () => {
	it('Renders on screen', () => {
		act(() => {
			render(
				<AppProvider>
					<Navbar />
				</AppProvider>
			);
		});
		const title = screen.getByText('Belo Challenge');
		expect(title).toBeInTheDocument();
	});

	it('Has menu and darkmode button', () => {
		act(() => {
			render(
				<AppProvider>
					<Navbar />
				</AppProvider>
			);
		});
		const [button1, button2] = screen.getAllByRole('button');
		expect(button1).toBeInTheDocument();
		expect(button2).toBeInTheDocument();
	});
});
