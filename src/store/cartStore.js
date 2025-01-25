import { create } from 'zustand';
import axios from 'axios';

export const useCartStore = create((set) => ({
  items: [],
  fetchCartItems: async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart');
      set({ items: response.data });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  },
  addItem: async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/cart', { id: product.id, quantity: 1 });
      set({ items: response.data });
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  },
  removeItem: async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/${productId}`);
      set({ items: response.data });
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  },
  updateQuantity: async (productId, quantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/cart/${productId}`, { quantity });
      set({ items: response.data });
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
    }
  },
  clearCart: async () => {
    try {
      await axios.delete('http://localhost:5000/cart');
      set({ items: [] });
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
    }
  },
}));