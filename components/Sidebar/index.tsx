import Link from 'next/link'

const Sidebar = () => {

    const NavbarLinks = [
        {
            title: 'My portfolio',
            url: '/'
        },
        {
            title: 'Swap Coins',
            url: '/swap'
        },
        {
            title: 'Transactions',
            url: '/'
        }
    ]

    return (
        <div className='p-12 w-96'>
            <h4 className='text-gray-400 uppercase text-sm font-bold mb-8'>Menu</h4>
            <div className='flex flex-col'>
                {
                    NavbarLinks.map(link => <Link key={link.title} href={link.url} >
                        <a className='mb-2 text-lg font-semibold py-4 px-2  hover:ring transition-all text-center rounded '>
                            {link.title}
                        </a>
                    </Link>)
                }
            </div>
        </div>
    )
};

export default Sidebar;
