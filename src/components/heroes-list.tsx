'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Pagination } from '@/components/pagination'
import { SearchBar } from '@/components/search-bar'
import { useCharactersList } from '@/hooks/useCharactersList'

export const HeroesList = () => {
	const { data, total, error, isLoading, page, setPage, nameStartsWith, setNameStartsWith } =
		useCharactersList()

	if (isLoading) return <p>Loading...</p>

	if (error) return <p>error</p>

	return (
		<div className="flex flex-col gap-4">
			<SearchBar initialValue={nameStartsWith} setSearchValue={setNameStartsWith} />
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
			<Pagination page={page} setPage={setPage} total={total} />
		</div>
	)
}
