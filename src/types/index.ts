interface Image {
	path: string
	extension: string
}

interface ComicSummary {
	resourceURI: string
	name: string
}

interface ComicList {
	avaiable: number
	returned: number
	collectionURI: string
	items: ComicSummary[]
}

interface StorySummary {
	resourceURI: string
	name: string
	type: string
}

interface StoryList {
	avaiable: number
	returned: number
	collectionURI: string
	items: StorySummary[]
}

interface EventSummary {
	resourceURI: string
	name: string
}

interface EventList {
	avaiable: number
	returned: number
	collectionURI: string
	items: EventSummary[]
}

interface SeriesSummary {
	resourceURI: string
	name: string
}

interface SeriesList {
	avaiable: number
	returned: number
	collectionURI: string
	items: SeriesSummary[]
}

interface Character {
	id: number
	name: string
	description: string
	modified: Date
	resourceURI: string
	urls: string[]
	thumbnail: Image
	comics: ComicList
	stories: StoryList
	events: EventList
	series: SeriesList
}

interface CharacterDataContainer {
	offset: number
	limit: number
	total: number
	count: number
	results: Character[]
}

export interface CharacterDataWrapper {
	code: number
	status: string
	copyright: string
	attributionText: string
	attributionHTML: string
	data: CharacterDataContainer
	etag: string
}

interface CharacterSummary {
	resourceURI: string
	name: string
	role: string
}

interface CharacterList {
	available: number
	returned: number
	collectionURI: string
	items: CharacterSummary[]
}

interface CreatorSummary {
	resourceURI: string
	name: string
	role: string
}

interface CreatorList {
	available: number
	returned: number
	collectionURI: string
	items: CreatorSummary[]
}

interface ComicPrice {
	type: string
	price: number
}

interface ComicDate {
	type: string
	date: Date
}

interface TextObject {
	type: string
	language: string
	text: string
}

interface Comic {
	id: number
	digitalId: number
	title: string
	issueNumber: number
	variantDescription: string
	description: string
	modified: Date
	isbn: string
	upc: string
	diamondCode: string
	ean: string
	issn: string
	format: string
	paceCount: number
	textObjects: TextObject[]
	resourceURI: string
	urls: string[]
	series: SeriesSummary
	variants: ComicSummary[]
	collections: ComicSummary[]
	collectedIssues: ComicSummary[]
	date: ComicDate[]
	prices: ComicPrice[]
	thumbnail: Image
	images: Image[]
	creators: CreatorList
	characters: CharacterList
	stories: StoryList
	events: EventList
}

interface ComicDataContainer {
	offset: number
	limit: number
	total: number
	count: number
	results: Comic[]
}

export interface ComicDataWrapper {
	code: number
	status: string
	copyright: string
	attributionText: string
	attributionHTML: string
	data: ComicDataContainer
	etag: string
}
