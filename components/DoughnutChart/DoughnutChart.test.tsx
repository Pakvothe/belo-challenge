import { render, screen } from '@testing-library/react';
import { AppProvider } from '../../context';
import DoughnutChart from '.';

Object.defineProperty(window, 'fetch', {
	value: jest.fn(() => Promise.resolve({ json: () => ({}) })),
});

describe('Component <DoughnutChart />', () => {
	it('Renders on screen', () => {
		render(
			<AppProvider>
				<DoughnutChart
					btcBalance={2}
					ethBalance={2}
					usdtBalance={2}
					daiBalance={2}
					usdcBalance={2}
				/>
			</AppProvider>
		);
		const renders = screen.getByRole('img');
		expect(renders).toBeInTheDocument();
	});
});
