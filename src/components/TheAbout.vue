<template>
  <section>
    <page-load />
    <div class="min-h-screen w-full flex flex-wrap bg-[var(--bg-baige)]">
      <div
        class="pt-[140px] pb-[50px] px-[4vw] min-h-screen items-center md:items-start flex"
      >
        <div>
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
              on quality materials and attention to detail, Furnishé has become
              a go-to destination for both locals and visitors looking to create
              a beautiful and comfortable home.
            </p>
          </div>
        </div>
      </div>
      <div class="progress_bar px-[4vw] w-full relative">
        <div
          class="progress_element flex justify-between items-center flex-col w-[80%] md:w-full md:flex-row"
        >
          <div class="basis-[45%] mb-[3rem] md:mb-0">
            <h2 class="uppercase font-bold mb-[1.5rem] text-[1.5rem]">
              The craft that keeps on inspiring
            </h2>
            <p>
              Ever since our showroom doors opened, countless homes have been
              transformed with our timeless furniture and thoughtfully curated
              pieces. As seasons pass, our collections evolve—guided by quality
              materials, customer desires, and the ever-innovative designs our
              team brings to life.
            </p>
            <p>
              At Furnishé, we believe furniture should do more than fill a
              space; it should create comfort and spark inspiration. This
              philosophy was instilled by our founder, who learned from a loved
              one that a home is built not just with walls, but with warmth and
              intention. In honor of that vision, Furnishé carries forward this
              passion.
            </p>
            <p>
              We hope that every person who steps into our space leaves feeling
              inspired and one step closer to a home that truly reflects them.
            </p>
          </div>
          <div class="basis-[45%] rounded-[1.5rem] overflow-hidden">
            <img
              class="object-cover"
              src="/about-us-1.jpg"
              alt="about image 3"
            />
          </div>
        </div>
        <div
          class="progress_element flex justify-between items-center flex-col w-[80%] md:w-full md:flex-row-reverse"
        >
          <div class="basis-[45%] mb-[3rem] md:mb-0">
            <h2 class="uppercase font-bold mb-[1.5rem] text-[1.5rem]">
              The craft that keeps on inspiring
            </h2>
            <p>
              Ever since our showroom doors opened, countless homes have been
              transformed with our timeless furniture and thoughtfully curated
              pieces. As seasons pass, our collections evolve—guided by quality
              materials, customer desires, and the ever-innovative designs our
              team brings to life.
            </p>
            <p>
              At Furnishé, we believe furniture should do more than fill a
              space; it should create comfort and spark inspiration. This
              philosophy was instilled by our founder, who learned from a loved
              one that a home is built not just with walls, but with warmth and
              intention. In honor of that vision, Furnishé carries forward this
              passion.
            </p>
            <p>
              We hope that every person who steps into our space leaves feeling
              inspired and one step closer to a home that truly reflects them.
            </p>
          </div>
          <div class="basis-[45%] rounded-[1.5rem] overflow-hidden">
            <img
              class="object-cover"
              src="/about-us-2.jpg"
              alt="about image 3"
            />
          </div>
        </div>
        <div
          class="progress_element flex justify-between items-center flex-col w-[80%] md:w-full md:flex-row"
        >
          <div class="basis-[45%] mb-[3rem] md:mb-0">
            <h2 class="uppercase font-bold mb-[1.5rem] text-[1.5rem]">
              The craft that keeps on inspiring
            </h2>
            <p>
              Ever since our showroom doors opened, countless homes have been
              transformed with our timeless furniture and thoughtfully curated
              pieces. As seasons pass, our collections evolve—guided by quality
              materials, customer desires, and the ever-innovative designs our
              team brings to life.
            </p>
            <p>
              At Furnishé, we believe furniture should do more than fill a
              space; it should create comfort and spark inspiration. This
              philosophy was instilled by our founder, who learned from a loved
              one that a home is built not just with walls, but with warmth and
              intention. In honor of that vision, Furnishé carries forward this
              passion.
            </p>
            <p>
              We hope that every person who steps into our space leaves feeling
              inspired and one step closer to a home that truly reflects them.
            </p>
          </div>
          <div class="basis-[45%] rounded-[1.5rem] overflow-hidden">
            <img
              class="object-cover"
              src="/about-us-3.jpg"
              alt="about image 3"
            />
          </div>
        </div>
        <div
          class="line absolute w-[5px] h-full bg-[#ccc] top-0 left-auto right-[16px] md:left-[50%] rounded-[10px]"
        >
          <div
            ref="innerLine"
            class="inner_line w-full bg-amber-600 rounded-[10px]"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLoad from "@/components/PageLoad.vue";
import { animateTextOnScroll } from "@/utils/animatedText.ts";

gsap.registerPlugin(ScrollTrigger);

const heading = ref<HTMLElement | null>(null);
const paragraph = ref<HTMLElement | null>(null);
const innerLine = ref<HTMLElement | null>(null);

onMounted(() => {
  animateTextOnScroll([heading.value, paragraph.value]);

  if (innerLine.value) {
    gsap.set(innerLine.value, { height: "0%" });

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const pageHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;
        const progress = (scrollY / pageHeight) * 100;
        gsap.to(innerLine.value, { height: `${progress}%`, ease: "none" });
      },
    });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<style scoped>
.inner_line {
  height: 0%;
  will-change: height;
}

.progress_element p {
  font-size: 1.1rem;
}

.progress_element {
  margin-bottom: 5.5rem;
}
</style>
