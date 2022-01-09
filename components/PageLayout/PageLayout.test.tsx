import { render, screen } from '@testing-library/react';
import PageLayout from '.';
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

describe('Component <PageLayout />', () => {
	it('Renders on screen', () => {
		render(
			<AppProvider>
				<PageLayout head='test head'>
					<p>hola</p>
				</PageLayout>
			</AppProvider>
		);
		const container = screen.getByRole('main');
		expect(container).toBeInTheDocument();
	});

	it('Render the children it receives', () => {
		render(
			<AppProvider>
				<PageLayout head='test head'>
					<h1>Hello</h1>
					<h2>Hello</h2>
					<div>
						<h3>Hello</h3>
					</div>
				</PageLayout>
			</AppProvider>
		);
		const titles = screen.getAllByRole('heading');
		expect(titles.length).toBe(4);
	});
});
