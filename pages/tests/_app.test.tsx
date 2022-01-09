import { render, screen } from '@testing-library/react';
import MyApp from '../index';
import { AppProvider } from '../../context';

describe('Component <MyApp />', () => {
	it('The entire application is rendered', () => {
		render(
			<AppProvider>
				<MyApp />
			</AppProvider>
		);
		const components = screen.getAllByRole('link');
		expect(components.length).toBe(4);
	});
});
