<template>
  <section>
    <header>
      <nav class="fixed top-0 left-0 z-50 py-[30px] px-[4vw] w-full">
        <ul class="flex justify-between">
          <li>Logo</li>
          <div class="flex gap-[2rem]">
            <li
              v-for="link in linkList"
              :key="link"
              class="cursor-pointer capitalize hidden md:block text-white font-[1.2rem]"
            >
              {{ link }}
            </li>
            <ShoppingCart class="custom_icon" />
            <Search class="custom_icon" />
            <MenuIcon class="custom_icon block md:hidden" @click="toggleMenu" />
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
              <div class="flex justify-between mb-40">
                <li>Logo</li>
                <X @click="toggleMenu" />
              </div>
              <div>
                <li
                  v-for="link in linkList"
                  :key="link"
                  class="text-[5vh] z-40 uppercase mb-[1rem]"
                >
                  {{ link }}
                </li>
              </div>
              <div class="mt-auto">
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
    </header>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
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
const isMenuOpen = ref(false);
const linkList = ["furniture", "about", "contact"];

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
</script>

<style scoped>
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
}
</style>
