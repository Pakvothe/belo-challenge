import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context';

const Sidebar = () => {
	const { menuOpen, setMenuOpen } = useAppContext();
	const { pathname } = useRouter();
	const [activePath, setActivePath] = useState('/');

	const sidebarLinks = [
		{
			title: 'My portfolio',
			url: '/',
		},
		{
			title: 'Swap Coins',
			url: '/swap',
		},
		{
			title: 'Transactions',
			url: '/transactions',
		},
	];

	useEffect(() => {
		setActivePath(pathname.substring(1));
	}, [pathname]);

	return (
		<div
			className={`p-12 w-96 ${
				!menuOpen ? 'sm:hidden' : 'sm:block'
			} sm:absolute sm:bg-white sm:min-h-100 sm:p-0 sm:w-full sm:z-50 transition-all dark:bg-slate-500`}
		>
			<h4 className='text-gray-400 uppercase text-sm font-bold mb-8 sm:hidden dark:text-blue-200'>
				Menu
			</h4>
			<div className='flex flex-col'>
				{sidebarLinks.map((link) => (
					<Link key={link.title} href={link.url}>
						<a
							onClick={() => setMenuOpen(!menuOpen)}
							className={`${
								activePath === link.url.substring(1) &&
								'underline decoration-blue-500 sm:decoration-blue-300 decoration-2 transtion-all'
							} mb-2 text-lg font-semibold py-4 px-2 sm:px-0 hover:ring transition-all text-center rounded dark:text-gray-200`}
						>
							{link.title}
						</a>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
