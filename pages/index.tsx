// Next
import Head from 'next/head';
// Rect
import { useState, ChangeEvent, useEffect } from 'react';
// Component
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
// Helper
import { getData } from '../utils/helper';
// Types
import { Pokemon } from '../types/pokemonTypes';

type HomeProps = {
  pokemon: Pokemon[];
};

export default function Home({ pokemon }: HomeProps) {
  const [search, setSearch] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[] | null>(
    null
  );

  // Search filter
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearch(searchFieldString);
  };

  // Filter pokemon results based on search
  useEffect(() => {
    if (!pokemon) return; // Same as react

    const newFilteredPokemon = pokemon!.filter(eachPokemon => {
      return eachPokemon.name.toLocaleLowerCase().includes(search);
    });
    setFilteredPokemon(newFilteredPokemon);
  }, [search, pokemon]);

  // Return loading state initially
  if (!pokemon) {
    return <Loading />;
  }

  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name='description' content='Pokedex app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='flex w-full items-center flex-col bg-blue-900 min-h-screen space-y-5 pt-5'>
          <Navbar />
          <input
            className='border-none outline-none p-5 w-[350px] mb-10 h-10'
            placeholder='Search'
            type='search'
            onChange={onSearchChange}
          />
          <div className='flex flex-wrap items-center justify-center'>
            {filteredPokemon?.map(pokemon => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const url = 'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json';
  const pokemon = await getData<Pokemon[]>(url);

  return {
    props: {
      pokemon,
    },
  };
}
