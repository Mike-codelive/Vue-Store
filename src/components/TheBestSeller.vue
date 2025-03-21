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
    <section class="relative overflow-hidden min-h-[115vh] 2xl:min-h-[132vh]">
      <div class="Collection_Display_Back">
        <div class="Marquee_Content reverse">
          <span
            v-for="(text, index) in 8"
            :key="index"
            :class="{ inverted: index % 4 === 0 }"
            class="marquee-item font-extrabold text-[var(--main-blue)] text-[8rem] mx-[1rem]"
          >
            Bestsellers
          </span>
        </div>
        <div class="Marquee_Content">
          <span
            v-for="(text, index) in 8"
            :key="index"
            :class="{ inverted: index % 4 === 0 }"
            class="marquee-item font-extrabold text-[var(--main-blue)] text-[8rem] mx-[1rem]"
          >
            Bestsellers
          </span>
        </div>
        <div class="Marquee_Content reverse">
          <span
            v-for="(text, index) in 8"
            :key="index"
            :class="{ inverted: index % 4 === 0 }"
            class="marquee-item font-extrabold text-[var(--main-blue)] text-[8rem] mx-[1rem]"
          >
            Bestsellers
          </span>
        </div>
        <div class="Marquee_Content">
          <span
            v-for="(text, index) in 8"
            :key="index"
            :class="{ inverted: index % 4 === 0 }"
            class="marquee-item font-extrabold text-[var(--main-blue)] text-[8rem] mx-[1rem]"
          >
            Bestsellers
          </span>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heading = ref<HTMLElement | null>(null);
const paragraph = ref<HTMLElement | null>(null);

onMounted(() => {
  if (heading.value && paragraph.value) {
    gsap.from([heading.value, paragraph.value], {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: heading.value,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }
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
  animation-duration: 65s;
}

@keyframes MarqueeScroll {
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-50%);
  }
}
</style>
