'use client'

import { getCharacters } from '@/api/characters'

export default function Home() {
	const handleGetHeroes = async () => {
		const heroes = await getCharacters()
		console.log('🚀 ~ heroes:', heroes)
	}

	return (
		<div>
			<button className="px-4 py-2 bg-blue-500 rounded-lg" onClick={handleGetHeroes}>
				get heroes
			</button>
		</div>
	)
}
