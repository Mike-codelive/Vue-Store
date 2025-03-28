import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavbarStore = defineStore("navbar", () => {
  const isScrolledPastHero = ref(false);

  const setScrolledPastHero = (value: boolean) => {
    isScrolledPastHero.value = value;
  };

  return { isScrolledPastHero, setScrolledPastHero };
});
