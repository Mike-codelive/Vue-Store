<template>
  <main>
    <section>
      <div class="w-full h-[75vh] md:h-screen">
        <div class="relative h-full">
          <page-load v-if="isDesktop" @animationComplete="startTextAnimation" />
          <div class="absolute w-full h-full">
            <img
              id="main_img"
              ref="heroImage"
              class="w-full h-full object-cover"
              src="/main-hero.jpg"
              alt="Main store image"
              @load="onImageLoad"
            />
          </div>
          <div
            class="absolute w-full h-full flex flex-col justify-end p-[4vw] text-white"
          >
            <h1
              class="animated_text text-5xl font-bold md:text-[7.5vw] uppercase"
            >
              Crafted with Passion,
            </h1>
            <h1
              class="animated_text text-5xl font-bold md:text-[7.5vw] uppercase"
            >
              Built to Last
            </h1>
          </div>
        </div>
        <the-best-seller />
        <arches />
        <newsletter />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import PageLoad from "@/components/PageLoad.vue";
import TheBestSeller from "@/components/TheBestSeller.vue";
import Arches from "@/components/Arches.vue";
import Newsletter from "@/components/Newsletter.vue";
import { startTextAnimation } from "@/utils/animatedText.ts";
import { ref, onMounted } from "vue";
import { useNavbarStore } from "@/stores/navbar";
import ScrollTrigger from "gsap/ScrollTrigger";

const heroImage = ref<HTMLImageElement | null>(null);
const isImageLoaded = ref(false);
const isDesktop = ref(window.innerWidth >= 768);
const navbarStore = useNavbarStore();

const onImageLoad = () => {
  isImageLoaded.value = true;
};

onMounted(() => {
  if (!isDesktop.value) {
    startTextAnimation();
  }
  if (heroImage.value) {
    const isPastHero =
      window.scrollY > heroImage.value.getBoundingClientRect().bottom;
    navbarStore.setScrolledPastHero(isPastHero);

    ScrollTrigger.create({
      trigger: heroImage.value,
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        navbarStore.setScrolledPastHero(false);
      },
      onLeave: () => {
        navbarStore.setScrolledPastHero(true);
      },
      onEnterBack: () => {
        navbarStore.setScrolledPastHero(false);
      },
      onLeaveBack: () => {},
    });

    const handleScroll = () => {
      if (window.scrollY === 0) {
        navbarStore.setScrolledPastHero(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }
});
</script>
