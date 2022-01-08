import Image from 'next/image';
import Link from 'next/link';
import BeloLogo from '../../public/BeloLogo.jpg';
import { useGetDate } from '../../hooks/useGetDate'

const Navbar = () => {
    const { Day, Year, monthName, dayName } = useGetDate()

    return (
        <nav className='bg-white py-4 px-6 flex items-center justify-between border-b-2 border-blue-500'>
            <div className='flex items-center'>
                <Image src={BeloLogo} width={35} height={35} className='rounded-full' />
                <Link href='/'>
                    <a className='ml-2 text-lg font-bold text-blue-700'>Belo Challenge</a>
                </Link>
            </div>
            <div className='text-gray-700 font-semibold'>
                <p>{`${dayName}, ${Day} ${monthName}, ${Year}`}</p>
            </div>
        </nav>
    )
};

export default Navbar;
