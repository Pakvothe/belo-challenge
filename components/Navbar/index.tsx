import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '../../context';
import BeloLogo from '../../public/BeloLogo.jpg';
import MenuIcon from '../../public/dashboard.svg'
import { useGetDate } from '../../hooks/useGetDate'

const Navbar = () => {
    const { Day, Year, monthName, dayName } = useGetDate()
    const { setMenuOpen, menuOpen, darkMode, setDarkMode } = useAppContext();

    const toggleDarkTheme = () => {
        document.documentElement.classList.toggle('dark')
        setDarkMode(!darkMode)
    }

    return (
        <nav className='bg-white py-4 px-6 flex items-center justify-between border-b-2 border-blue-500 sm:flex-col sm:relative dark:bg-slate-500 transition-all'>
            <div className='flex items-center'>
                <Image src={BeloLogo} width={35} height={35} className='rounded-full' />
                <Link href='/' >
                    <a className='ml-2 text-lg font-bold text-blue-700 dark:text-blue-200' onClick={() => setMenuOpen(false)}>Belo Challenge</a>
                </Link>
            </div>
            <div className='text-gray-700 dark:text-gray-200 font-semibold sm:mt-1 sm:mb-2 flex flex-col'>
                <p>{`${dayName}, ${Day} ${monthName}, ${Year}`}</p>
                <button className='sm:hidden text-right text-blue-700 font-bold dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 text-lg' onClick={() => toggleDarkTheme()}>{darkMode ? 'Light mode' : 'Dark mode'}</button>
            </div>
            <div className='hidden sm:block sm:absolute bottom-2 left-3'>
                <Image src={MenuIcon} width={20} height={20} onClick={() => setMenuOpen(!menuOpen)} />
            </div>
            <div className='hidden sm:block sm:absolute bottom-2 right-3'>
                <button className='text-right text-blue-700 font-bold dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 text-lg' onClick={() => toggleDarkTheme()}>{darkMode ? 'Light' : 'Dark'}</button>

            </div>
        </nav>
    )
};

export default Navbar;
