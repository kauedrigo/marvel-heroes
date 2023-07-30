import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { getCharactersList } from '@/api/characters'
import { CharacterDataWrapper } from '@/types'

export const useCharactersList = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const search = searchParams.get('nameStartsWith') ?? ''
	const pagination = searchParams.get('pagination') ?? 1

	const [nameStartsWith, setNameStartsWith] = useState(search)
	const [page, setPage] = useState(Number(pagination))

	const formatData = (data: CharacterDataWrapper) => {
		const results = data?.data.results

		const formattedData = results?.map(({ id, name, thumbnail: thumbnailObject }) => {
			const hasThumbnail = thumbnailObject.path.split('/').slice(-1)[0] !== 'image_not_available'
			const thumbnail = hasThumbnail
				? thumbnailObject.path + '.' + thumbnailObject.extension
				: '/marvel-logo.png'

			return { id, name, thumbnail }
		})

		return { formattedData, total: data.data.total }
	}

	const { data, isLoading, error } = useQuery({
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
		select: formatData,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 1,
	})

	return {
		data: data?.formattedData,
		total: data?.total ?? 0,
		isLoading,
		error,
		page,
		setPage,
		nameStartsWith,
		setNameStartsWith,
	}
}
