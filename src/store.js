import { create } from 'zustand';

const useStore = create(set => ({
  selectedMarker: null,
  setSelectedMarker: marker => set({ selectedMarker: marker }),
  clearSelectedMarker: () => set({ selectedMarker: null }),
}));

export default useStore;
