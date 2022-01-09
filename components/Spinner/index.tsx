const Spinner = ({ text }: IProps) => {
	return (
		<div className='flex flex-col items-center my-auto mx-auto'>
			<div className='Spinner' />
			{text && <h2 className='text-lg font-bold text-gray-500'>{text}</h2>}
		</div>
	);
};

export default Spinner;

interface IProps {
	text: string;
}
