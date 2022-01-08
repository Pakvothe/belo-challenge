import React, { useContext, useEffect, useState, createContext, ReactChildren, ReactChild } from 'react';

export const ApplicationContext = createContext<IContextTypes | null>(null);

export const useAppContext = () => {
    const value = useContext(ApplicationContext)
    if (!value) {
        throw new Error("This hook must be call inside the app provider");
    }
    return value
};

export const AppProvider = ({ children }: AuxProps) => {
    const [BTC, setBTC] = useState({});
    const [ETH, setETH] = useState({});
    const [USDT, setUSDT] = useState({});
    const [DAI, setDAI] = useState({});
    const [USDC, setUSDC] = useState({});
    const [loading, setLoading] = useState(true);
    const [hardcodedUserBalance] = useState({
        btc: 0.0345,
        eth: 0.5,
        usdt: 423,
        dai: 500,
        usdc: 300,
    });

    useEffect(() => {
        fetchCoins()
    }, []);


    const fetchCoins = async () => {
        await fetchBTC()
        await fetchETH()
        await fetchUSDT()
        await fetchDAI()
        await fetchUSDC()
    }
    const fetchBTC = async () => {
        fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
            .then(response => response.json())
            .then(data => {
                setBTC(data)
                setLoading(false)
            });
    }

    const fetchETH = async () => {
        fetch('https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
            .then(response => response.json())
            .then(data => {
                setETH(data)
                setLoading(false)
            });
    }
    const fetchUSDT = async () => {
        fetch('https://api.coingecko.com/api/v3/coins/tether?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
            .then(response => response.json())
            .then(data => {
                setUSDT(data)
                setLoading(false)
            });
    }
    const fetchDAI = async () => {
        fetch('https://api.coingecko.com/api/v3/coins/dai?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
            .then(response => response.json())
            .then(data => {
                setDAI(data)
                setLoading(false)
            });
    }
    const fetchUSDC = async () => {
        fetch('https://api.coingecko.com/api/v3/coins/usd-coin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
            .then(response => response.json())
            .then(data => {
                setUSDC(data)
                setLoading(false)
            });
    }

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
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

interface IContextTypes {
    BTC: Record<string, any>,
    ETH: Record<string, any>,
    USDT: Record<string, any>,
    DAI: Record<string, any>,
    USDC: Record<string, any>,
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    hardcodedUserBalance: Record<string, any>,
}

interface AuxProps {
    children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}