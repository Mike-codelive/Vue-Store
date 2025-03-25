<template>
  <section>
    <page-load />
    <div class="min-h-screen w-full flex flex-wrap bg-[var(--bg-baige)]">
      <div class="pt-[140px] pb-[50px] px-[4vw]">
        <h1
          class="text-[3rem] md:text-[6rem] uppercase font-extrabold mb-[2rem] text-sky-500"
          ref="heading"
        >
          About Us
        </h1>
        <div class="w-full md:w-1/2" ref="paragraph">
          <p class="mb-[17px]">
            We are a stylish and inviting furniture boutique in the heart of
            Montreal, dedicated to crafting timeless and modern home pieces.
            Best known for our elegant sofas and handcrafted dining tables!
            Additionally, we offer a curated selection of furniture and décor
            that blends classic craftsmanship with contemporary design.
          </p>
          <p>
            Our customers love our warm showroom, knowledgeable staff, and
            thoughtfully designed spaces that inspire creativity. With a focus
            on quality materials and attention to detail, Furnishé has become a
            go-to destination for both locals and visitors looking to create a
            beautiful and comfortable home.
          </p>
        </div>
      </div>
      <newsletter />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import PageLoad from "@/components/PageLoad.vue";
import Newsletter from "@/components/Newsletter.vue";
import { animateTextOnScroll } from "@/utils/animatedText.ts";

const heading = ref<HTMLElement | null>(null);
const paragraph = ref<HTMLElement | null>(null);

onMounted(() => {
  animateTextOnScroll([heading.value, paragraph.value]);
});
</script>
