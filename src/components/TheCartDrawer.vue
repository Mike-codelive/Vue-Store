<template>
  <div v-if="isOpen" class="cart-drawer-container">
    <div class="backdrop" ref="backdrop" @click="closeDrawer"></div>
    <section
      ref="drawer"
      class="w-full md:w-[560px] h-full fixed right-0 top-0 z-[20001] bg-[#fff] p-[2rem] flex flex-col transform translate-x-full"
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

    <div
      v-if="isCheckoutModalOpen"
      class="checkout-modal-container"
      @keydown.esc="closeCheckoutModal"
    >
      <div
        class="checkout-backdrop"
        ref="checkoutBackdrop"
        @click="closeCheckoutModal"
      ></div>
      <div
        ref="checkoutModal"
        class="checkout-modal bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform scale-95 opacity-0"
        role="dialog"
        aria-labelledby="checkout-modal-title"
        aria-modal="true"
      >
        <div class="flex justify-between items-center mb-4">
          <h2
            id="checkout-modal-title"
            class="text-xl font-bold text-[var(--main-blue)]"
          >
            Checkout
          </h2>
          <button
            @click="closeCheckoutModal"
            class="text-gray-500 hover:text-gray-700"
            aria-label="Close checkout modal"
          >
            <X class="w-6 h-6" />
          </button>
        </div>
        <form @submit.prevent="confirmPurchase" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              v-model="checkoutForm.name"
              type="text"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:border-[var(--main-blue)] focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              v-model="checkoutForm.email"
              type="email"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:border-[var(--main-blue)] focus:outline-none"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label
              for="address"
              class="block text-sm font-medium text-gray-700"
            >
              Shipping Address
            </label>
            <textarea
              id="address"
              v-model="checkoutForm.address"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:border-[var(--main-blue)] focus:outline-none"
              placeholder="123 Main St, City, Country"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-lg font-bold text-[var(--main-blue)]">
              Total: {{ formatPrice(cartStore.totalPrice) }}
            </p>
          </div>
          <div class="text-center">
            <the-button
              type="submit"
              text="Confirm Purchase"
              text-color="black"
              flair-color="white"
              border-color="var(--main-blue)"
              bg-color="var(--main-blue)"
            />
          </div>
        </form>
      </div>
    </div>
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
const isCheckoutModalOpen = ref(false);
const checkoutBackdrop = ref<HTMLElement | null>(null);
const checkoutModal = ref<HTMLElement | null>(null);

const checkoutForm = ref({
  name: "",
  email: "",
  address: "",
});

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
  isCheckoutModalOpen.value = true;
  nextTick(() => {
    if (checkoutBackdrop.value && checkoutModal.value) {
      gsap.to(checkoutBackdrop.value, {
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(checkoutModal.value, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });
};

const closeCheckoutModal = () => {
  if (checkoutBackdrop.value && checkoutModal.value) {
    gsap.to(checkoutModal.value, {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(checkoutBackdrop.value, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        isCheckoutModalOpen.value = false;
      },
    });
  } else {
    isCheckoutModalOpen.value = false;
  }
};

const confirmPurchase = () => {
  console.log("Purchase confirmed:", checkoutForm.value);

  closeCheckoutModal();
  closeDrawer();
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

.checkout-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20002;
  pointer-events: auto;
}

.checkout-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20002;
  opacity: 0;
  cursor: pointer;
}

.checkout-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20003;
  max-height: 90vh;
  overflow-y: auto;
}

@media (max-width: 640px) {
  .checkout-modal {
    width: 90%;
    padding: 1rem;
  }
}
</style>
