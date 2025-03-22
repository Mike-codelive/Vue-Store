import TheHero from "@/components/TheHero.vue";

import { render, screen } from "@testing-library/vue";

describe("Hero component", () => {
  it("renders text headers correctly", () => {
    render(TheHero, {});

    expect(screen.getByText(/Crafted with Passion,/i)).toBeInTheDocument();
    expect(screen.getByText(/Built to Last/i)).toBeInTheDocument();
  });

  it("renders the hero image with correct src and alt attributes", () => {
    render(TheHero, {});

    const heroImage = screen.getByAltText("Main store image");

    expect(heroImage).toBeInTheDocument();
  });
});
