'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { getCharactersList } from '@/api/characters'
import { Pagination } from '@/components/pagination'
import { SearchBar } from '@/components/search-bar'

export const HeroesList = () => {
	const router = useRouter()
	const pathname = usePathname()
	const search = useSearchParams().get('nameStartsWith') ?? ''
	const pagination = useSearchParams().get('pagination') ?? 1

	const [nameStartsWith, setNameStartsWith] = useState(search)
	const [page, setPage] = useState(Number(pagination))

	const {
		data: dataWrapper,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['characters', 'list', nameStartsWith, page],
		queryFn: () => {
			let queryString = `?`
			if (nameStartsWith === search) {
				queryString += `pagination=${page}`
			} else {
				setPage(1)
				queryString += `pagination=${1}`
			}
			if (nameStartsWith) {
				queryString += `&nameStartsWith=${nameStartsWith}`
			}
			router.push(pathname + queryString)
			return getCharactersList({ nameStartsWith, page })
		},
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 1,
	})

	if (isLoading) return <p>Loading...</p>

	if (error) return <p>error</p>

	if (!dataWrapper) return <p>error</p>

	const formatData = () => {
		const results = dataWrapper.data.results

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
			<SearchBar setSearchValue={setNameStartsWith} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{formatData().map(({ id, name, thumbnail }) => (
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
			<Pagination page={page} setPage={setPage} total={dataWrapper.data.total} />
		</div>
	)
}
