// export interface Pokemon {
//     id: number
//     name: PokemonName
//     type: string[]
//     base: PokemonBase
//     species: string
//     description: string
//     evolution?: { prev: [string, string] }
//     profile: PokemonProfile
//     image: PokemonImage
// }

// interface PokemonName {
//     english: string
//     japanese: string
//     chinese: string
//     french: string
// }

// interface PokemonProfile {
//     height: string
//     weight: string
//     gender: string
//     ability: [string, string][]
// }

// interface PokemonImage {
//     sprite: string
//     thumbnail: string
//     hires: string
// }

// interface PokemonBase {
//     HP: number
//     Attack: number
//     Defense: number
//     Speed: number
// }

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