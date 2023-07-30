'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { HeroesList } from '@/components/heroes-list'
import { Pagination } from '@/components/pagination'
import { SearchBar } from '@/components/search-bar'
import { useCharactersList } from '@/hooks/useCharactersList'

export default function Home() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const search = searchParams.get('nameStartsWith') ?? ''
	const pagination = searchParams.get('pagination') ?? 1

	const [nameStartsWith, setNameStartsWith] = useState(search)
	const [page, setPage] = useState(Number(pagination))

	useEffect(() => {
		let queryString = `?`
		if (nameStartsWith === search) {
			queryString += `pagination=${page}`
		} else {
			setPage(1)
			queryString += `pagination=${1}`
		}
		if (nameStartsWith) {
			queryString += `&nameStartsWith=${nameStartsWith}`
		}
		router.push(pathname + queryString)
	}, [nameStartsWith, page, pathname, router, search])

	const { total } = useCharactersList({ nameStartsWith, page })

	return (
		<div className="flex flex-col gap-4">
			<SearchBar initialValue={nameStartsWith} setSearchValue={setNameStartsWith} />
			<HeroesList nameStartsWith={nameStartsWith} page={page} />
			<Pagination page={page} setPage={setPage} total={total} />
		</div>
	)
}
