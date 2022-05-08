interface Pokemon {
 id: number
 name: string;
 image: string;
}

export type IndividualPokemon = {
 id: number;
 name: string;
 sprites: {
  front_default: string;
 }
 types: {
    type: {
     name: string;
   }
  }[]
 weight: number;
 height: number;
 abilities: {
  ability: {
   name: string;
  }
 }[]
}