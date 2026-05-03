import { useState, useEffect, useCallback } from 'react';
import { itemsService } from '../services/items.service';

export function useItems(filters) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await itemsService.getAll(filters);
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load items.');
    } finally {
      setLoading(false);
    }
  }, [filters?.category, filters?.search]);

  useEffect(() => { fetch(); }, [fetch]);

  const add = useCallback(async (data) => {
    const item = await itemsService.create(data);
    setItems((prev) => [item, ...prev]);
    return item;
  }, []);

  const update = useCallback(async (id, data) => {
    const item = await itemsService.update(id, data);
    setItems((prev) => prev.map((i) => (i._id === id ? item : i)));
    return item;
  }, []);

  const remove = useCallback(async (id) => {
    await itemsService.remove(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
  }, []);

  return { items, loading, error, refresh: fetch, add, update, remove };
}
