<template>
  <section>
    <page-load />
    <div
      class="px-[4vw] py-[50px] pt-[200px] flex items-center justify-between gap-[2rem]"
    >
      <div class="basis-[60%]">
        <h1
          class="text-[6rem] 4k:text-[10rem] font-extrabold text-[var(--main-blue)]"
        >
          Contact Us
        </h1>
        <div
          class="contact-details mt-6 text-[1.25rem] 4k:text-[2rem] text-gray-800"
        >
          <p class="mb-4">
            <a
              href="https://maps.app.goo.gl/1234MontanaAveSantaMonicaCA90403"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link hover:underline"
            >
              1234 Montana Ave, Santa Monica, CA 90403
            </a>
          </p>
          <p class="mb-4">
            <a href="tel:+13103937632" class="contact-link hover:underline">
              (310) 393-7632
            </a>
          </p>
          <p class="mb-4">
            <a
              href="mailto:hello@Furnishe.com"
              class="contact-link hover:underline"
            >
              hello@Furnishe.com
            </a>
          </p>
          <div class="hours mt-6">
            <h2
              class="text-[1.5rem] 4k:text-[2.5rem] font-semibold text-[var(--main-blue)] mb-2"
            >
              Hours
            </h2>
            <ul class="space-y-1">
              <li>Monday: Closed</li>
              <li>Tuesday - Sunday: 7am - 3pm</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="basis-[40%] rounded-[1.5rem] overflow-hidden shadow-lg">
        <img
          src="/contact.jpg"
          alt="Contact image"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <newsletter />
  </section>
</template>

<script lang="ts" setup>
import PageLoad from "@/components/PageLoad.vue";
import Newsletter from "@/components/Newsletter.vue";
</script>

<style scoped>
.contact-details {
  line-height: 1.6;
}

.contact-link {
  color: var(--main-blue);
  transition: all 0.3s ease;
}

.contact-link:hover {
  text-decoration: underline;
}

.hours ul {
  list-style: none;
  padding: 0;
}
</style>
