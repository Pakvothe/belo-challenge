import { useAppContext } from '../context';
import { useEffect, useState } from 'react';
import CoinCard from '../components/CoinCard';
import PageLayout from '../components/PageLayout';

const Transactions = () => {
	const [transactionSwitch, setTransactionSwitch] = useState(false);
	const { buyTransactions, shellTransactions } = useAppContext();
	const [noTransactions, setNoTransactions] = useState(false);
	let shellCount = 0;
	let buyCount = 0;

	const handleSwitch = () => {
		setTransactionSwitch(!transactionSwitch);
	};

	useEffect(() => {
		if (buyTransactions.length > 1 && shellTransactions.length > 1) {
			setNoTransactions(false);
		} else {
			setNoTransactions(true);
		}
	}, []);

	return (
		<PageLayout head='Belo | Confirmation'>
			<section
				className=' flex flex-col items-center w-128 sm:w-80 sm:h-auto mx-auto'
				title='TransactionComponent'
			>
				{!noTransactions ? (
					<button
						className='h-12 my-8 from-blue-500 bg-gradient-to-br to-indigo-500 dark:from-blue-700 dark:to-indigo-700 transition-all p8 w-128 sm:w-80 rounded text-white text-lg hover:ring'
						onClick={() => handleSwitch()}
					>
						{!transactionSwitch ? 'See outputs' : 'See entries'}
					</button>
				) : (
					<h2 className='text-gray-500 my-auto text-2xl'>There are no transactions</h2>
				)}
				{!transactionSwitch
					? buyTransactions.map((buy) => {
							if (buyCount > 0) {
								return (
									<CoinCard
										icon={buy.img}
										symbol={buy.symbol}
										name={buy.date}
										priceChange={buy.hash}
										price={buy.amount}
										transaction={true}
										buy={true}
									/>
								);
							} else {
								buyCount++;
							}
					  })
					: shellTransactions.map((shell) => {
							if (shellCount > 0) {
								return (
									<CoinCard
										icon={shell.img}
										symbol={shell.symbol}
										name={shell.date}
										priceChange={shell.hash}
										price={shell.amount}
										transaction={true}
										buy={false}
									/>
								);
							} else {
								shellCount++;
							}
					  })}
			</section>
		</PageLayout>
	);
};

export default Transactions;
