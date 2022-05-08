import { Pokemon } from '../types/pokemonTypes';

type Props = {
  pokemon: Pokemon;
};

export default function Card({ pokemon }: Props) {
  // Makes the first letter of a string capitalized
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { id, image } = pokemon;
  const name = capitalizeFirstLetter(pokemon.name);

  return (
    <div className='rounded p-5 bg-red-500 flex flex-col items-center space-y-2 m-5'>
      <div className='flex space-x-2'>
        <h1 className='text-xl md:text-2xl'>{name}</h1>
        <h1>#{id}</h1>
      </div>
      <img
        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${image}`}
        alt={`${name}`}
        className='w-60 h-60 object-cover'
      />
    </div>
  );
}
