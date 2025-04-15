<template>
  <single-product :id="productId" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SingleProduct from "@/components/SingleProduct.vue";

const route = useRoute();
const productId = computed(() => route.params.id as string);
</script>
