interface Pokemon {
  id: number
  name: string;
  image: string;
 }

 export type IndividualPokemon = {
  name: string;
  type: string[]
  stats: {
   name: string;
   value: number;
  }[]
  image: string;
 }