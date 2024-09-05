/*
  Warnings:

  - The primary key for the `UserPokemons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserPokemons` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonIds` on the `UserPokemons` table. All the data in the column will be lost.
  - Added the required column `pokemonId` to the `UserPokemons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPokemons" DROP CONSTRAINT "UserPokemons_pkey",
DROP COLUMN "id",
DROP COLUMN "pokemonIds",
ADD COLUMN     "pokemonId" INTEGER NOT NULL,
ADD CONSTRAINT "UserPokemons_pkey" PRIMARY KEY ("userId", "pokemonId");

-- AddForeignKey
ALTER TABLE "UserPokemons" ADD CONSTRAINT "UserPokemons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPokemons" ADD CONSTRAINT "UserPokemons_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
