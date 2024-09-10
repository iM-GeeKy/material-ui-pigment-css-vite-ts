import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@mui/material-pigment-css/styles.css";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import App from "./App";

let component: any;

afterEach(cleanup);

describe("Basic test", () => {
  beforeEach(async () => {
    await act(async () => {
      component = await waitFor(() => render(<App />));
    });
  });

  it("renders error UI", async () => {
    await act(async () => {
      expect(screen.queryByText("Test")).toBeDefined();
    });
  });
});
