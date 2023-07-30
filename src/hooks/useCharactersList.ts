import { useQuery } from '@tanstack/react-query'

import { getCharactersList } from '@/api/characters'
import { CharacterDataWrapper } from '@/types'

type UseCharactersListProps = {
	nameStartsWith: string
	page: number
}

export const useCharactersList = ({ nameStartsWith, page }: UseCharactersListProps) => {
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
		queryFn: () => getCharactersList({ nameStartsWith, page }),
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
	}
}
