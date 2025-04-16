<template>
  <section
    v-if="isOpen"
    ref="drawer"
    class="w-[560px] h-full fixed right-0 top-0 z-[20000] bg-[#fff] p-[2rem] flex-col transform translate-x-full"
  >
    <div
      class="flex w-full justify-between items-center pb-[1.5rem] mb-[2rem] border-b-2 border-solid border-[var(--main-blue)]"
    >
      <h1 class="uppercase font-bold">Cart</h1>
      <button @click="closeDrawer">
        <X class="w-[2rem] h-[2rem] cursor-pointer" />
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { X } from "lucide-vue-next";
import gsap from "gsap";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const drawer = ref<HTMLElement | null>(null);

const closeDrawer = () => {
  // Animate out before emitting close
  if (drawer.value) {
    gsap.to(drawer.value, {
      x: "100%",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        emit("close");
      },
    });
  } else {
    emit("close");
  }
};

watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal) {
      // Wait for the element to be mounted
      await nextTick();
      if (drawer.value) {
        gsap.to(drawer.value, {
          x: "0%",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }
);

onMounted(() => {
  if (drawer.value && props.isOpen) {
    gsap.set(drawer.value, { x: "100%" });
  }
});
</script>
