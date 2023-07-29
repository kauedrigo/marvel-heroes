import { AxiosResponse } from 'axios'

import { marvelApi } from '@/api/marvelApi'
import { CharacterDataWrapper } from '@/types'
import { CHARACTERS_PER_PAGE } from '@/constants'

type GetCharactersParams = {
	nameStartsWith?: string
	page: number
}

export const getCharacters = async ({ nameStartsWith, page }: GetCharactersParams) => {
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
