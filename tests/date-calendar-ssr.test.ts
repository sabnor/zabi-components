// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import DateHarness from "./fixtures/DateHarness.svelte";

/**
 * Compiled for the server, with no `document` or `navigator`: the calendar
 * must not ask either for a language, or the clock for a day it then marks.
 * The shared Vitest config resolves `svelte` with the `browser` condition, so
 * the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
});

describe("DateField and TimeField on the server", () => {
    it.each([
        ["date", "2026-10-06", "Quiz date"],
        ["time", "19:00", "Starts"],
    ] as const)("renders a native %s input with its value, label, hint and error", (piece, value, label) => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(DateHarness, {
            props: { piece, initialValue: value, hint: "A hint.", error: "An error.", min: value, required: true },
        });
        const input = /<input[^>]*>/.exec(body)?.[0] ?? "";
        expect(input).toContain(`type="${piece}"`);
        expect(input).toContain(`value="${value}"`);
        expect(input).toContain(`min="${value}"`);
        expect(input).toContain('name="when"');
        expect(input).toContain("required");
        expect(input).toContain('aria-invalid="true"');
        const id = /\sid="([^"]+)"/.exec(input)?.[1];
        expect(body).toMatch(new RegExp(`<label[^>]*for="${id}"[^>]*>${label}`));
        expect(input).toContain(`aria-describedby="${id}-hint ${id}-message"`);
        expect(body).toContain("A hint.");
        expect(body).toContain("An error.");
    });

    it("renders an empty field as empty, in the placeholder colour", () => {
        const { body } = renderOnServer(DateHarness, { props: { piece: "date" } });
        const input = /<input[^>]*>/.exec(body)?.[0] ?? "";
        expect(input).toContain('value=""');
        expect(input).toContain("data-empty");
        expect(input).toMatch(/\stext-input-placeholder[\s"]/);
    });
});

describe("Calendar on the server", () => {
    const render = (props: Record<string, unknown>) =>
        renderOnServer(DateHarness, { props: { piece: "calendar", ...props } }).body;

    it("renders the grid of the month it is given, named and in the given language", () => {
        expect(typeof document).toBe("undefined");
        const body = render({ initialMonth: "2026-10", locale: "sv", initialSelected: "2026-10-06" });
        expect(body).toContain("oktober 2026");
        expect(body).toMatch(/<table[^>]*role="grid"[^>]*aria-labelledby="[^"]+"/);
        expect(body.match(/data-date="/g)).toHaveLength(31);
        expect(body).toContain('aria-label="tisdag 6 oktober 2026, selected"');
        expect(body.match(/aria-selected="true"/g)).toHaveLength(1);
        // One Tab stop from the first byte: the selected day.
        expect(body.match(/tabindex="0"/g)).toHaveLength(1);
        expect(/<button[^>]*data-date="2026-10-06"[^>]*>/.exec(body)?.[0]).toContain('tabindex="0"');
    });

    it("marks no day as today: the server does not know the user's day", () => {
        // The server's own clock says it is 6 October; that must not show.
        vi.useFakeTimers({ toFake: ["Date"] });
        vi.setSystemTime(new Date(Date.UTC(2026, 9, 6, 12, 0)));
        const body = render({ initialMonth: "2026-10", locale: "en-GB" });
        expect(body).not.toContain("aria-current");
        expect(body).not.toContain("data-today");
        expect(body).not.toContain(", today");
    });

    it("without a month or a selection shows the month it is in UTC, whatever the server's zone", () => {
        // 23:30 UTC on 31 October: already 1 November in Stockholm and Auckland.
        vi.useFakeTimers({ toFake: ["Date"] });
        vi.setSystemTime(new Date(Date.UTC(2026, 9, 31, 23, 30)));
        const bodies = ["Europe/Stockholm", "Pacific/Auckland", "America/Los_Angeles", "UTC"].map((zone) => {
            vi.stubEnv("TZ", zone);
            return render({ locale: "en-GB" });
        });
        for (const body of bodies) {
            expect(body).toContain("October 2026");
            expect(body).toContain('data-month="2026-10"');
        }
        // Byte for byte the same wherever it is rendered: nothing to mismatch on hydration.
        const withoutIds = (body: string) => body.replace(/-ssr-\d+/g, "");
        expect(new Set(bodies.map(withoutIds)).size).toBe(1);
    });

    it("without a locale writes English, not the server's own language", () => {
        const body = render({ initialMonth: "2026-10" });
        expect(body).toContain("October 2026");
        expect(body).toContain(">Mon<");
    });

    it("renders the dots and reads the events out", () => {
        const body = render({
            initialMonth: "2026-10",
            locale: "en-GB",
            events: [
                { date: "2026-10-06", label: "Quiz at The Crown" },
                { date: "2026-10-06", label: "Music quiz", tone: "accent" },
            ],
        });
        expect(body).toContain("2 events: Quiz at The Crown, Music quiz");
        expect(body.match(/data-tone="/g)).toHaveLength(2);
        expect(body).toContain('data-tone="accent"');
    });
});
