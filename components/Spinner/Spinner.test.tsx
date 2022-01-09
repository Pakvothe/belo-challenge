import { render, screen } from '@testing-library/react';
import Spinner from '.';

describe('Component <Spinner />', () => {
	it('Renders on screen', () => {
		render(<Spinner text='Loading...' />);
		const title = screen.getByRole('heading');
		expect(title).toBeInTheDocument();
	});

	it('Allows you to pass text through props', () => {
		render(<Spinner text='Loading...' />);
		const title = screen.getByText('Loading...');
		expect(title).toBeInTheDocument();
	});
});
