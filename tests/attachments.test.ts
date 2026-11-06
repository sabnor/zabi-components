import { cleanup, render } from "@testing-library/svelte";
import { afterEach, expect, it, vi } from "vitest";

import AttachHarness from "./fixtures/AttachHarness.svelte";

afterEach(() => cleanup());

it("Heading and Text pass an attachment to their element", () => {
    const onHeading = vi.fn();
    const onText = vi.fn();
    const { container } = render(AttachHarness, { onHeading, onText });
    expect(onHeading).toHaveBeenCalledWith(container.querySelector("h2"));
    expect(onText).toHaveBeenCalledWith(container.querySelector("p"));
});
