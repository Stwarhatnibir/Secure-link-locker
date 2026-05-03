import React, { useState, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../hooks/useItems';
import { CATEGORIES } from '../utils/categories';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import EmptyState from '../components/EmptyState';

export default function DashboardPage() {
  const { user } = useAuth();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const filters = useMemo(() => ({
    category: category !== 'all' ? category : undefined,
    search: search || undefined,
  }), [category, search]);

  const { items, loading, error, add, update, remove } = useItems(filters);

  const handleSearch = useCallback((val) => {
    setSearchInput(val);
    const timeout = setTimeout(() => setSearch(val), 300);
    return () => clearTimeout(timeout);
  }, []);

  function openAdd() { setEditItem(null); setModalOpen(true); }
  function openEdit(item) { setEditItem(item); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setEditItem(null); }

  async function handleSave(data) {
    if (editItem) {
      await update(editItem._id, data);
    } else {
      await add(data);
    }
    closeModal();
  }

  async function handleDelete(id) {
    await remove(id);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl text-slate-100">Your Vault</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {items.length} {items.length === 1 ? 'item' : 'items'} stored
            </p>
          </div>
          <Button onClick={openAdd} className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Item
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar value={searchInput} onChange={handleSearch} />
        </div>

        <CategoryFilter
          categories={CATEGORIES}
          active={category}
          onChange={setCategory}
        />

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-400 text-sm">{error}</div>
          ) : items.length === 0 ? (
            <EmptyState onAdd={openAdd} hasSearch={!!search} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 slide-up">
              {items.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {modalOpen && (
        <ItemModal
          item={editItem}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
