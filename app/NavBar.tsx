"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'

const NavBar = () => {
    let currentPath = usePathname()
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ]
    return (
        <nav className='flex space-x-6 px-5 h-14 items-center border-b mb-5'>
            <Link href='/'><AiFillBug/></Link>
            <ul className='flex space-x-6'>
                {links.map((link) => (
                    <Link key={link.href} className={classNames({
                        'text-zinc-900':link.href === currentPath,
                         'text-zinc-500':link.href !== currentPath,
                         'hover:text-zinc-700':true,
                         'transition-colors':true
                    })} href={link.href}>{link.label}</Link>
                ))
                }

            </ul>
        </nav>
    )
}

export default NavBar