import classNames from 'classnames'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { CHARACTERS_PER_PAGE } from '@/constants'

type PaginationProps = {
	page: number
	setPage: Dispatch<SetStateAction<number>>
	total: number
	siblingsCount?: number
}

export const Pagination = ({ page, setPage, total, siblingsCount = 1 }: PaginationProps) => {
	const totalPages = Math.ceil(total / CHARACTERS_PER_PAGE)

	const handlePreviousPage = () => {
		setPage((prev) => prev - 1)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleNextPage = () => {
		setPage((prev) => prev + 1)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const paginationItems = useMemo(() => {
		const noDots = totalPages <= 5 + 2 * siblingsCount

		const handleSetPage = (value: number) => {
			setPage(value)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}

		const printPaginationItems = (start: number, end: number) => {
			const items: JSX.Element[] = []

			for (let index = start; index <= end; index++) {
				const isSelected = page === index
				items.push(
					<button
						key={index}
						aria-label={`show page ${index}`}
						aria-current={isSelected && 'page'}
						onClick={() => handleSetPage(index)}
						className={classNames(
							'w-7 h-7 rounded-md font-semibold md:text-xl md:w-8 md:h-8',
							isSelected && 'bg-red-600 text-zinc-50',
						)}
					>
						{index}
					</button>,
				)
			}

			return items
		}

		const printDot = (key: number) => <p key={key}>...</p>

		if (noDots) return printPaginationItems(1, totalPages)

		if (page <= 3 + siblingsCount) {
			return [
				...printPaginationItems(1, 3 + 2 * siblingsCount),
				printDot(totalPages - 1),
				printPaginationItems(totalPages, totalPages),
			]
		}

		if (page > totalPages - (3 + siblingsCount)) {
			return [
				printPaginationItems(1, 1),
				printDot(2),
				...printPaginationItems(totalPages - 2 * (1 + siblingsCount), totalPages),
			]
		}

		return [
			printPaginationItems(1, 1),
			printDot(2),
			...printPaginationItems(page - siblingsCount, page + siblingsCount),
			printDot(totalPages),
			printPaginationItems(totalPages, totalPages),
		]
	}, [page, totalPages, siblingsCount, setPage])

	return (
		<div
			className={classNames('justify-center gap-2 w-full', total > 0 ? 'flex' : 'hidden')}
			role="navigation"
		>
			<button aria-label="previous list page" onClick={handlePreviousPage} disabled={page <= 1}>
				<HiChevronLeft
					className={classNames(
						'text-2x md:text-3xl',
						page <= 1 ? 'text-gray-400' : 'text-gray-800 cursor-pointer',
					)}
					aria-hidden="true"
					focusable="false"
				/>
			</button>
			{paginationItems}
			<button aria-label="next list page" onClick={handleNextPage} disabled={page >= totalPages}>
				<HiChevronRight
					className={classNames(
						'text-2x md:text-3xl',
						page >= totalPages ? 'text-gray-400' : 'text-gray-800 cursor-pointer',
					)}
					aria-hidden="true"
					focusable="false"
				/>
			</button>
		</div>
	)
}
