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

  allPlaceLists: [],
  setAllPlaceLists: lists => set({ allPlaceLists: lists }),

  hotPlaceLists: [],
  loading: false,
  error: null,
  setHotPlaceLists: lists => set({ hotPlaceLists: lists }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),

  savedUserInfo: null,
  setSavedUserInfo: user => set({ savedUserInfo: user }),

  mapCenter: {
    lat: 37.5665,
    lng: 126.978,
  },
  setMapCenter: center => set({ mapCenter: center }),

  mapLevel: 6,
  setMapLevel: level => set({ mapLevel: level }),

  isLoginModalOpen: false,
  setIsLoginModalOpen: state => set({ isLoginModalOpen: state }),
}));

export default useStore;
