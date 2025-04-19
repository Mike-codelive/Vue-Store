<template>
  <section>
    <header>
      <nav
        ref="navBar"
        :class="[
          'fixed top-0 left-0 z-40 px-[4vw] w-full transition-colors duration-300 h-[100px]',
          { 'bg-[var(--main-blue)]': shouldHaveBlueBackground },
        ]"
      >
        <ul class="flex justify-between items-center h-full">
          <li class="logo_brand">
            <RouterLink to="/" data-testid="desktop-logo">Furnishé</RouterLink>
          </li>
          <div class="flex gap-[2rem] items-center">
            <li
              v-for="link in linkList"
              :key="link.path"
              class="cursor-pointer capitalize hidden md:block text-white text-[1.2rem]"
            >
              <RouterLink data-testid="nav-link" :to="link.path">{{
                link.name
              }}</RouterLink>
            </li>
            <span class="icon-wrapper relative">
              <ShoppingCart class="custom_icon" @click="emitToggleCart" />
              <span
                v-if="cartStore.totalItems > 0"
                class="cart-badge"
                data-testid="cart-badge"
              >
                {{ cartStore.totalItems }}
              </span>
            </span>
            <span class="icon-wrapper">
              <Search class="custom_icon" @click="toggleSearch" />
            </span>
            <MenuIcon
              class="custom_icon block md:hidden"
              @click="toggleMenu"
              data-testid="menu-icon"
            />
          </div>
        </ul>

        <div
          id="mobile_menu"
          class="fixed top-0 left-0 w-full h-full py-[30px] px-[4vw] pointer-events-none text-white md:hidden"
        >
          <ul class="h-full">
            <div
              id="mobile_menu_links"
              class="opacity-0 h-full flex flex-col"
              v-show="isMenuOpen"
            >
              <div class="flex justify-between items-center mb-40">
                <li class="logo_brand">
                  <RouterLink to="/" data-testid="mobile-logo"
                    >Furnishé</RouterLink
                  >
                </li>
                <X
                  @click="toggleMenu"
                  class="custom_icon"
                  data-testid="close-menu-icon"
                />
              </div>
              <div class="flex flex-col items-center justify-center flex-1">
                <li
                  v-for="link in linkList"
                  :key="link.path"
                  class="text-[3.5vh] z-40 uppercase mb-[1rem]"
                >
                  <RouterLink data-testid="mobile-nav-link" :to="link.path">{{
                    link.name
                  }}</RouterLink>
                </li>
              </div>
              <div class="mt-auto flex justify-center">
                <ul class="flex gap-[1rem]">
                  <li><Instagram /></li>
                  <li><Facebook /></li>
                  <li><Youtube /></li>
                  <li><Github /></li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </nav>
      <div
        ref="backdrop"
        class="backdrop fixed inset-0 bg-black bg-opacity-50 z-30"
        v-show="isSearchOpen"
      ></div>
      <div
        ref="searchBar"
        class="search-bar fixed top-[100px] left-0 w-full bg-white shadow-md z-40 pl-[3rem] pr-[3rem] flex items-center overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search products..."
          class="flex-1 h-full outline-none text-[1rem] text-gray-800 placeholder-gray-400"
        />
        <button @click="toggleSearch" aria-label="Close search">
          <X class="w-6 h-6 text-[var(--main-blue)] cursor-pointer" />
        </button>
      </div>
    </header>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import gsap from "gsap";
import {
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
  Youtube,
  Github,
} from "lucide-vue-next";
import { useNavbarStore } from "@/stores/navbar";

const emit = defineEmits(["toggle-cart"]);

const route = useRoute();
const navbarStore = useNavbarStore();
const cartStore = useCartStore();
const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const searchBar = ref<HTMLElement | null>(null);
const navBar = ref<HTMLElement | null>(null);
const backdrop = ref<HTMLElement | null>(null);
const linkList = [
  { name: "store", path: "/store" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

let originalScrollState = false;
let originalOverflow = "";

const blueBackgroundRoutes = ["/about", "/store", "/contact", "/product"];

const shouldHaveBlueBackground = computed(() => {
  const isProductRoute = route.path.startsWith("/product/");
  if (route.path === "/") {
    return navbarStore.isScrolledPastHero;
  }
  return blueBackgroundRoutes.includes(route.path) || isProductRoute;
});

onMounted(() => {
  if (searchBar.value) {
    gsap.set(searchBar.value, { height: 0 });
  }
  if (backdrop.value) {
    gsap.set(backdrop.value, { opacity: 0 });
  }
});

onUnmounted(() => {
  // Restore body overflow on component destroy
  document.body.style.overflow = originalOverflow;
});

const toggleSearch = () => {
  if (isSearchOpen.value) {
    // Close: animate search bar and backdrop, restore scroll
    isSearchOpen.value = false;
    if (searchBar.value) {
      gsap.to(searchBar.value, {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(searchBar.value, { clearProps: "height" });
        },
      });
    }
    if (backdrop.value) {
      gsap.to(backdrop.value, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
    navbarStore.isScrolledPastHero = originalScrollState;
    document.body.style.overflow = originalOverflow;
  } else {
    // Open: store states, animate search bar and backdrop, disable scroll
    originalScrollState = navbarStore.isScrolledPastHero;
    originalOverflow = document.body.style.overflow || "";
    navbarStore.isScrolledPastHero = true;
    document.body.style.overflow = "hidden";
    isSearchOpen.value = true;
    if (searchBar.value) {
      gsap.to(searchBar.value, {
        height: "83px",
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (backdrop.value) {
      gsap.to(backdrop.value, {
        opacity: 0.5,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }
};

const toggleMenu = () => {
  const navMenu = document.querySelector("#mobile_menu");
  const menuLinks = document.querySelector("#mobile_menu_links");
  isMenuOpen.value = !isMenuOpen.value;

  navMenu?.classList.toggle("open");

  if (isMenuOpen.value) {
    gsap.to(menuLinks, {
      opacity: 1,
      duration: 0.8,
      delay: 0.7,
      ease: "power1.out",
    });
  } else {
    gsap.to(menuLinks, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
      onComplete: () => {
        gsap.set(menuLinks, { clearProps: "opacity" });
      },
    });
  }
};

const emitToggleCart = () => {
  emit("toggle-cart");
};
</script>

<style scoped>
.logo_brand {
  color: white;
  font-size: 2.5rem;
  text-transform: capitalize;
}

#mobile_menu.open::before {
  transform: translate(-50%, -50%) scale(1);
}

#mobile_menu.open {
  pointer-events: all;
}

#mobile_menu::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transform-origin: bottom right;
  min-width: 120%;
  min-height: 120%;
  aspect-ratio: 1;
  border-radius: 10000px;
  background-color: var(--main-blue);
  z-index: -1;
  transition: all 0.8s var(--curve) 0s;
}

.custom_icon {
  color: white;
  cursor: pointer;
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  visibility: visible;
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--main-blue);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 0;
  transition: background-color 0.3s ease;
}

.backdrop {
  opacity: 0;
  transition: opacity 0.5s ease;
}
</style>
