import type { NextPage } from 'next'
import { useAppContext } from '../context'
import Spinner from '../components/Spinner'
import CoinCard from '../components/CoinCard'
import PageLayout from '../components/PageLayout'
import DoughnutChart from '../components/DoughnutChart'
import { useGetCoinBalance } from '../hooks/useGetCoinBalance'


const Home: NextPage = () => {
  const { BTC, ETH, USDT, DAI, USDC, hardcodedUserBalance } = useAppContext();
  const { btcBalance, ethBalance, usdtBalance, daiBalance, usdcBalance, totalBalanceUsd, CriptoList } = useGetCoinBalance({ BTC, ETH, USDT, DAI, USDC, hardcodedUserBalance });

  return (
    <PageLayout head='Belo | Portfolio'>
      {Number.isNaN(totalBalanceUsd) ?
        <Spinner text='Loading...' />
        :
        <>
          <div className='mb-4 flex flex-col items-center'>
            <h2 className='text-gray-500'>Total balance</h2>
            <b className='text-2xl text-blue-700'>US$ {totalBalanceUsd}</b>
          </div>
          <div className='w-128 h-128 sm:w-80 sm:h-auto mx-auto'>
            <DoughnutChart btcBalance={btcBalance} ethBalance={ethBalance} usdtBalance={usdtBalance} daiBalance={daiBalance} usdcBalance={usdcBalance} />
          </div>

          <div className='flex flex-wrap max-w-fit'>
            {
              CriptoList.length > 0 && CriptoList.map(cripto => {
                if (cripto.image) {
                  return (
                    <CoinCard key={cripto.id} icon={cripto.image.large} symbol={cripto.symbol} name={cripto.name} price={cripto.market_data.current_price.usd} priceChange={cripto.market_data.price_change_percentage_1h_in_currency.usd} buy={false} transaction={false} />
                  )
                }
              })
            }
          </div>
        </>}
    </PageLayout>
  )
}

export default Home
