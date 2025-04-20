<template>
  <page-load />
  <div class="container mx-auto px-4 py-8 pt-[120px]">
    <h1 class="text-3xl font-bold mb-6">Search Results for "{{ query }}"</h1>
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
      >
        <RouterLink :to="`/product/${product.id}`">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 class="text-xl font-semibold mb-2 capitalize">
            {{ product.name }}
          </h2>
          <p class="text-gray-600 mb-2">{{ product.description }}</p>
          <p class="text-lg font-bold">{{ formatPrice(product.price) }}</p>
        </RouterLink>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>No products found for "{{ query }}".</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import PageLoad from "@/components/PageLoad.vue";
import { useProductsStore } from "@/stores/products";
import { formatPrice } from "@/utils/priceFormat";

const route = useRoute();
const productsStore = useProductsStore();

const query = computed(() => route.query.query?.toString().toLowerCase() || "");

const filteredProducts = computed(() => {
  if (!query.value) return [];
  return productsStore.products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.value) ||
      product.description.toLowerCase().includes(query.value)
  );
});
</script>

<style scoped>
.product-card {
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
