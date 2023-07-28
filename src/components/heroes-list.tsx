'use client'

import { useQuery } from '@tanstack/react-query'

import { CharacterDataWrapper } from '@/types'
import { getCharacters } from '@/api/characters'

type HeroesListProps = {
	characterDataWrapper: CharacterDataWrapper
}

export const HeroesList = ({ characterDataWrapper }: HeroesListProps) => {
	const { data } = useQuery({
		queryKey: ['characters', 'list'],
		queryFn: getCharacters,
		initialData: characterDataWrapper,
	})

	console.log(data)

	return <p>heroes</p>
}
