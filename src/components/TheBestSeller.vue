<template>
  <section class="relative">
    <div
      class="flex flex-col md:flex-row gap-[2rem] py-[50px] px-[4vw] 2xl:mt-[8rem] text-[var(--main-blue)]"
    >
      <h2
        ref="heading"
        class="text-[2.5rem] 4k:text-[6rem] font-extrabold w-full md:w-[calc(60%-1rem)]"
      >
        Elegant design should inspire and elevate every space.
      </h2>
      <p
        ref="paragraph"
        class="w-full text-[1.5rem] 4k:text-[3rem] md:w-[calc(40%-1rem)]"
      >
        Our showroom is nestled in the heart of the city. Visit us to explore
        curated pieces, find inspiration, or bring timeless elegance to your
        home. With exclusive collections available online, there’s something for
        every style and space.
      </p>
    </div>
    <section class="relative overflow-hidden min-h-[125vh] 2xl:min-h-[132vh]">
      <div class="Collection_Display_Back">
        <div class="Marquee_Content reverse">
          <span
            v-for="index in 8"
            :key="index"
            :class="{ inverted: index % 4 === 0 }"
            class="marquee-item font-extrabold text-[var(--main-blue)] text-[8rem] mx-[1rem]"
          >
            Bestsellers
          </span>
        </div>
        <div class="Marquee_Content">
          <span
            v-for="index in 8"
            :key="index"
            :class="{ inverted: index % 4 === 0 }"
            class="marquee-item font-extrabold text-[var(--main-blue)] text-[8rem] mx-[1rem]"
          >
            Bestsellers
          </span>
        </div>
        <div class="Marquee_Content reverse">
          <span
            v-for="index in 8"
            :key="index"
            :class="{ inverted: index % 4 === 0 }"
            class="marquee-item font-extrabold text-[var(--main-blue)] text-[8rem] mx-[1rem]"
          >
            Bestsellers
          </span>
        </div>
        <div class="Marquee_Content">
          <span
            v-for="index in 8"
            :key="index"
            :class="{ inverted: index % 4 === 0 }"
            class="marquee-item font-extrabold text-[var(--main-blue)] text-[8rem] mx-[1rem]"
          >
            Bestsellers
          </span>
        </div>
      </div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] px-[4vw]"
      >
        <div
          v-if="productsStore.isLoading"
          class="text-center text-[var(--main-blue)] text-[1.5rem]"
        >
          Loading...
        </div>
        <div
          v-else-if="productsStore.error"
          class="text-center text-red-500 text-[1.5rem]"
        >
          {{ productsStore.error }}
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-[2rem]">
          <div
            v-for="product in displayedFeaturedProducts"
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
                    :disabled="(counters[product.id] ?? 1) === 1"
                    aria-label="Decrement quantity"
                  >
                    <Minus />
                  </button>
                  <span
                    class="text-[1rem] font-semibold text-[var(--main-blue)] w-[1.5rem] text-center"
                  >
                    {{ counters[product.id] ?? 1 }}
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
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import { animateTextOnScroll } from "@/utils/animatedText";
import { formatPrice } from "@/utils/priceFormat";
import { useProductsStore } from "@/stores/products";
import { Plus, Minus } from "lucide-vue-next";
import Button from "@/components/TheButton.vue";
import type { Product } from "@/types/product";

const heading = ref<HTMLElement | null>(null);
const paragraph = ref<HTMLElement | null>(null);

const productsStore = useProductsStore();

const displayedFeaturedProducts = computed<Product[]>(() => {
  return productsStore.featuredProducts.slice(0, 3);
});

const counters = reactive<Record<string, number>>({});

// Initialize counters for all featured products
const initializeCounters = () => {
  displayedFeaturedProducts.value.forEach((product) => {
    if (!(product.id in counters)) {
      counters[product.id] = 1;
    }
  });
};

watch(displayedFeaturedProducts, (newProducts) => {
  newProducts.forEach((product) => {
    if (!(product.id in counters)) {
      counters[product.id] = 1;
    }
  });
});

const increment = (productId: string): void => {
  // Ensure the counter is initialized
  if (!(productId in counters)) {
    counters[productId] = 1;
  }
  counters[productId]++;
};

const decrement = (productId: string): void => {
  // Ensure the counter is initialized
  if (!(productId in counters)) {
    counters[productId] = 1;
  }
  if (counters[productId] > 1) {
    counters[productId]--;
  }
};

onMounted(() => {
  animateTextOnScroll([heading.value, paragraph.value]);

  if (!productsStore.products.length) {
    productsStore.fetchProducts();
  }
  // Initialize counters for any existing products
  initializeCounters();
});
</script>

<style scoped>
.marquee-item {
  text-shadow: 1px 1px 0 var(--main-blue), -1px 1px 0 var(--main-blue),
    -1px -1px 0 var(--main-blue), 1px -1px 0 var(--main-blue);
}

.Collection_Display_Back {
  position: absolute;
  width: 120%;
  overflow: hidden;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate(-10deg);
  user-select: none;
}

.reverse {
  animation-direction: reverse !important;
}

.inverted {
  color: white;
}

.Marquee_Content {
  width: max-content;
  display: flex;
  flex-wrap: nowrap;
  animation: MarqueeScroll 20s infinite 0s linear;
  animation-duration: 35s;
}

@keyframes MarqueeScroll {
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-50%);
  }
}

.counter-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.counter-btn:disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>
