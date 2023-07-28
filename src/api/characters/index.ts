import { AxiosResponse } from 'axios'

import { marvelApi } from '@/api/marvelApi'
import { CharacterDataWrapper } from '@/types'

export const getCharacters = async (nameStartsWith?: string) => {
	const params: { [key: string]: string } = {}

	if (nameStartsWith) {
		params.nameStartsWith = nameStartsWith
	}

	const { data }: AxiosResponse<CharacterDataWrapper> = await marvelApi.get(`/characters`, {
		params,
	})

	return data
}
