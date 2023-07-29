import { AxiosResponse } from 'axios'

import { marvelApi } from '@/api/marvelApi'
import { CHARACTERS_PER_PAGE } from '@/constants'
import { CharacterDataWrapper, ComicDataWrapper } from '@/types'

type GetCharactersListParams = {
	nameStartsWith?: string
	page: number
}

export const getCharactersList = async ({ nameStartsWith, page }: GetCharactersListParams) => {
	const params: { [key: string]: string | number } = {}

	if (nameStartsWith) {
		params.nameStartsWith = nameStartsWith
	}

	params.offset = (page - 1) * CHARACTERS_PER_PAGE

	const { data }: AxiosResponse<CharacterDataWrapper> = await marvelApi.get(`/characters`, {
		params,
	})

	return data
}

export const getCharacter = async (id: string) => {
	const { data }: AxiosResponse<CharacterDataWrapper> = await marvelApi.get(`/characters/${id}`)

	return data
}

export const getCharacterComics = async (id: string) => {
	const { data }: AxiosResponse<ComicDataWrapper> = await marvelApi.get(`/characters/${id}/comics`)

	return data
}
