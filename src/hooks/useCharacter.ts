import { useQuery } from '@tanstack/react-query'

import { getCharacter } from '@/api/characters'
import { CharacterDataWrapper } from '@/types'

export const useCharacter = (id: string) => {
	const formatCharacterData = (data: CharacterDataWrapper) => {
		const { description, name, thumbnail } = data.data.results[0]

		const hasThumbnail = thumbnail.path.split('/').slice(-1)[0] !== 'image_not_available'
		const thumbnailSrc = hasThumbnail
			? thumbnail.path + '.' + thumbnail.extension
			: '/marvel-logo.png'

		const modifiedDescription = description ? description : 'description not available'

		return { thumbnail: thumbnailSrc, description: modifiedDescription, name }
	}

	const query = useQuery({
		queryKey: ['characters', id],
		queryFn: () => getCharacter(id),
		select: formatCharacterData,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 1,
	})

	return query
}
