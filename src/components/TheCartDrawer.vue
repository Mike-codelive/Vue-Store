<template>
  <div v-if="isOpen" class="cart-drawer-container">
    <div class="backdrop" ref="backdrop" @click="closeDrawer"></div>
    <section
      ref="drawer"
      class="w-[560px] h-full fixed right-0 top-0 z-[20001] bg-[#fff] p-[2rem] flex flex-col transform translate-x-full"
    >
      <div
        class="flex w-full justify-between items-center pb-[1.5rem] mb-[2rem] border-b-2 border-solid border-[var(--main-blue)]"
      >
        <h1 class="uppercase font-bold text-[1.5rem] text-[var(--main-blue)]">
          Cart
        </h1>
        <button @click="closeDrawer" aria-label="Close cart">
          <X class="w-[2rem] h-[2rem] cursor-pointer text-[var(--main-blue)]" />
        </button>
      </div>
      <div
        v-if="productsStore.isLoading"
        class="text-center text-gray-600 text-[1rem]"
      >
        Loading cart items...
      </div>
      <div
        v-else-if="cartStore.cartItems.length === 0"
        class="text-center text-gray-600 text-[1rem]"
      >
        Your cart is empty.
      </div>
      <div v-else class="flex-1 overflow-y-auto">
        <div
          v-for="item in cartStore.cartItems"
          :key="`${item.productId}-${item.selectedColor}`"
          class="flex items-center gap-4 py-4 border-b border-gray-200"
        >
          <img
            v-if="item.product"
            :src="item.product.image"
            :alt="item.product.name"
            class="w-16 h-16 object-cover rounded"
          />
          <div
            v-else
            class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center"
          >
            <span class="text-gray-500 text-sm">N/A</span>
          </div>
          <div class="flex-1">
            <h3 class="text-[1rem] font-bold text-[var(--main-blue)]">
              {{ item.product ? item.product.name : "Product Not Available" }}
            </h3>
            <p class="text-[0.875rem] text-gray-600 flex items-center gap-1">
              Color:
              <span
                class="inline-block w-4 h-4 rounded-full"
                :style="{ backgroundColor: item.selectedColor }"
              ></span>
            </p>
            <p class="text-[0.875rem] text-gray-600">
              Price: {{ formatPrice(item.product ? item.product.price : 0) }}
            </p>
            <p class="text-[0.875rem] text-gray-600">
              Subtotal: {{ formatPrice(item.subtotal) }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="
                updateQuantity(
                  item.productId,
                  item.selectedColor,
                  item.quantity - 1
                )
              "
              class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
              :disabled="item.quantity <= 1"
              aria-label="Decrease quantity"
            >
              <Minus class="w-4 h-4 text-[var(--main-blue)]" />
            </button>
            <span
              class="w-8 text-center text-[1rem] font-bold text-[var(--main-blue)]"
            >
              {{ item.quantity }}
            </span>
            <button
              @click="
                updateQuantity(
                  item.productId,
                  item.selectedColor,
                  item.quantity + 1
                )
              "
              class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus class="w-4 h-4 text-[var(--main-blue)]" />
            </button>
          </div>
          <button
            @click="removeItem(item.productId, item.selectedColor)"
            class="text-red-600 hover:text-red-800 cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 class="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        v-if="cartStore.cartItems.length > 0 && !productsStore.isLoading"
        class="mt-4 pt-4 border-t border-gray-200"
      >
        <p class="text-[1rem] font-bold text-[var(--main-blue)]">
          Total: {{ formatPrice(cartStore.totalPrice) }}
        </p>
        <div class="mt-4 text-center">
          <the-button
            text="Proceed to Checkout"
            text-color="black"
            flair-color="white"
            border-color="var(--main-blue)"
            bg-color="var(--main-blue)"
            @click="proceedToCheckout"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { useUiStore } from "@/stores/ui";
import { useProductsStore } from "@/stores/products";
import { formatPrice } from "@/utils/priceFormat";
import { X, Plus, Minus, Trash2 } from "lucide-vue-next";
import TheButton from "@/components/TheButton.vue";
import gsap from "gsap";

const props = defineProps<{
  isOpen: boolean;
}>();

const cartStore = useCartStore();
const uiStore = useUiStore();
const productsStore = useProductsStore();
const drawer = ref<HTMLElement | null>(null);
const backdrop = ref<HTMLElement | null>(null);

onMounted(() => {
  if (drawer.value && props.isOpen) {
    gsap.set(drawer.value, { x: "100%" });
  }
  if (backdrop.value) {
    gsap.set(backdrop.value, { opacity: 0 });
  }
  if (!productsStore.products.length) {
    productsStore.fetchProducts();
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});

const closeDrawer = () => {
  if (drawer.value && backdrop.value) {
    gsap.to(drawer.value, {
      x: "100%",
      duration: 0.5,
      ease: "power2.in",
    });
    gsap.to(backdrop.value, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        uiStore.closeCart();
      },
    });
  } else {
    uiStore.closeCart();
  }
};

const removeItem = (productId: string, selectedColor: string) => {
  cartStore.removeItem(productId, selectedColor);
};

const updateQuantity = (
  productId: string,
  selectedColor: string,
  quantity: number
) => {
  try {
    cartStore.updateQuantity(productId, selectedColor, quantity);
  } catch (error) {
    console.error((error as Error).message);
  }
};

const proceedToCheckout = () => {
  console.log("Proceed to checkout");
};

watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
      await nextTick();
      if (drawer.value && backdrop.value) {
        gsap.to(drawer.value, {
          x: "0%",
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(backdrop.value, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    } else {
      document.body.style.overflow = "";
    }
  }
);
</script>

<style scoped>
.cart-drawer-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20000;
  pointer-events: none;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20000;
  pointer-events: auto;
  cursor: pointer;
}

section {
  pointer-events: auto;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--main-blue) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: var(--main-blue);
  border-radius: 4px;
}
</style>
