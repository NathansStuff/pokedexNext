// Next
import Image from 'next/image';
import Link from 'next/link';
// Helpers
import { baseUrl, capitalizeFirstLetter } from '../utils/helper';
//Types
import { Pokemon } from '../types/pokemonTypes';

type Props = {
  pokemon: Pokemon;
};

export default function Card({ pokemon }: Props) {
  // Makes the first letter of a string capitalized
  const { id, image } = pokemon;
  const name = capitalizeFirstLetter(pokemon.name);

  return (
    <Link href={`/pokemon/${id}`}>
      <div className='rounded p-5 bg-red-500 flex flex-col items-center space-y-2 m-5 cursor-pointer'>
        <div className='flex space-x-2'>
          <h1 className='text-xl md:text-2xl'>{name}</h1>
          <h1>#{id}</h1>
        </div>
        <Image
          src={`${baseUrl}/${image}`}
          alt={`${name}`}
          className='w-60 h-60 object-cover'
          width={200}
          height={200}
        />
      </div>
    </Link>
  );
}
