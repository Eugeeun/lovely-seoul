import { create } from 'zustand';

const useStore = create(set => ({
  selectedPlace: null,
  setSelectedPlace: marker => set({ selectedPlace: marker }),
  clearSelectedPlace: () => set({ selectedPlace: null }),

  placeDetailInfo: null,
  setPlaceDetailInfo: placeInfo => set({ placeDetailInfo: placeInfo }),

  selectedEvent: null,
  setSelectedEvent: marker => set({ selectedEvent: marker }),
  clearSelectedEvent: () => set({ selectedEvent: null }),

  hotPlaceLists: [],
  loading: false,
  error: null,
  setHotPlaceLists: lists => set({ hotPlaceLists: lists }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
}));

export default useStore;
