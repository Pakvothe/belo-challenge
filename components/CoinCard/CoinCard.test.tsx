import { render, screen } from '@testing-library/react';
import { AppProvider } from '../../context';
import CoinCard from '.';

Object.defineProperty(window, 'fetch', {
	value: jest.fn(() => Promise.resolve({ json: () => ({}) })),
});

describe('Component <CoinCard />', () => {
	it('Renders on screen', () => {
		render(
			<AppProvider>
				<CoinCard
					icon='/test-file-stub'
					symbol=''
					name=''
					price={0}
					priceChange={0}
					transaction={false}
					buy={false}
				/>
			</AppProvider>
		);
		const title = screen.getByRole('article');
		expect(title).toBeInTheDocument();
	});
});
