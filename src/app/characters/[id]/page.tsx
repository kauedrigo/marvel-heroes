'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { HiArrowNarrowLeft } from 'react-icons/hi'

import { getCharacter, getCharacterComics } from '@/api/characters'

export default function Character() {
	const { back } = useRouter()
	const { id } = useParams()

	const {
		data: characterDataWrapper,
		isLoading: isCharacterLoading,
		error: errorCharacter,
	} = useQuery({
		queryKey: ['characters', id],
		queryFn: () => getCharacter(id as string),
	})

	const {
		data: comicsDataWrapper,
		isLoading: isComicsLoading,
		error: errorComics,
	} = useQuery({
		queryKey: ['characters', 'comics', id],
		queryFn: () => getCharacterComics(id as string),
	})

	if (isCharacterLoading || isComicsLoading) return <p>Loading...</p>

	if (errorCharacter || errorComics) return <p>error</p>

	if (!characterDataWrapper || !comicsDataWrapper) return <p>character not found</p>

	const formatCharacterData = () => {
		const { description, name, thumbnail } = characterDataWrapper.data.results[0]

		const hasThumbnail = thumbnail.path.split('/').slice(-1)[0] !== 'image_not_available'
		const thumbnailSrc = hasThumbnail
			? thumbnail.path + '.' + thumbnail.extension
			: '/marvel-logo.png'

		const modifiedDescription = description ? description : 'description not available'

		return { thumbnailSrc, modifiedDescription, name }
	}

	const formatComicsData = () => {
		const comics = comicsDataWrapper.data.results

		const formatedData = comics.map(({ thumbnail, title, id }) => {
			const hasThumbnail = thumbnail.path.split('/').slice(-1)[0] !== 'image_not_available'
			const thumbnailSrc = hasThumbnail
				? thumbnail.path + '.' + thumbnail.extension
				: '/marvel-logo.png'

			const titleSlug = title.toLowerCase().replace(/[()#]/g, '').replace(/ /g, '_')
			const redirectUrl = process.env.NEXT_PUBLIC_MARVEL_COMIC_URL + `/${id}/${titleSlug}`

			return { thumbnailSrc, title, redirectUrl, id }
		})

		return formatedData
	}

	const { name, thumbnailSrc, modifiedDescription } = formatCharacterData()

	return (
		<div className="flex flex-col gap-4">
			<button className="flex items-center gap-2 text-lg" onClick={back}>
				<HiArrowNarrowLeft className="text-2xl md:text-4xl text-gray-800" />
				Go back
			</button>
			<h1 className="text-2xl md:text-3xl font-semibold">{name}</h1>
			<section className="flex flex-col gap-2 sm:flex-row sm:gap-6 items-center">
				<Image src={thumbnailSrc} width={400} height={400} alt="" className="rounded-lg" />
				<p className="text-justify indent-4">{modifiedDescription}</p>
			</section>
			<section className="flex flex-col gap-2">
				<h2 className="text-lg md:text-xl font-semibold">Comics</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{formatComicsData().map(({ id, thumbnailSrc, title, redirectUrl }) => (
						<Link href={redirectUrl} key={id}>
							<p className="text-base font-medium">{title}</p>
							<Image src={thumbnailSrc} width={300} height={300} alt="" className="w-full" />
						</Link>
					))}
				</div>
			</section>
		</div>
	)
}
