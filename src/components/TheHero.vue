<template>
  <main>
    <section>
      <div class="w-full h-screen">
        <page-load />
        <img
          class="w-full h-full object-cover z-0"
          src="/main-hero.webp"
          alt="Main store image"
        />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import PageLoad from "@/components/PageLoad.vue";
</script>

<style scoped></style>
