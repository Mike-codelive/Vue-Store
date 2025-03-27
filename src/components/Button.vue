<template>
  <button ref="button" class="button button--stroke">
    <span class="button__flair"></span>
    <span class="button__label">{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { gsap } from "gsap";

interface Props {
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: "My content",
});

const button = ref<HTMLElement | null>(null);

class Button {
  private block: HTMLElement;
  private DOM: {
    button: HTMLElement;
    flair: HTMLElement;
  };
  private xSet: (value: number) => void;
  private ySet: (value: number) => void;

  constructor(buttonElement: HTMLElement) {
    this.block = buttonElement;
    this.DOM = { button: this.block, flair: null! };
    this.xSet = () => {};
    this.ySet = () => {};
    this.init();
    this.initEvents();
  }

  init() {
    const el = gsap.utils.selector(this.block);
    const flairElements = el(".button__flair") as HTMLElement[];
    this.DOM = {
      button: this.block,
      flair: flairElements[0],
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent") as (
      value: number
    ) => void;
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent") as (
      value: number
    ) => void;
  }

  getXY(e: MouseEvent): { x: number; y: number } {
    const { left, top, width, height } =
      this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top),
    };
  }

  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e: MouseEvent) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mouseleave", (e: MouseEvent) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    this.DOM.button.addEventListener("mousemove", (e: MouseEvent) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    });
  }
}

onMounted(async () => {
  await nextTick();
  if (button.value) {
    new Button(button.value);
  }
});
</script>

<style scoped>
button {
  color: currentColor;
}

.button {
  align-items: center;
  background: 0 0;
  border: none;
  border-radius: 6.25rem;
  color: white;
  cursor: pointer;
  display: inline-flex;
  font-size: 1.2rem;
  font-weight: 600;
  gap: 0.363636em;
  justify-content: center;
  letter-spacing: -0.01em;
  line-height: 1.04545;
  overflow: hidden;
  padding: 0.9375rem 1.5rem;
  position: relative;
  text-decoration: none;
  word-break: break-word;
  text-decoration: none;
}

@media (hover: hover) {
  .button.button--stroke:hover {
    color: black;
    text-decoration: none;
  }
}

.button--stroke:after {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.button--stroke:after {
  border: 0.125rem solid white;
  border-radius: 6.25rem;
  content: "";
  pointer-events: none;
}

.button__label {
  position: relative;
  text-align: center;
  transition: color 50ms ease-in-out;
}

.button--stroke:hover .button__label {
  transition: color 0.15s ease-in-out;
}

.button__flair {
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}

.button--stroke .button__flair {
  transform: scale(0);
  transform-origin: 0 0;
  will-change: transform;
}

.button__flair:before {
  aspect-ratio: 1/1;
  background-color: white;
  border-radius: 50%;
  content: "";
  display: block;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: translate(-50%, -50%);
  width: 170%;
}
</style>
