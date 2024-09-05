export enum PokemonType {
    Normal = "Normal",
    Fire = "Fire",
    Water = "Water",
    Electric = "Electric",
    Grass = "Grass",
    Ice = "Ice",
    Fighting = "Fighting",
    Poison = "Poison",
    Ground = "Ground",
    Flying = "Flying",
    Psychic = "Psychic",
    Bug = "Bug",
    Rock = "Rock",
    Ghost = "Ghost",
    Dragon = "Dragon",
    Dark = "Dark",
    Steel = "Steel",
    Fairy = "Fairy",
}

export const typeAdvantages: { [key in PokemonType]: PokemonType[] } = {
    [PokemonType.Normal]: [],
    [PokemonType.Fire]: [PokemonType.Grass, PokemonType.Ice, PokemonType.Bug, PokemonType.Steel],
    [PokemonType.Water]: [PokemonType.Fire, PokemonType.Ground, PokemonType.Rock],
    [PokemonType.Electric]: [PokemonType.Water, PokemonType.Flying],
    [PokemonType.Grass]: [PokemonType.Water, PokemonType.Ground, PokemonType.Rock],
    [PokemonType.Ice]: [PokemonType.Grass, PokemonType.Ground, PokemonType.Flying, PokemonType.Dragon],
    [PokemonType.Fighting]: [PokemonType.Normal, PokemonType.Ice, PokemonType.Rock, PokemonType.Dark, PokemonType.Steel],
    [PokemonType.Poison]: [PokemonType.Grass, PokemonType.Fairy],
    [PokemonType.Ground]: [PokemonType.Fire, PokemonType.Electric, PokemonType.Poison, PokemonType.Rock, PokemonType.Steel],
    [PokemonType.Flying]: [PokemonType.Grass, PokemonType.Fighting, PokemonType.Bug],
    [PokemonType.Psychic]: [PokemonType.Fighting, PokemonType.Poison],
    [PokemonType.Bug]: [PokemonType.Grass, PokemonType.Psychic, PokemonType.Dark],
    [PokemonType.Rock]: [PokemonType.Fire, PokemonType.Ice, PokemonType.Flying, PokemonType.Bug],
    [PokemonType.Ghost]: [PokemonType.Psychic, PokemonType.Ghost],
    [PokemonType.Dragon]: [PokemonType.Dragon],
    [PokemonType.Dark]: [PokemonType.Psychic, PokemonType.Ghost],
    [PokemonType.Steel]: [PokemonType.Ice, PokemonType.Rock, PokemonType.Fairy],
    [PokemonType.Fairy]: [PokemonType.Fighting, PokemonType.Dragon, PokemonType.Dark],
}