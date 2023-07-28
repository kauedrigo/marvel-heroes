'use client'

import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { HiSearch } from 'react-icons/hi'

import { getCharacters } from '@/api/characters'
import { CharacterDataWrapper } from '@/types'

type SearchBarProps = {
	characterDataWrapper: CharacterDataWrapper
}

export const SearchBar = ({ characterDataWrapper }: SearchBarProps) => {
	const [value, setValue] = useState('')

	const { refetch } = useQuery({
		queryKey: ['characters', 'list'],
		queryFn: () => getCharacters(value),
		initialData: characterDataWrapper,
	})

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		refetch()
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return (
		<form onSubmit={handleSubmit} className="relative max-w-sm">
			<input
				type="text"
				placeholder="Search by name"
				className="pl-3 h-11 items-center pr-14 rounded-lg border-slate-200 border-2 border-solid w-full focus:outline-blue-400"
				value={value}
				onChange={handleChange}
			/>
			<button
				type="submit"
				className="flex absolute top-0 right-0 w-11 h-11 items-center justify-center"
			>
				<HiSearch className="text-slate-400 text-2xl" />
			</button>
		</form>
	)
}
