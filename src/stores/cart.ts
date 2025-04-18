import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useProductsStore } from "./products";
import type { CartItem, CartItemWithProduct } from "@/types/cart";

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);
  const initializeCart = (): void => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        items.value = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  };

  const saveCart = (): void => {
    try {
      localStorage.setItem("cart", JSON.stringify(items.value));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  };

  const addItem = (
    productId: string,
    quantity: number,
    selectedColor: string
  ): void => {
    const productsStore = useProductsStore();
    const product = productsStore.products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (!selectedColor) {
      throw new Error("Please select a color");
    }
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const existingItem = items.value.find(
      (item) =>
        item.productId === productId && item.selectedColor === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ productId, quantity, selectedColor });
    }
    saveCart();
  };

  const removeItem = (productId: string, selectedColor: string): void => {
    items.value = items.value.filter(
      (item) =>
        !(item.productId === productId && item.selectedColor === selectedColor)
    );
    saveCart();
  };

  const updateQuantity = (
    productId: string,
    selectedColor: string,
    quantity: number
  ): void => {
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }
    const item = items.value.find(
      (item) =>
        item.productId === productId && item.selectedColor === selectedColor
    );
    if (item) {
      item.quantity = quantity;
      saveCart();
    }
  };

  const cartItems = computed<CartItemWithProduct[]>(() => {
    const productsStore = useProductsStore();
    return items.value.map((item) => {
      const product = productsStore.products.find(
        (p) => p.id === item.productId
      );
      return {
        ...item,
        product: product || null,
        subtotal: product ? product.price * item.quantity : 0,
      };
    });
  });

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.subtotal, 0);
  });

  initializeCart();

  return {
    items,
    cartItems,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
  };
});
