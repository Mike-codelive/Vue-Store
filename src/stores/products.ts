import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { products_url, single_product_url } from "@/utils/constants";
import type { Product, ProductDetails } from "@/types/product";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const singleProduct = ref<ProductDetails | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const featuredProducts = computed<Product[]>(() => {
    return products.value.filter((product) => product.featured);
  });

  async function fetchProducts(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(products_url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();
      products.value = data;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while fetching products";
      error.value = errorMessage;
      console.error("Error fetching products:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchSingleProduct(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    singleProduct.value = null;

    try {
      const response = await fetch(`${single_product_url}${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data: ProductDetails = await response.json();
      singleProduct.value = data;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while fetching the product";
      error.value = errorMessage;
      console.error("Error fetching product:", err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    products,
    singleProduct,
    featuredProducts,
    isLoading,
    error,
    fetchProducts,
    fetchSingleProduct,
  };
});
