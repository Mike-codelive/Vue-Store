import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/vue";
import { afterEach } from "vitest";
import { vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("gsap", () => {
  const timelineMock = () => {
    const tl = {
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      add: vi.fn().mockReturnThis(),
      play: vi.fn().mockReturnThis(),
      pause: vi.fn().mockReturnThis(),
      resume: vi.fn().mockReturnThis(),
    };
    return tl;
  };

  const gsapMock = {
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    timeline: vi.fn(timelineMock),
    registerPlugin: vi.fn(),
  };

  return {
    default: gsapMock,
    gsap: gsapMock,
    ScrollTrigger: {
      register: vi.fn(),
      create: vi.fn(),
      refresh: vi.fn(),
    },
  };
});
