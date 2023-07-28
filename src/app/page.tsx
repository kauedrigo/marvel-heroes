import axios from 'axios'

import { HeroesList } from '@/components/heroes-list'
import { getMarvelAuthenticationParams } from '@/utils'
import { SearchBar } from '@/components/search-bar'

export default async function Home() {
	const authenticationParams = getMarvelAuthenticationParams()

	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_MARVEL_API_URL}/characters`, {
		params: { ...authenticationParams },
	})

	return (
		<div className="flex flex-col gap-4">
			<SearchBar characterDataWrapper={data} />
			<HeroesList characterDataWrapper={data} />
		</div>
	)
}
