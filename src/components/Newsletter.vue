<template>
  <section class="py-[50px] w-full px-[4vw] bg-[var(--bg-baige)]">
    <div
      class="p-[2rem] w-full md:w-[60%] rounded-[2rem] mx-auto my-0 bg-[var(--main-blue)]"
    >
      <h2
        ref="heading"
        class="font-bold uppercase text-[1.8rem] md:text-[4rem] mb-[2rem] text-center text-[var(--text-baige)]"
      >
        get 15% off your first order
      </h2>
      <p ref="paragraph" class="text-[var(--text-baige)] text-center mb-[2rem]">
        Subscribe to our newsletter and get 15% off your first purchase!
      </p>
      <div class="flex justify-center">
        <input
          type="text"
          class="rounded-full bg-white outline-none pt-[1rem] pr-[1.2rem] pb-[0.8rem] pl-[1.2rem] mr-[5px] text-black border-none"
          placeholder="Email"
        />
        <Button text="Join" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { animateTextOnScroll } from "@/utils/animatedText.ts";
import Button from "@/components/Button.vue";

const heading = ref<HTMLElement | null>(null);
const paragraph = ref<HTMLElement | null>(null);

onMounted(() => {
  animateTextOnScroll([heading.value, paragraph.value]);
});
</script>
