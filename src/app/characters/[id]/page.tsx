'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { HiArrowNarrowLeft } from 'react-icons/hi'

import { useCharacter } from '@/hooks/useCharacter'
import { useCharacterComics } from '@/hooks/useCharacterComics'

export default function Character() {
	const { back } = useRouter()
	const { id } = useParams()

	const {
		data: characterData,
		isLoading: isCharacterLoading,
		error: errorCharacter,
	} = useCharacter(id as string)

	const {
		data: comicsData,
		total: totalComics,
		isLoading: isComicsLoading,
		error: errorComics,
	} = useCharacterComics(id as string)

	if (isCharacterLoading || isComicsLoading) return <p>Loading...</p>

	if (errorCharacter || errorComics) return <p>error</p>

	if (!characterData || !comicsData) return <p>character not found</p>

	return (
		<div className="flex flex-col gap-4">
			<button className="flex items-center gap-2 text-lg" onClick={back}>
				<HiArrowNarrowLeft className="text-2xl md:text-4xl text-gray-800" />
				Go back
			</button>
			<h1 className="text-2xl md:text-3xl font-semibold">{characterData.name}</h1>
			<section className="flex flex-col gap-2 sm:flex-row sm:gap-6 items-center">
				<Image
					src={characterData.thumbnail}
					width={400}
					height={400}
					alt=""
					className="rounded-lg"
				/>
				<p className="text-justify indent-4">{characterData.description}</p>
			</section>
			<section className="flex flex-col gap-2">
				<h2 className="text-lg md:text-xl font-semibold">Comics</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{totalComics > 0 ? (
						comicsData.map(({ id, thumbnailSrc, title, redirectUrl }) => (
							<Link href={redirectUrl} key={id}>
								<p className="text-base font-medium">{title}</p>
								<Image src={thumbnailSrc} width={300} height={300} alt="" className="w-full" />
							</Link>
						))
					) : (
						<p>comics not available</p>
					)}
				</div>
			</section>
		</div>
	)
}
