import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const DoughnutChart = ({ btcBalance, ethBalance, usdtBalance, daiBalance, usdcBalance }: Props) => {
	ChartJS.register(ArcElement, Tooltip, Legend);

	const data = {
		labels: ['Bitcoin', 'Ethereum', 'USDT', 'DAI', 'USDC'],
		datasets: [
			{
				label: '% of currency',
				data: [btcBalance, ethBalance, usdtBalance, daiBalance, usdcBalance],
				backgroundColor: [
					'rgba(255, 206, 86, 0.5)',
					'rgba(54, 162, 235, 0.5)',
					'rgba(75, 192, 192, 0.5)',
					'rgba(255, 159, 64, 0.5)',
					'rgba(153, 102, 255, 0.5)',
				],
				borderColor: [
					'rgba(255, 206, 86, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(153, 102, 255, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return <Doughnut data={data} />;
};

export default DoughnutChart;

interface Props {
	btcBalance: number;
	ethBalance: number;
	usdtBalance: number;
	daiBalance: number;
	usdcBalance: number;
}
