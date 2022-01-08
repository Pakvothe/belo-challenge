import { useEffect, useState } from 'react'
import { useAppContext } from '../context'
import { useGetCoinBalance } from '../hooks/useGetCoinBalance'
import PageLayout from '../components/PageLayout'
import Image from 'next/image'

const Swap = () => {
    const { BTC, ETH, USDT, DAI, USDC, hardcodedUserBalance } = useAppContext();
    const { btcBalance, ethBalance, usdtBalance, daiBalance, usdcBalance, CriptoList } = useGetCoinBalance({ BTC, ETH, USDT, DAI, USDC, hardcodedUserBalance });
    const balanceDictionary = {
        btc: btcBalance,
        eth: ethBalance,
        usdt: usdtBalance,
        dai: daiBalance,
        usdc: usdcBalance
    }
    const coinDictionary = {
        btc: BTC,
        eth: ETH,
        usdt: USDT,
        dai: DAI,
        usdc: USDC
    }
    const [shellCoin, setShellCoin] = useState('btc')
    const [buyCoin, setBuyCoin] = useState('usdt')
    const [shellBalance, setShellBalance] = useState(btcBalance)
    const [buyBalance, setBuyBalance] = useState(usdtBalance)
    const [swapAmount, setSwapAmount] = useState({
        shell: 0,
        buy: 0,
    })

    useEffect(() => {
        setShellBalance(btcBalance)
        setBuyBalance(usdtBalance)
    }, [btcBalance, usdtBalance])

    const setCoins = (coin: string, transaction: string) => {
        [...document.getElementsByTagName("details")].forEach((D) =>
            D.open = false
        )
        if (transaction === 'buy') {
            setBuyCoin(coin)
            setBuyBalance(balanceDictionary[coin])
        } else {
            setShellCoin(coin)
            setShellBalance(balanceDictionary[coin])
        }
    }

    const handleChange = (event: any) => {
        if (event.target.name === 'shell') {
            const convertionShellToUsd = event.target.value * coinDictionary[shellCoin].market_data?.current_price.usd
            const buyCoinPrice = convertionShellToUsd / coinDictionary[buyCoin].market_data?.current_price.usd;
            const maxBuyPrice = shellBalance / coinDictionary[buyCoin].market_data?.current_price.usd;
            const maxShellPrice = shellBalance / coinDictionary[shellCoin].market_data?.current_price.usd;

            if (convertionShellToUsd <= shellBalance) {
                setSwapAmount(() => ({
                    shell: event.target.value,
                    buy: buyCoinPrice
                }));
            } else {
                setSwapAmount(() => ({
                    shell: maxShellPrice,
                    buy: maxBuyPrice
                }));
            }
        } else {
            const convertionBuyToUsd = event.target.value * coinDictionary[buyCoin].market_data?.current_price.usd
            const shellCoinPrice = convertionBuyToUsd / coinDictionary[shellCoin].market_data?.current_price.usd;
            const maxBuyPrice = shellBalance / coinDictionary[buyCoin].market_data?.current_price.usd;
            const maxShellPrice = shellBalance / coinDictionary[shellCoin].market_data?.current_price.usd;

            if (convertionBuyToUsd <= shellBalance) {
                setSwapAmount(() => ({
                    shell: shellCoinPrice,
                    buy: event.target.value
                }));
            } else {
                setSwapAmount(() => ({
                    shell: maxShellPrice,
                    buy: maxBuyPrice
                }));
            }
        }

    }
    return (
        <PageLayout head='Belo | Swap'>
            <section className=' flex flex-col items-center w-128 h-128 mx-auto'>
                <div className=' flex flex-col items-center mb-4'>
                    <h2 className='text-gray-500 '>{`${coinDictionary[shellCoin].name} price`}</h2>
                    <b className='text-2xl text-blue-700'>US$ {`${coinDictionary[shellCoin].market_data?.current_price.usd}`}</b>
                </div>
                <div className='flex flex-col w-96 my-4'>
                    <h2 className='text-gray-500'>Shell</h2>
                    <div className='flex w-96 h-12 my-4'>
                        <input
                            type='number'
                            name='shell'
                            value={swapAmount.shell}
                            onChange={handleChange}
                            className='w-72 rounded px-2 font-semibold hover:ring focus:ring focus:outline-none' />
                        <details className='m-auto'>
                            <summary>
                                {shellCoin.toUpperCase()}
                            </summary>
                            <menu role='menu' className='relative'>
                                <div role='none' className='flex flex-col absolute top-2 bg-white w-40 py-4 px-6 rounded'>
                                    {
                                        CriptoList.length > 0 && CriptoList.map(cripto => {
                                            if (cripto.image && cripto.symbol !== buyCoin) {
                                                return (
                                                    <button
                                                        role='menuitem'
                                                        onClick={() => setCoins(cripto.symbol, 'shell')}
                                                        className='font-semibold my-2 rounded flex items-center hover:ring'>
                                                        <Image src={cripto.image.large} width={20} height={20} />
                                                        <span className='ml-3'>{cripto.symbol.toUpperCase()}</span>
                                                    </button>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </menu>
                        </details>
                    </div>
                    <p className='text-gray-500'>{`${shellCoin.toUpperCase()} Balance: US$ ${shellBalance}`}</p>
                </div >

                <div className='w-96 h-1 from-blue-300 bg-gradient-to-br to-indigo-300 my-4 rounded' />

                <div className='flex flex-col w-96 my-4'>
                    <h2 className='text-gray-500'>Buy</h2>
                    <div className='flex w-96 h-12 my-4'>
                        <input
                            type='number'
                            name='buy'
                            value={swapAmount.buy}
                            onChange={handleChange}
                            className='w-72 rounded px-2 font-semibold hover:ring focus:ring focus:outline-none' />
                        <details className='m-auto '>
                            <summary>
                                {buyCoin.toUpperCase()}
                            </summary>
                            <menu role='menu' className='relative'>
                                <div role='none' className='flex flex-col absolute top-2 bg-white w-40 py-4 px-6 rounded'>
                                    {
                                        CriptoList.length > 0 && CriptoList.map(cripto => {
                                            if (cripto.image && cripto.symbol !== shellCoin) {
                                                return (
                                                    <button
                                                        role='menuitem'
                                                        onClick={() => setCoins(cripto.symbol, 'buy')}
                                                        className='font-semibold my-2 rounded flex items-center hover:ring'>
                                                        <Image src={cripto.image.large} width={20} height={20} />
                                                        <span className='ml-3'>{cripto.symbol.toUpperCase()}</span>
                                                    </button>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </menu>
                        </details>
                    </div>
                    <p className='text-gray-500'>{`${buyCoin.toUpperCase()} Balance: US$ ${buyBalance}`}</p>

                </div >

                <button className=' h-12 mt-4 from-blue-500 bg-gradient-to-br to-indigo-500  p8 w-96 rounded text-white text-lg hover:ring'>Comprar</button>
            </section >
        </PageLayout >
    )
}

export default Swap
