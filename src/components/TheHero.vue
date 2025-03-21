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
              src="/main-hero.webp"
              alt="Main store image"
              @load="onImageLoad"
            />
          </div>
          <div class="absolute w-full h-full flex flex-col justify-end p-[4vw]">
            <h1 class="main_text text-5xl md:text-[7.5vw]">
              Crafted with Passion,
            </h1>
            <h1 class="main_text text-5xl md:text-[7.5vw]">Built to Last</h1>
          </div>
        </div>
        <the-best-seller />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import PageLoad from "@/components/PageLoad.vue";
import TheBestSeller from "@/components/TheBestSeller.vue";
import { ref, onMounted } from "vue";
import gsap from "gsap";

const heroImage = ref<HTMLImageElement | null>(null);
const isImageLoaded = ref(false);
const isDesktop = ref(window.innerWidth >= 768);

const onImageLoad = () => {
  isImageLoaded.value = true;
};

const startTextAnimation = () => {
  const texts = document.querySelectorAll(".main_text");
  if (texts.length === 0) return;

  texts.forEach((text) => {
    text.innerHTML =
      text.textContent
        ?.split(" ")
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ") || "";
  });

  gsap.to(".main_text", {
    opacity: 1,
  });

  gsap.fromTo(
    ".word",
    { y: "100%", opacity: 0, rotate: 10 },
    {
      y: "0%",
      opacity: 1,
      rotate: 0,
      duration: 1.2,
      ease: "circ.out",
      stagger: 0.1,
    }
  );
};

onMounted(() => {
  if (!isDesktop.value) {
    startTextAnimation();
  }
});
</script>

<style scoped>
.main_text {
  font-weight: bold;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: hidden;
  opacity: 0;
  text-transform: uppercase;
}

.word {
  display: inline-block;
  overflow: hidden;
  position: relative;
  transform: translateY(100%);
  opacity: 0;
}
</style>
