import { render, screen } from '@testing-library/react';
import Sidebar from '.';
import { AppProvider } from '../../context';

Object.defineProperty(window, 'fetch', {
	value: jest.fn(() => Promise.resolve({ json: () => ({}) })),
});

describe('Component <Sidebar />', () => {
	it('Renders on screen', () => {
		render(
			<AppProvider>
				<Sidebar />
			</AppProvider>
		);
		const Portfolio = screen.getByText('My portfolio');
		expect(Portfolio).toBeInTheDocument();
	});

	it('Has 3 navigate links', () => {
		render(
			<AppProvider>
				<Sidebar />
			</AppProvider>
		);
		const [anchor1, anchor2, anchor3] = screen.getAllByRole('link');
		expect(anchor1).toBeInTheDocument();
		expect(anchor2).toBeInTheDocument();
		expect(anchor3).toBeInTheDocument();
	});
});
