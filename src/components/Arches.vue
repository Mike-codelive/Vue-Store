<template>
  <section>
    <div class="mt-[8rem] mb-[8rem]">
      <h1
        ref="heading"
        class="text-[2rem] md:text-[6rem] font-bold text-center"
      >
        The finest spaces <br />begin with Furnishé.
      </h1>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { animateTextOnScroll } from "@/utils/animatedText.ts";

const heading = ref<HTMLElement | null>(null);

onMounted(() => {
  animateTextOnScroll([heading.value]);
});
</script>
