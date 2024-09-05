-- CreateTable
CREATE TABLE "UserPokemons" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pokemonIds" INTEGER[],

    CONSTRAINT "UserPokemons_pkey" PRIMARY KEY ("id")
);
