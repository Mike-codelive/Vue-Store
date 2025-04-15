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
      v-else-if="!product"
      class="text-center text-[1.5rem] 4k:text-[3rem] text-gray-600"
    >
      Product not found.
    </div>
    <div v-else class="flex flex-col lg:flex-row gap-[2rem]">
      <div class="lg:w-1/2 w-full">
        <img
          :src="product.images[0].url"
          :alt="product.name"
          class="w-full h-[400px] object-cover rounded-lg"
        />
      </div>
      <div class="lg:w-1/2 w-full">
        <h1
          class="text-[2rem] 4k:text-[4rem] font-bold text-[var(--main-blue)] mb-4 capitalize"
        >
          {{ product.name }}
        </h1>
        <p class="text-[1.5rem] 4k:text-[3rem] text-gray-600 mb-2">
          {{ formatPrice(product.price) }}
        </p>
        <p class="text-[1rem] 4k:text-[2rem] text-gray-600 mb-4">
          {{ product.description }}
        </p>
        <p class="text-[1rem] 4k:text-[2rem] text-gray-600 mb-2">
          <strong>Category:</strong> {{ product.category }}
        </p>
        <p class="text-[1rem] 4k:text-[2rem] text-gray-600 mb-2">
          <strong>Company:</strong> {{ product.company }}
        </p>
        <p class="text-[1rem] 4k:text-[2rem] text-gray-600 mb-2">
          <strong>Stock:</strong> {{ product.stock }}
        </p>
        <p class="text-[1rem] 4k:text-[2rem] text-gray-600 mb-2">
          <strong>Rating:</strong> {{ product.stars }} ({{ product.reviews }}
          reviews)
        </p>
        <p class="text-[1rem] 4k:text-[2rem] text-gray-600 mb-4">
          <strong>Shipping:</strong>
          {{ product.shipping ? "Free Shipping" : "Shipping Fee Applies" }}
        </p>
        <div class="mb-4">
          <h3
            class="text-[1.25rem] 4k:text-[2.5rem] font-semibold text-[var(--main-blue)] mb-2"
          >
            Colors
          </h3>
          <div class="flex gap-4">
            <button
              v-for="color in Array.isArray(product.colors)
                ? product.colors
                : [product.colors]"
              :key="color"
              class="w-6 h-6 rounded-full cursor-pointer"
              :class="{
                'outline outline-2 outline-gray-400 outline-offset-1':
                  selectedColor !== color,
                'outline-4 outline-[var(--main-blue)] outline-offset-1':
                  selectedColor === color,
              }"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            ></button>
          </div>
        </div>
        <div class="flex items-center gap-4 mb-4">
          <div class="counter flex items-center gap-2">
            <button
              @click="decrement"
              class="counter-btn bg-gray-200 text-[var(--main-blue)] hover:bg-gray-300 rounded-full cursor-pointer"
              :disabled="counter === 1"
              aria-label="Decrement quantity"
            >
              <Minus />
            </button>
            <span
              class="text-[1rem] font-semibold text-[var(--main-blue)] w-[1.5rem] text-center"
            >
              {{ counter }}
            </span>
            <button
              @click="increment"
              class="counter-btn bg-gray-200 text-[var(--main-blue)] hover:bg-gray-300 rounded-full cursor-pointer"
              aria-label="Increment quantity"
            >
              <Plus />
            </button>
          </div>
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
  </section>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import PageLoad from "@/components/PageLoad.vue";
import { formatPrice } from "@/utils/priceFormat";
import { Plus, Minus } from "lucide-vue-next";
import Button from "@/components/Button.vue";
defineProps<{ id: string }>();
const route = useRoute();
const productsStore = useProductsStore();
const productId = computed(() => route.params.id as string);
const product = computed(() => {
  return productsStore.singleProduct;
});
onMounted(() => {
  if (productId.value) {
    productsStore.fetchSingleProduct(productId.value);
  }
});
const counter = ref(1);
const selectedColor = ref<string>("");
watch(product, (newProduct) => {
  if (newProduct && newProduct.colors) {
    selectedColor.value = Array.isArray(newProduct.colors)
      ? newProduct.colors[0]
      : newProduct.colors;
  }
});
const increment = () => {
  counter.value++;
};
const decrement = () => {
  if (counter.value > 1) {
    counter.value--;
  }
};
</script>
