import { createHash } from 'crypto'

export const getMarvelAuthenticationParams = () => {
	const ts = new Date().getTime()
	const apikey = process.env.MARVEL_PUBLIC_KEY
	const privatekey = process.env.MARVEL_PRIVATE_KEY ?? ''

	const stringToHash = ts + privatekey + apikey

	const hash = createHash('md5').update(stringToHash).digest('hex')

	return { ts, apikey, hash }
}
