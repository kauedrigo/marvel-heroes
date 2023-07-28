import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import './globals.css'
import Providers from '@/components/providers'
import classNames from 'classnames'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Marvel Heroes',
	description: 'Search your Marvel Hero',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body
				className={classNames(
					inter.className,
					'flex min-h-screen min-w-full flex-col items-center bg-stone-50 font-sans text-gray-900',
				)}
			>
				<Providers>
					<main className="max-w-7xl w-full justify-self-center self-center p-3 md:p-5">
						{children}
					</main>
				</Providers>
			</body>
		</html>
	)
}
