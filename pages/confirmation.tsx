import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAppContext } from '../context'
import PageLayout from '../components/PageLayout'
import { useGetDate } from '../hooks/useGetDate'
import { sha256 } from 'js-sha256';

const Confirmation = () => {
    const { push } = useRouter()
    const { Day, Year, monthName, dayName } = useGetDate()
    const { swapBuy, swapShell, changeBalance, setBuyTransactions, setShellTransactions, buyTransactions, shellTransactions } = useAppContext();
    const comission = 0.31;
    const sum = swapBuy.amount - (swapBuy.amount * comission / 100)
    const sumSymbol = swapBuy.symbol
    const sub = swapShell.amount
    const subSymbol = swapShell.symbol
    let hash = (Math.random() + 1).toString(36).substring(7);

    const handleConfirm = () => {
        changeBalance(sum, sumSymbol, sub, subSymbol)
        setBuyTransactions(prev => [...prev, { date: `${dayName}, ${Day} ${monthName}, ${Year}`, hash: sha256(hash), symbol: swapBuy.symbol, img: swapBuy.img, amount: swapBuy.amount }])
        setShellTransactions(prev => [...prev, { date: `${dayName}, ${Day} ${monthName}, ${Year}`, hash: sha256(hash), symbol: swapShell.symbol, img: swapShell.img, amount: swapShell.amount }])
        push('/transactions')
    }
    console.log(`buyTransactions`, buyTransactions)
    return (
        <PageLayout head='Belo | Confirmation'>
            <section className=' flex flex-col items-center w-128 h-128 sm:w-80 sm:h-auto mx-auto'>
                {swapBuy?.amount > 0 ?
                    (<>
                        <h2 className='text-2xl text-blue-700 mb-6 text-center'>Confirm your exchange</h2>
                        <div>
                            <p className='text-gray-500 mb-2 text-center'>You will receive approximately</p>
                            <div className='w-128 sm:w-80 flex items-center justify-between  mx-auto bg-white px-6 py-4 rounded h-24 dark:bg-slate-500 dark:text-gray-200'>
                                {
                                    swapBuy.img && <Image src={swapBuy.img} width={35} height={35} />
                                }
                                <h1 className='ml-5 text-2xl sm:text-lg font-bold mb-2 text-center'>{`${swapBuy.amount - (swapBuy.amount * comission / 100)} ${swapBuy.symbol.toUpperCase()}`}</h1>
                            </div>
                        </div>

                        <div className='w-128 sm:w-80 h-0.5 from-blue-300 bg-gradient-to-br to-indigo-300 my-6 rounded' />

                        <div className='w-128 sm:w-80 flex items-center justify-between mx-auto bg-white px-6 py-4 rounded h-24 dark:bg-slate-500 dark:text-gray-200'>
                            <div className='flex flex-col'>
                                <p className="text-gray-500 mb-1 dark:text-blue-200">In exchange of</p>
                                <div className='flex items-center'>
                                    {
                                        swapShell.img && <Image src={swapShell.img} width={25} height={25} />
                                    }
                                    <h2 className='font-bold text-lg ml-2'>{`${swapShell.name}`}</h2>
                                </div>
                            </div>
                            <h1 className='self-end font-bold text-lg'>{`${swapShell.amount} ${swapShell.symbol.toUpperCase()}`}</h1>
                        </div>

                        <div className='w-128 sm:w-80 h-0.5 from-blue-300 bg-gradient-to-br to-indigo-300 my-6 rounded' />


                        <div className='flex flex-col w-128 sm:w-80'>
                            <div className='flex items-center justify-between mb-2'>
                                <p className="text-gray-500" >Exchange rate</p>
                                <p className="font-semibold">{`${swapBuy.change} ${swapBuy.symbol.toUpperCase()} = ${swapShell.change} ${swapShell.symbol.toUpperCase()}`}</p>
                            </div>
                            <div className='flex items-center justify-between mb-2'>
                                <p className="text-gray-500">Commission</p>
                                <p className="font-semibold">{comission}%</p>
                            </div>
                        </div>

                        <button onClick={() => handleConfirm()} className='h-12 mt-6 from-blue-500  bg-gradient-to-br to-indigo-500 dark:from-blue-700 dark:to-indigo-700 transition-all p8 w-128 sm:w-80 rounded text-white text-lg hover:ring'>Confirm</button>
                    </>
                    ) :
                    <div className='flex flex-col items-center justify-center h-screen'>
                        <h2>There are no ongoing transactions</h2>
                        <button onClick={() => push('/swap')} className='h-12 mt-6 from-blue-500 bg-gradient-to-br to-indigo-500 transition-all p8 w-128 sm:w-80 rounded text-white text-lg hover:ring'>Go Swap</button>
                    </div>
                }
            </section >
        </PageLayout >
    )
}

export default Confirmation
