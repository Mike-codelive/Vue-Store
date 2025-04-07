<template>
  <section>
    <nav-bar />
    <router-view />
    <newsletter />
    <Footer />
  </section>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Newsletter from "@/components/Newsletter.vue";
import Footer from "@/components/Footer.vue";
</script>
