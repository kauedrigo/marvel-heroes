import { AxiosResponse } from 'axios'

import { marvelApi } from '@/api/marvelApi'

export const getCharacters = async () => {
	const { data }: AxiosResponse = await marvelApi.get(`/characters`)

	return data
}
