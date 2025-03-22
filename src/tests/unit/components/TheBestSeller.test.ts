import TheBestSeller from "@/components/TheBestSeller.vue";
import { render, screen } from "@testing-library/vue";

const normalizeWhitespace = (text: string) => text.replace(/\s+/g, " ").trim();

describe("TheBEstSeller component", () => {
  it("renders text headers and paragraphs correctly", () => {
    render(TheBestSeller, {});

    expect(
      screen.getByText(
        /Elegant design should inspire and elevate every space./i
      )
    ).toBeInTheDocument();

    const expectedParagraph = normalizeWhitespace(`
        Our showroom is nestled in the heart of the city. Visit us to explore
        curated pieces, find inspiration, or bring timeless elegance to your
        home. With exclusive collections available online, there’s something for
        every style and space.
      `);

    const paragraphElement = screen.getByText((content, element) => {
      const normalizedContent = normalizeWhitespace(element?.textContent || "");
      return normalizedContent === expectedParagraph;
    });

    expect(paragraphElement).toBeInTheDocument();
  });
});
