import { useQuery } from '@tanstack/react-query'

import { getCharacterComics } from '@/api/characters'
import { ComicDataWrapper } from '@/types'

export const useCharacterComics = (id: string) => {
	const formatComicsData = (data: ComicDataWrapper) => {
		const comics = data.data.results

		const formatedData = comics.map(({ thumbnail, title, id }) => {
			const hasThumbnail = thumbnail.path.split('/').slice(-1)[0] !== 'image_not_available'
			const thumbnailSrc = hasThumbnail
				? thumbnail.path + '.' + thumbnail.extension
				: '/marvel-logo.png'

			const titleSlug = title.toLowerCase().replace(/[()#]/g, '').replace(/ /g, '_')
			const redirectUrl = process.env.NEXT_PUBLIC_MARVEL_COMIC_URL + `/${id}/${titleSlug}`

			return { thumbnailSrc, title, redirectUrl, id }
		})

		return { data: formatedData, total: data.data.count ?? 0 }
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['characters', 'comics', id],
		queryFn: () => getCharacterComics(id as string),
		select: formatComicsData,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 1,
	})

	return { data: data?.data, total: data?.total ?? 0, isLoading, error }
}
