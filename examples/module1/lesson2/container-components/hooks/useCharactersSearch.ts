import { useEffect, useState } from 'react';
import { Character } from '../types/Character';

export const useCharactersSearch = (name: string, gender: string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (name || gender) {
      setIsLoading(true);
      fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&gender=${gender}`
      )
        .then((response) => response.json())
        .then((data) => setCharacters(data.results || []))
        .catch((error) => {
          setError('Error fetching data');
          console.error('Error fetching data:', error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [name, gender]);

  return {
    characters,
    isLoading,
    error,
  };
};
