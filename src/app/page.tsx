import axios from 'axios'

import { HeroesList } from '@/components/heroes-list'
import { getMarvelAuthenticationParams } from '@/utils'

export default async function Home() {
	const authenticationParams = getMarvelAuthenticationParams()

	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MARVEL_API_URL}/characters`, {
		params: { ...authenticationParams },
	})

	return <HeroesList characterDataWrapper={data} />
}
