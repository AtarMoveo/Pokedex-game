export interface Pokemon {
    id: number
    name: string
    image: string
    thumbnail: string
    description: string
    powerLevel: number
    hpLevel: number
    currHpLevel: number
    height: string
    weight: string
    type: string[]
    speed: number
}

export interface SortBy {
    name?: 1 | -1
    power?: 1 | -1
    hp?: 1 | -1
}

export enum SortLabel {
    NameAsc = 'Name A-Z',
    NameDesc = 'Name Z-A',
    PowerAsc = 'Power (Low to high)',
    PowerDesc = 'Power (High to low)',
    HPAsc = 'HP (Low to high)',
    HPDesc = 'HP (High to low)',
  }

export interface SortOption {
    label: SortLabel
    sortBy: SortBy
}