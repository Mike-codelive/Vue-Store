<template>
  <page-load />
  <section class="px-[4vw] py-[50px] pt-[150px] min-h-screen w-full">
    <div
      v-if="productsStore.error"
      class="text-center text-[1.5rem] 4k:text-[3rem] text-red-600"
    >
      {{ productsStore.error }}
    </div>
    <div v-else class="flex flex-col lg:flex-row gap-[2rem]">
      <aside class="lg:w-1/4 w-full">
        <h2
          class="text-[1.5rem] 4k:text-[3rem] font-bold text-[var(--main-blue)] mb-6"
        >
          Filters
        </h2>
        <div class="mb-8">
          <h3
            class="text-[1.25rem] 4k:text-[2.5rem] font-semibold text-[var(--main-blue)] mb-2"
          >
            Price Range
          </h3>
          <div class="flex items-center gap-4">
            <input
              v-model="rawPriceRange.min"
              type="number"
              placeholder="Min"
              class="w-1/2 p-2 border border-gray-300 rounded-lg text-[1rem] 4k:text-[2rem]"
            />
            <span class="text-gray-600">-</span>
            <input
              v-model="rawPriceRange.max"
              type="number"
              placeholder="Max"
              class="w-1/2 p-2 border border-gray-300 rounded-lg text-[1rem] 4k:text-[2rem]"
            />
          </div>
        </div>
        <div class="mb-8">
          <h3
            class="text-[1.25rem] 4k:text-[2.5rem] font-semibold text-[var(--main-blue)] mb-2"
          >
            Color
          </h3>
          <div class="grid grid-cols-3">
            <div
              v-for="color in availableColors"
              :key="color"
              class="flex items-center mb-2"
            >
              <input
                type="checkbox"
                :id="`color-${color}`"
                :value="color"
                v-model="selectedColors"
                class="mr-2 h-5 w-5 4k:h-8 4k:w-8"
              />
              <label
                :for="`color-${color}`"
                class="flex items-center text-[1rem] 4k:text-[2rem] text-gray-600"
              >
                <span
                  class="inline-block w-5 h-5 4k:w-8 4k:h-8 rounded-full mr-2"
                  :style="{ backgroundColor: color }"
                ></span>
              </label>
            </div>
          </div>
        </div>
        <div class="mb-8">
          <h3
            class="text-[1.25rem] 4k:text-[2.5rem] font-semibold text-[var(--main-blue)] mb-2"
          >
            Category
          </h3>
          <select
            v-model="selectedCategory"
            class="w-full p-2 border border-gray-300 rounded-lg text-[1rem] 4k:text-[2rem]"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in availableCategories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </aside>
      <div class="lg:w-3/4 w-full">
        <div
          v-if="filteredProducts.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-[200px] object-cover"
            />
            <div class="p-4">
              <h3
                class="text-[1.25rem] font-bold text-[var(--main-blue)] uppercase mb-[1rem]"
              >
                {{ product.name }}
              </h3>
              <div class="flex gap-2 mb-2">
                <button
                  v-for="color in Array.isArray(product.colors)
                    ? product.colors
                    : [product.colors]"
                  :key="color"
                  class="w-6 h-6 rounded-full border-2"
                  :class="{
                    'border-gray-400':
                      selectedProductColors[product.id] !== color,
                    'border-[var(--main-blue)]':
                      selectedProductColors[product.id] === color,
                  }"
                  :style="{ backgroundColor: color }"
                  @click="selectProductColor(product.id, color)"
                ></button>
              </div>
              <div class="flex justify-between items-center mb-[.5rem]">
                <p class="text-[1rem] text-gray-600">
                  {{ formatPrice(product.price) }}
                </p>
                <div class="counter flex items-center gap-2">
                  <button
                    @click="decrement(product.id)"
                    class="counter-btn bg-gray-200 text-[var(--main-blue)] hover:bg-gray-300 rounded-full cursor-pointer"
                    :disabled="counters[product.id] === 1"
                    aria-label="Decrement quantity"
                  >
                    <Minus />
                  </button>
                  <span
                    class="text-[1rem] font-semibold text-[var(--main-blue)] w-[1.5rem] text-center"
                  >
                    {{ counters[product.id] }}
                  </span>
                  <button
                    @click="increment(product.id)"
                    class="counter-btn bg-gray-200 text-[var(--main-blue)] hover:bg-gray-300 rounded-full cursor-pointer"
                    aria-label="Increment quantity"
                  >
                    <Plus />
                  </button>
                </div>
              </div>
              <div class="text-center">
                <Button
                  text="Add To Cart"
                  text-color="black"
                  flair-color="white"
                  border-color="var(--main-blue)"
                  bg-color="var(--main-blue)"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center text-[1.5rem] 4k:text-[3rem] text-gray-600"
        >
          No products match your filters.
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref, computed, reactive, watch, onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
import PageLoad from "@/components/PageLoad.vue";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/priceFormat";
import { Plus, Minus } from "lucide-vue-next";
import Button from "@/components/Button.vue";
const productsStore = useProductsStore();
onMounted(() => {
  if (!productsStore.products.length) {
    productsStore.fetchProducts();
  }
});
const displayedAllProducts = computed<Product[]>(() => {
  return productsStore.products;
});
const availableColors = computed(() => {
  const colors = displayedAllProducts.value
    .flatMap((product) =>
      Array.isArray(product.colors) ? product.colors : [product.colors]
    )
    .filter((color): color is string => !!color);
  return [...new Set(colors)];
});
const availableCategories = computed(() => {
  const categories = displayedAllProducts.value
    .map((product) => product.category)
    .filter((category): category is string => !!category);
  return [...new Set(categories)];
});
const rawPriceRange = reactive({ min: "", max: "" });
const priceRange = computed({
  get() {
    return {
      min: rawPriceRange.min === "" ? 0 : Number(rawPriceRange.min) * 100,
      max:
        rawPriceRange.max === "" ? Infinity : Number(rawPriceRange.max) * 100,
    };
  },
  set(newValue: { min: number; max: number }) {
    rawPriceRange.min = newValue.min === 0 ? "" : String(newValue.min / 100);
    rawPriceRange.max =
      newValue.max === Infinity ? "" : String(newValue.max / 100);
  },
});
const selectedColors = ref<string[]>([]);
const selectedCategory = ref<string>("");
const filteredProducts = computed<Product[]>(() => {
  return displayedAllProducts.value.filter((product) => {
    const withinPriceRange =
      Number(product.price) >= priceRange.value.min &&
      Number(product.price) <= priceRange.value.max;
    const matchesColor =
      selectedColors.value.length === 0 ||
      (product.colors &&
        (Array.isArray(product.colors)
          ? product.colors.some((color) => selectedColors.value.includes(color))
          : selectedColors.value.includes(product.colors)));
    const matchesCategory =
      !selectedCategory.value ||
      (product.category && product.category === selectedCategory.value);
    const passesFilter = withinPriceRange && matchesColor && matchesCategory;
    return passesFilter;
  });
});
const counters = reactive<Record<string, number>>({});
const selectedProductColors = reactive<Record<string, string>>({});
watch(displayedAllProducts, (newProducts) => {
  newProducts.forEach((product) => {
    if (!(product.id in counters)) {
      counters[product.id] = 1;
    }
    if (!(product.id in selectedProductColors) && product.colors) {
      selectedProductColors[product.id] = Array.isArray(product.colors)
        ? product.colors[0]
        : product.colors;
    }
  });
});
const selectProductColor = (productId: string, color: string) => {
  selectedProductColors[productId] = color;
};
const increment = (productId: string): void => {
  counters[productId]++;
};
const decrement = (productId: string): void => {
  if (counters[productId] > 1) {
    counters[productId]--;
  }
};
</script>
