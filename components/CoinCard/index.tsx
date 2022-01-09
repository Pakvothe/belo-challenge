import Image from 'next/image'
import { useAppContext } from '../../context';

const CoinCard = ({ icon, symbol, name, price, priceChange, transaction, buy }: IProps) => {
    const { hardcodedUserBalance } = useAppContext();

    return (
        <article className='my-8 mx-auto flex justify-between px-6 py-12 h-32 items-center w-128 sm:my-6 sm:w-80 rounded-md bg-white hover:ring transition-all dark:bg-slate-500'>
            {!transaction ?
                <>
                    <div className='flex place-items-center'>
                        <Image src={icon} width={35} height={35} />
                        <div className='ml-4 dark:text-blue-200'>
                            <b>{symbol.toUpperCase()}</b>
                            <p className='font-semibold'>{name}</p>
                            <p className='text-gray-400 font-semibold dark:text-gray-200'>US$ {price}</p>
                        </div>
                    </div>
                    <div className='flex flex-col text-right dark:text-blue-200'>
                        <b>{`${hardcodedUserBalance[symbol]} ${symbol.toUpperCase()}`}</b>
                        <p className='text-gray-400 font-semibold dark:text-gray-200'>US$ {price * hardcodedUserBalance[symbol]}</p>
                        {priceChange > 0 ? <p className='text-green-500'>{priceChange}%</p> : <p className='text-red-500 dark:text-red-300'>{priceChange}%</p>}
                    </div>
                </>
                :
                <div className='inline-block w-128 sm:w-80 dark:text-blue-200'>
                    <div className='flex justify-between sm:flex-col'>
                        <div className='flex place-items-center sm:w-max '>
                            <Image src={icon} width={35} height={35} />
                            <div className='ml-4'>
                                <b>{symbol.toUpperCase()}</b>
                                <p className='font-semibold'>{name}</p>
                            </div>
                        </div>
                        <div className={`flex flex-col sm:flex-row text-right sm:w-max sm:mt-2 ${buy ? 'text-green-500' : 'text-red-500 dark:text-red-300'}`}>
                            <b className='sm:mr-1'>{`${symbol.toUpperCase()}`}</b>
                            <b>{`${buy ? '+' : '-'}${price}`}</b>
                        </div>
                    </div>
                    <p className="text-sm mt-3 truncate inline-block w-96 sm:w-64">{priceChange}</p>
                </div>
            }
        </article>
    );
};

export default CoinCard;

interface IProps {
    icon: string,
    symbol: string,
    name: string,
    price: number,
    priceChange: number | string,
    transaction: boolean,
    buy: boolean,
}