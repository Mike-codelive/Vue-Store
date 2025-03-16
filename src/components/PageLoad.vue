<template>
  <svg
    data-name="Layer 1"
    class="pageload hidden md:block"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 342 277"
  >
    <path
      d="M 340.695 0.938 L 342.84 275.284 C 345.881 349.79 3.867 370.018 0 275.284 L 0 0 L 342.84 0"
    ></path>
  </svg>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, defineEmits } from "vue";
import gsap from "gsap";

const emit = defineEmits(["animationComplete"]);

onMounted(() => {
  nextTick(() => {
    gsap
      .timeline({
        onComplete: () => {
          emit("animationComplete");
        },
      })
      .to("path", {
        y: "-30%",
        duration: 0.8,
        ease: "power1.out",
      })
      .to(
        "path",
        {
          attr: {
            d: "M 340.695 -269.21 L 342.84 5.131 C 332.512 -106.633 -8.742 -75.824 0 5.131 L 0 -270.15 L 342.84 -270.15",
          },
          duration: 0.8,
          ease: "power1.out",
        },
        "-=0.3"
      );
  });
});
</script>

<style scoped>
.pageload {
  width: 100%;
  height: auto;
  position: fixed;
  left: 0;
  z-index: 30;
  pointer-events: none;
  fill: #fff;
}
</style>
