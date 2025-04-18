<template>
  <section>
    <nav-bar @toggle-cart="uiStore.toggleCart" />
    <the-cart-drawer :is-open="uiStore.isCartOpen" @close="uiStore.closeCart" />
    <router-view />
    <newsletter />
    <the-footer />
  </section>
</template>

<script setup lang="ts">
import { useUiStore } from "@/stores/ui";
import NavBar from "@/components/NavBar.vue";
import Newsletter from "@/components/Newsletter.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheCartDrawer from "@/components/TheCartDrawer.vue";

const uiStore = useUiStore();
</script>
