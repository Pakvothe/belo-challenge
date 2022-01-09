import React, {
	useContext,
	useEffect,
	useState,
	createContext,
	ReactChildren,
	ReactChild,
} from 'react';

export const ApplicationContext = createContext<IContextTypes | null>(null);

export const useAppContext = () => {
	const value = useContext(ApplicationContext);
	if (!value) {
		throw new Error('This hook must be call inside the app provider');
	}
	return value;
};

export const AppProvider = ({ children }: AuxProps) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [USDT, setUSDT] = useState({});
	const [USDC, setUSDC] = useState({});
	const [BTC, setBTC] = useState({});
	const [ETH, setETH] = useState({});
	const [DAI, setDAI] = useState({});
	const [hardcodedUserBalance, setHardcodedUserBalance] = useState<Ihardcode>({
		btc: 0.0345,
		eth: 0.5,
		usdt: 423,
		dai: 500,
		usdc: 300,
	});
	const [swapShell, setSwapShell] = useState({
		symbol: '',
		amount: 0,
		price: 0,
		img: '',
		change: 0,
		name: '',
	});
	const [swapBuy, setSwapBuy] = useState({
		symbol: '',
		amount: 0,
		price: 0,
		img: '',
		change: 0,
		name: '',
	});
	const [buyTransactions, setBuyTransactions] = useState([
		{
			date: '',
			hash: '',
			symbol: '',
			img: '',
			amount: 0,
		},
	]);
	const [shellTransactions, setShellTransactions] = useState([
		{
			date: '',
			hash: '',
			symbol: '',
			img: '',
			amount: 0,
		},
	]);

	useEffect(() => {
		fetchCoins();
	}, []);

	const fetchCoins = async () => {
		await fetchBTC();
		await fetchETH();
		await fetchUSDT();
		await fetchDAI();
		await fetchUSDC();
	};
	const fetchBTC = async () => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
		)
			.then((response) => response.json())
			.then((data) => {
				setBTC(data);
				setLoading(false);
			});
	};

	const fetchETH = async () => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
		)
			.then((response) => response.json())
			.then((data) => {
				setETH(data);
				setLoading(false);
			});
	};
	const fetchUSDT = async () => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/tether?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
		)
			.then((response) => response.json())
			.then((data) => {
				setUSDT(data);
				setLoading(false);
			});
	};
	const fetchDAI = async () => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/dai?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
		)
			.then((response) => response.json())
			.then((data) => {
				setDAI(data);
				setLoading(false);
			});
	};
	const fetchUSDC = async () => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/usd-coin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
		)
			.then((response) => response.json())
			.then((data) => {
				setUSDC(data);
				setLoading(false);
			});
	};

	const changeBalance = (
		sum: number,
		sumSymbol: keyof typeof hardcodedUserBalance,
		sub: number,
		subSymbol: keyof typeof hardcodedUserBalance
	) => {
		setTimeout(() => {
			setHardcodedUserBalance({
				...hardcodedUserBalance,
				[sumSymbol]: hardcodedUserBalance[sumSymbol] + sum,
				[subSymbol]: hardcodedUserBalance[subSymbol] - sub,
			});
		}, 1500);
	};

	return (
		<ApplicationContext.Provider
			value={{
				BTC,
				ETH,
				USDT,
				DAI,
				USDC,
				loading,
				setLoading,
				hardcodedUserBalance,
				setHardcodedUserBalance,
				swapBuy,
				setSwapBuy,
				swapShell,
				setSwapShell,
				changeBalance,
				buyTransactions,
				setBuyTransactions,
				shellTransactions,
				setShellTransactions,
				menuOpen,
				setMenuOpen,
				darkMode,
				setDarkMode,
			}}
		>
			{children}
		</ApplicationContext.Provider>
	);
};

interface IContextTypes {
	BTC: Record<string, any>;
	ETH: Record<string, any>;
	USDT: Record<string, any>;
	DAI: Record<string, any>;
	USDC: Record<string, any>;
	menuOpen: boolean;
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
	hardcodedUserBalance: Record<string, any>;
	swapBuy: ISwap;
	setSwapBuy: React.Dispatch<
		React.SetStateAction<{
			symbol: string;
			amount: number;
			price: number;
			img: string;
			change: number;
			name: string;
		}>
	>;
	swapShell: ISwap;
	setSwapShell: React.Dispatch<
		React.SetStateAction<{
			symbol: string;
			amount: number;
			price: number;
			img: string;
			change: number;
			name: string;
		}>
	>;
	setHardcodedUserBalance: React.Dispatch<
		React.SetStateAction<{
			btc: number;
			eth: number;
			usdt: number;
			dai: number;
			usdc: number;
		}>
	>;
	buyTransactions: Itransactions[];
	shellTransactions: Itransactions[];
	setBuyTransactions: React.Dispatch<
		React.SetStateAction<
			{
				date: string;
				hash: string;
				symbol: string;
				img: string;
				amount: number;
			}[]
		>
	>;
	setShellTransactions: React.Dispatch<
		React.SetStateAction<
			{
				date: string;
				hash: string;
				symbol: string;
				img: string;
				amount: number;
			}[]
		>
	>;
	changeBalance: (
		sum: number,
		sumSymbol: keyof Ihardcode,
		sub: number,
		subSymbol: keyof Ihardcode
	) => void;
}

interface ISwap {
	symbol: string;
	amount: number;
	price: number;
	img: string;
	change: number;
	name: string;
}
interface Ihardcode {
	btc: number;
	eth: number;
	usdt: number;
	dai: number;
	usdc: number;
}

interface Itransactions {
	date: string;
	hash: string;
	symbol: string;
	img: string;
	amount: number;
}

interface AuxProps {
	children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}
