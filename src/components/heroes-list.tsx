'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useCharactersList } from '@/hooks/useCharactersList'

type HeroesListProps = {
	nameStartsWith: string
	page: number
}

export const HeroesList = ({ nameStartsWith, page }: HeroesListProps) => {
	const { data, error, isLoading } = useCharactersList({ nameStartsWith, page })

	if (isLoading) return <p>Loading...</p>

	if (error) return <p>error</p>

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{data?.map(({ id, name, thumbnail }) => (
				<Link
					href={`/characters/${id}`}
					className="flex flex-col gap-1 font-semibold md:text-xl"
					key={id}
					aria-label={`Know more about ${name}`}
				>
					{name}
					<Image
						src={thumbnail}
						width={320}
						height={320}
						alt={`${name} thumbnail`}
						className="w-full"
					/>
				</Link>
			))}
		</div>
	)
}
