interface CharacterThumbnail {
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

export interface Character {
	id: number
	name: string
	description: string
	modified: Date
	resourceURI: string
	urls: string[]
	thumbnail: CharacterThumbnail
	comics: ComicList
	stories: StoryList
	events: EventList
	series: SeriesList
}

export interface CharacterDataContainer {
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
