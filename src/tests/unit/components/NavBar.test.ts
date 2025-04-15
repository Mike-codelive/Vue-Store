import { render, screen, fireEvent } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router";
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("NavBar component", () => {
  const renderMainNavBar = () => {
    const $route = {
      name: "Home",
    };

    render(NavBar, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("displays company main logo name", async () => {
    renderMainNavBar();
    const logoElement = await screen.findByTestId("desktop-logo");
    expect(logoElement).toBeInTheDocument();
  });

  it("renders desktop navbar with correct links", () => {
    render(NavBar, {
      global: {
        plugins: [router],
      },
    });

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/store");
    expect(links[2]).toHaveAttribute("href", "/about");
    expect(links[3]).toHaveAttribute("href", "/contact");
  });

  it("renders mobile menu with correct links when toggled", async () => {
    renderMainNavBar();

    const menuIcon = screen.getByTestId("menu-icon");
    await fireEvent.click(menuIcon);

    const mobileNavItems = screen.getAllByTestId("mobile-nav-link");

    expect(mobileNavItems).toHaveLength(3);

    const mobileLinkItems = mobileNavItems.filter((item) =>
      /store|about|contact/i.test(item.textContent || "")
    );

    const linkTexts = mobileLinkItems.map((item) => item.textContent);
    expect(linkTexts).toEqual(["store", "about", "contact"]);
  });

  it("closes mobile menu when clicking the close icon", async () => {
    renderMainNavBar();

    const menuIcon = screen.getByTestId("menu-icon");
    await fireEvent.click(menuIcon);

    const closeIcon = screen.getByTestId("close-menu-icon");
    await fireEvent.click(closeIcon);

    expect(
      screen.queryByRole("link", { name: /store/i, hidden: true })
    ).not.toBeInTheDocument();
  });
});
