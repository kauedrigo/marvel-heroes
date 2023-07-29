'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getCharacters } from '@/api/characters'
import { Pagination } from '@/components/pagination'
import { SearchBar } from '@/components/search-bar'
import { CharacterDataWrapper } from '@/types'

type HeroesListProps = {
	characterDataWrapper: CharacterDataWrapper
}

export const HeroesList = ({ characterDataWrapper }: HeroesListProps) => {
	const [searchValue, setSearchValue] = useState('')
	const [page, setPage] = useState(1)

	useEffect(() => {
		setPage(1)
	}, [searchValue])

	const {
		data: dataWrapper,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['characters', 'list', searchValue, page],
		queryFn: () => getCharacters({ nameStartsWith: searchValue, page }),
		initialData: characterDataWrapper,
		keepPreviousData: true,
	})

	if (isLoading) return <p>Loading...</p>

	if (error) return <p>error</p>

	const formatData = () => {
		const { data } = dataWrapper
		const { results } = data

		const formattedData = results.map(({ id, name, thumbnail: thumbnailObject }) => {
			const hasThumbnail = thumbnailObject.path.split('/').slice(-1)[0] !== 'image_not_available'
			const thumbnail = hasThumbnail
				? thumbnailObject.path + '.' + thumbnailObject.extension
				: '/marvel-logo.png'

			return { id, name, thumbnail }
		})

		return formattedData
	}

	return (
		<div className="flex flex-col gap-4">
			<SearchBar setSearchValue={setSearchValue} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{formatData().map(({ id, name, thumbnail }) => (
					<Link
						href={'#'}
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
							objectFit="cover"
							// TODO remove layout prop
							layout="responsive"
						/>
					</Link>
				))}
			</div>
			<Pagination page={page} setPage={setPage} total={dataWrapper.data.total} />
		</div>
	)
}
