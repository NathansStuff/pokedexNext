// Next
import Image from 'next/image';
import Head from 'next/head';
// Components
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
// Helperss
import { getData, baseUrl } from '../../utils/helper';
// Types
import { GetStaticProps } from 'next';
import { IndividualPokemon, Pokemon } from '../../types/pokemonTypes';

interface Props {
  pokemon: IndividualPokemon;
  id: string;
}

export default function PokemonPage({ pokemon, id }: Props) {
  if (!pokemon) return <Loading />; // same as react

  const { name, image, stats, type } = pokemon;

  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <main className='flex flex-col  w-full  items-center bg-blue-900 min-h-screen space-y-5'>
        <Navbar />
        <div className='bg-red-500'>
          <div className='flex space-x-2 w-full justify-center pt-5'>
            <h1 className='text-xl md:text-2xl'>{name}</h1>
            <h1>#{id}</h1>
          </div>
          <div className='rounded p-5 flex space-x-10 m-5 justify-center'>
            <Image
              src={`${baseUrl}/${image}`}
              alt={`${name}`}
              className='w-60 h-60 object-cover'
              width={200}
              height={200}
            />
            <div>
              <h2 className='text-xl justify-center flex pb-5'>Stats</h2>
              {stats.map((stat, index) => (
                <div key={index} className='flex justify-between space-x-5'>
                  <div>
                    <p>{stat.name}</p>
                  </div>
                  <div>
                    <p>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className='text-xl justify-center flex pb-5'>Types</h2>
              <div>
                {type.map((each, index) => (
                  <div key={index}>
                    <p>{each}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths = async () => {
  const url = `${baseUrl}/index.json`;
  const pokemon = await getData<Pokemon[]>(url);

  const paths = pokemon.map(pokemon => ({
    params: {
      id: pokemon.id.toString(),
    },
  }));

  return {
    paths,
    fallback: 'blocking', // 404 Page on invalid ID
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pokemon = await getData<IndividualPokemon>(
    `${baseUrl}/pokemon/${params.id}.json`
  );
  if (!pokemon) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pokemon,
      id: params.id,
    },
    // revalidate: 60, //after 60 seconds, update old cached version
  };
};
