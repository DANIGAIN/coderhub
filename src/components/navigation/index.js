'use client'
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import React, {useState } from 'react'
import Skeleton from '../loading/Skeleton';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';
function Navigation() {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const { data: session, status } = useSession()
    const { permissions } = useAppContext();
    const router = useRouter();
    return (
        <div>
            <div className={'fixed z-9 w-full -mt-1'}>
                <nav className="bg-white border-gray-200 dark:bg-slate-800">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Image src="/assets/agency-logo.svg" height={35} width={35} alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Agency</span>
                        </Link>
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            {status == 'authenticated' && <button type="button" onMouseEnter={() => setMenuOpen(!isMenuOpen)} className="flex text-sm bg-gray-800 rounded-full md:me-0 hover:ring-4 hover:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <span className="sr-only">Open user menu</span>
                                {session.user?.image ?
                                    <Image className="rounded-full" src={session.user?.image} alt="user photo" height={35} width={35} />

                                    :
                                    <Skeleton />
                                }
                            </button>}
                            {status == 'loading' && <Skeleton />}
                            {status == 'unauthenticated' &&
                                <Link href='/agency/login' className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login </Link>

                            }
                            <div className={`relative ${!isMenuOpen ? 'hidden' : ''}`}>
                                <div className="z-50 absolute my-4 text-base list-none bg-gray-2 dark:bg-slate-500 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{`${session?.user?.name}`}</span>
                                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{`${session?.user?.email}`}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        {
                                           permissions.data.includes('dashboard')?
                                            <li>
                                                <button
                                                    onClick={() => router.push('/agency/dashboard')}
                                                    className="hover:bg-sky-300 text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                >Dashboaed</button>
                                            </li>:null
                                        }
                                        <li>
                                            <button
                                                onClick={() => router.push('/profile')}
                                                className="hover:bg-sky-300 text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"

                                            >profile</button>
                                        </li>

                                        <li>
                                            <button onClick={() => signOut()} href='/' className=" hover:bg-sky-300 text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log Out</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>


                            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </div>
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
                                <li>
                                    <Link href={`/`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                                </li>
                                <li>
                                    <Link href="/service" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
                                </li>
                                <li>
                                    <Link href="/team" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"> team</Link>
                                </li>

                                <li>
                                    <Link href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                                </li>
                                <li>
                                    <Link href={`/contact`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>


    )
}

export default Navigation