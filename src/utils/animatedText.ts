import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const startTextAnimation = () => {
  const texts = document.querySelectorAll(".animated_text");
  if (texts.length === 0) return;

  texts.forEach((text) => {
    text.innerHTML =
      text.textContent
        ?.split(" ")
        .map((word) => `<span class="animated_word">${word}</span>`)
        .join(" ") || "";
  });

  gsap.to(".animated_text", {
    opacity: 1,
  });

  gsap.fromTo(
    ".animated_word",
    { y: "100%", opacity: 0, rotate: 10 },
    {
      y: "0%",
      opacity: 1,
      rotate: 0,
      duration: 1.2,
      ease: "circ.out",
      stagger: 0.1,
    }
  );
};

export const animateTextOnScroll = (elements: (HTMLElement | null)[]) => {
  if (elements.some((el) => el === null)) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(elements, {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: elements[0],
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
};
