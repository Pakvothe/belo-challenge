import { ReactChildren, ReactChild } from 'react';
import Head from 'next/head'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar'

const PageLayout = ({ children, head }: AuxProps) => {
    return (
        <>
            <Head>
                <title>{head}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Belo Challenge" />
                <meta name="keywords" content="Belo, React, Nextjs, Front-end, TypeScript" />
                <meta name="author" content="Franco Ortiz" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* OG Tags */}
                <meta property="og:title" content={head} />
                <meta property="og:locale" content="es_AR" />
                <meta property="og:url" content="" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Belo Challenge" />
                <meta property="og:image" content="" />

                {/* TAGS DE TWITTER */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={head} />
                <meta name="twitter:url" content="" />
                <meta name="twitter:site" content="@belo_app" />
                <meta name="twitter:description" content="Belo Challenge." />
                <meta name="twitter:image" content="" />
                <meta name="twitter:image:alt" content="Pantalla de inicio de la aplicación" />
            </Head>
            <Navbar />
            <main className='flex trans'>
                <Sidebar />
                <div className='bg-gray-100 min-h-screen flex-grow p-12 sm:px-2 flex flex-col items-center dark:bg-slate-300 transition-all'>
                    {children}
                </div>
            </main>
        </>
    )
}

export default PageLayout


interface AuxProps {
    children: any;
    head: string
}