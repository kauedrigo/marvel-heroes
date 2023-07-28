import { AxiosResponse } from 'axios'

import { marvelApi } from '@/api/marvelApi'
import { CharacterDataWrapper } from '@/types'

export const getCharacters = async () => {
	const { data }: AxiosResponse<CharacterDataWrapper> = await marvelApi.get(`/characters`)

	return data
}
