import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@mui/material-pigment-css/styles.css";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App";

let component: any;

/**
 * Per the MUI 6 guidelines, it is recommended to use {@link Container} from pigment, but vitest throws an error
 * when running tests, so we use the component from @mui/material when we mock the component.
 */
vi.mock("@mui/material-pigment-css/Container", () => {
  return {
    default: (props: any) => {
      return <Container className="mock-container" {...props} />;
    },
  };
});
/**
 * Per the MUI 6 guidelines, it is recommended to use {@link Stack} from pigment, but vitest throws an error
 * when running tests, so we use the component from @mui/material when we mock the component.
 */
vi.mock("@mui/material-pigment-css/Stack", () => {
  return {
    default: (props: any) => {
      return <Stack className="mock-stack" {...props} />;
    },
  };
});

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
