import Image from 'next/image'
import { useAppContext } from '../../context';

const CoinCard = ({ icon, symbol, name, price, priceChange }: IProps) => {
    const { hardcodedUserBalance } = useAppContext();

    return (
        <article className='my-8 mx-auto flex justify-between px-6 py-12 h-32 items-center w-128 rounded-md bg-white hover:ring transition-all'>
            <div className='flex place-items-center'>
                <Image src={icon} width={35} height={35} />
                <div className='ml-4'>
                    <b>{symbol.toUpperCase()}</b>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-gray-400 font-semibold'>US$ {price}</p>
                </div>
            </div>
            <div className='flex flex-col text-right'>
                <b>{`${hardcodedUserBalance[symbol]} ${symbol.toUpperCase()}`}</b>
                <p className='text-gray-400 font-semibold'>US$ {price * hardcodedUserBalance[symbol]}</p>
                {priceChange > 0 ? <p className='text-green-500'>{priceChange}%</p> : <p className='text-red-500'>{priceChange}%</p>}
            </div>
        </article>
    );
};

export default CoinCard;

interface IProps {
    icon: string,
    symbol: string,
    name: string,
    price: number,
    priceChange: number
}