<template>
  <section>
    <nav-bar @toggle-cart="toggleCartDrawer" />
    <the-cart-drawer :is-open="isCartDrawerOpen" @close="closeCartDrawer" />
    <router-view />
    <newsletter />
    <the-footer />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import Newsletter from "@/components/Newsletter.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheCartDrawer from "@/components/TheCartDrawer.vue";

const isCartDrawerOpen = ref(false);

const toggleCartDrawer = () => {
  isCartDrawerOpen.value = !isCartDrawerOpen.value;
};

const closeCartDrawer = () => {
  isCartDrawerOpen.value = false;
};
</script>
