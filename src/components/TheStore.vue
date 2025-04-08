<template>
  <page-load />
  <section class="px-[4vw] py-[50px] pt-[150px] min-h-screen w-full">
    <div
      v-if="productsStore.error"
      class="text-center text-[1.5rem] 4k:text-[3rem] text-red-600"
    >
      {{ productsStore.error }}
    </div>
    <div
      v-else-if="displayedAllProducts.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]"
    >
      <div
        v-for="product in displayedAllProducts"
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
    <div v-else class="text-center text-[1.5rem] 4k:text-[3rem] text-gray-600">
      No products available.
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, reactive, watch, onMounted } from "vue";
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

const counters = reactive<Record<string, number>>({});

watch(displayedAllProducts, (newProducts) => {
  newProducts.forEach((product) => {
    if (!(product.id in counters)) {
      counters[product.id] = 1;
    }
  });
});

const increment = (productId: string): void => {
  counters[productId]++;
};

const decrement = (productId: string): void => {
  if (counters[productId] > 1) {
    counters[productId]--;
  }
};
</script>
