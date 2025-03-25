<template>
  <section class="py-[50px] w-full px-[4vw] bg-[var(--bg-baige)]">
    <div
      class="p-[2rem] w-[60%] rounded-[2rem] mx-auto my-0 bg-[var(--main-blue)]"
    >
      <h2
        ref="heading"
        class="font-bold uppercase text-[1.8rem] text-center text-[var(--text-baige)]"
      >
        get 15% off your first order
      </h2>
      <p ref="paragraph" class="text-[var(--text-baige)]">
        Subscribe to our newsletter and get 15% off your first purchase!
      </p>
      <div>
        <input type="text" />
        <button type="button">Join</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from "vue";
import { animateTextOnScroll } from "@/utils/animatedText.ts";

const heading = ref<HTMLElement | null>(null);
const paragraph = ref<HTMLElement | null>(null);

console.log(animateTextOnScroll);

onMounted(async () => {
  await nextTick(); // Wait for DOM updates before accessing refs
  if (heading.value && paragraph.value) {
    animateTextOnScroll([heading.value, paragraph.value]);
  }
});
</script>
