'use client'

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { HiSearch } from 'react-icons/hi'

type SearchBarProps = {
	initialValue: string
	setSearchValue: Dispatch<SetStateAction<string>>
}

export const SearchBar = ({ initialValue = '', setSearchValue }: SearchBarProps) => {
	const [value, setValue] = useState(initialValue)

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setSearchValue(value)
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
