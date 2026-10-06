// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Avatar from "../src/components/atoms/Avatar.svelte";
import AvatarGroup from "../src/components/molecules/AvatarGroup.svelte";

/**
 * Compiled for the server, with no `document`. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("Avatar on the server", () => {
    it("renders the picture with the initials under it, so nothing moves when the picture arrives or fails", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(Avatar, { props: { name: "Ada Lovelace", src: "/ada.jpg" } });
        expect(body).toMatch(/<span[^>]*role="img"[^>]*aria-label="Ada Lovelace"/);
        expect(body).toMatch(/data-avatar-initials[^>]*>AL</);
        expect(body).toMatch(/<img[^>]*src="\/ada\.jpg"[^>]*alt=""/);
        // The initials come first: the picture is laid over them.
        expect(body.indexOf("data-avatar-initials")).toBeLessThan(body.indexOf("<img"));
    });

    it("renders initials alone without a picture, and an icon without a name", () => {
        const initials = renderOnServer(Avatar, { props: { name: "Plato" } }).body;
        expect(initials).not.toContain("<img");
        expect(initials).toMatch(/data-avatar-initials[^>]*>P</);
        const nameless = renderOnServer(Avatar, { props: { name: "", alt: "" } }).body;
        expect(nameless).toContain("<svg");
        expect(nameless).toContain('aria-hidden="true"');
        expect(nameless).not.toContain('role="img"');
    });
});

describe("AvatarGroup on the server", () => {
    it("renders the list, its people and the count", () => {
        const people = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Edsger Dijkstra", "Barbara Liskov", "Donald Knuth"].map((name) => ({ name }));
        const { body } = renderOnServer(AvatarGroup, { props: { people, label: "Members" } });
        expect(body).toMatch(/<ul[^>]*role="list"[^>]*aria-label="Members"/);
        expect(body.match(/<li/g)).toHaveLength(5);
        expect(body).toContain('aria-label="and 2 more"');
        expect(body).toMatch(/>\+2</);
        expect(body).not.toContain('aria-label="Barbara Liskov"');
    });
});
