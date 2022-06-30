import { render, screen } from "@testing-library/react";
import Home from "@pages/index";

describe("Home", () => {
  it("render Home", () => {
    render(<Home />);
  });
});
