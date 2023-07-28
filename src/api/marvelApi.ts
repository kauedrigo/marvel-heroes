import axios from 'axios'

export const marvelApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_MARVEL_API_URL })

marvelApi.interceptors.request.use(async (config) => {
	const { data } = await axios.get(`/api/marvel-authentication`)

	config.params = { ...config.params, ...data }
	return config
})
