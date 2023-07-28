'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { getCharacters } from '@/api/characters'
import { SearchBar } from '@/components/search-bar'
import { CharacterDataWrapper } from '@/types'
import { useState } from 'react'

type HeroesListProps = {
	characterDataWrapper: CharacterDataWrapper
}

export const HeroesList = ({ characterDataWrapper }: HeroesListProps) => {
	const [searchValue, setSearchValue] = useState('')

	const {
		data: dataWrapper,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['characters', 'list', searchValue],
		queryFn: () => getCharacters(searchValue),
		initialData: characterDataWrapper,
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
		</div>
	)
}
