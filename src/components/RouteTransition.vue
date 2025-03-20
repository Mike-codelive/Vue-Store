<template>
  <svg
    class="fill-sky-500 fixed left-0 top-0 w-full h-auto z-[999999] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    data-name="Calque 2"
    viewBox="0 -391.667 342 391.7"
  >
    <path
      class="anim-path"
      data-end-path="M 0 0 h 342 v -277 S 111 -535 0 -277 V 0 Z"
      d="M 0 0 h 342 v 0 S 272 116 0 0 V 0 Z"
    ></path>
  </svg>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from "vue";
import gsap from "gsap";

onMounted(() => {
  nextTick(() => {
    const path = document.querySelector(".anim-path");
    if (path) {
      gsap
        .timeline()
        .to(path, {
          attr: {
            d: "M 0 0 h 342 v -477 S 111 -435 0 -477 V 0 Z",
          },
          duration: 0.8,
          ease: "power1.out",
        })
        .to(path, {
          attr: {
            d: "M 0 -477 h 342 v -477 S 111 -912 0 -477 V -477 Z",
          },
          duration: 0.8,
          ease: "power1.out",
        });
    }
  });
});
</script>
