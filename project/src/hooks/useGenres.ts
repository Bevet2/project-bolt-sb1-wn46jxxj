import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Genre } from '../types/database';

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data, error } = await supabase
          .from('genres')
          .select('*')
          .order('name');

        if (error) throw error;
        setGenres(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch genres');
      } finally {
        setLoading(false);
      }
    }

    fetchGenres();
  }, []);

  return { genres, loading, error };
}