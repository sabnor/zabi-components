import { cleanup, fireEvent, render, screen, within } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vitest";

import Avatar from "../src/components/atoms/Avatar.svelte";
import ListItem from "../src/components/atoms/ListItem.svelte";
import AvatarGroup from "../src/components/molecules/AvatarGroup.svelte";
import { initialsOf, splitGroup } from "../src/components/util/avatar";

afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute("lang");
});

const people = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Edsger Dijkstra", "Barbara Liskov", "Donald Knuth", "Tim Berners-Lee"].map(
    (name) => ({ name }),
);

describe("initialsOf", () => {
    it("takes the first letter of the first and the last word, and one letter for one word", () => {
        expect(initialsOf("Ada Lovelace")).toBe("AL");
        expect(initialsOf("  anna maria  de la cruz ")).toBe("AC");
        expect(initialsOf("Plato")).toBe("P");
    });

    it("is empty for a name with no words, never a question mark", () => {
        expect(initialsOf("")).toBe("");
        expect(initialsOf("   ")).toBe("");
        expect(initialsOf(undefined)).toBe("");
    });

    it("keeps a letter with its accent, and an emoji, whole", () => {
        // "e" followed by a combining acute accent is one letter to a reader.
        expect(initialsOf("élodie durand")).toBe("ÉD");
        expect(initialsOf("👩🏽‍🚀 Astronaut")).toBe("👩🏽‍🚀A");
    });

    it("upper-cases for the locale", () => {
        expect(initialsOf("ilker ışık", "tr")).toBe("İI");
        expect(initialsOf("ilker ışık", "en")).toBe("II");
        expect(initialsOf("ada lovelace", "not a locale")).toBe("AL");
    });
});

describe("Avatar", () => {
    it("is one image named by the person, with the initials inside", () => {
        render(Avatar, { props: { name: "Ada Lovelace" } });
        const avatar = screen.getByRole("img", { name: "Ada Lovelace" });
        expect(avatar.textContent?.trim()).toBe("AL");
        expect(avatar.querySelector("[data-avatar-initials]")!.getAttribute("aria-hidden")).toBe("true");
        expect(avatar.querySelector("img")).toBeNull();
    });

    it("shows the picture over the initials, and the initials alone when it fails to load", async () => {
        render(Avatar, { props: { name: "Ada Lovelace", src: "/ada.jpg" } });
        const avatar = screen.getByRole("img", { name: "Ada Lovelace" });
        const picture = avatar.querySelector("img")!;
        expect(picture.getAttribute("src")).toBe("/ada.jpg");
        // Named once, by the root: the picture inside is presentational.
        expect(picture.getAttribute("alt")).toBe("");
        expect(avatar.textContent?.trim()).toBe("AL");

        await fireEvent.error(picture);
        expect(avatar.querySelector("img")).toBeNull();
        expect(avatar.textContent?.trim()).toBe("AL");
    });

    it("tries again for another address", async () => {
        const { rerender } = render(Avatar, { props: { name: "Ada Lovelace", src: "/missing.jpg" } });
        await fireEvent.error(document.querySelector("img")!);
        expect(document.querySelector("img")).toBeNull();
        await rerender({ src: "/ada.jpg" });
        expect(document.querySelector("img")!.getAttribute("src")).toBe("/ada.jpg");
    });

    it("draws a person icon for an empty name", () => {
        render(Avatar, { props: { name: "", alt: "Unknown member" } });
        const avatar = screen.getByRole("img", { name: "Unknown member" });
        expect(avatar.querySelector("svg")).not.toBeNull();
        expect(avatar.textContent?.trim()).toBe("");
    });

    it("takes another name, and is decorative with an empty one", () => {
        render(Avatar, { props: { name: "Ada Lovelace", alt: "Organiser" } });
        expect(screen.getByRole("img", { name: "Organiser" })).toBeTruthy();
        cleanup();
        render(Avatar, { props: { name: "Ada Lovelace", alt: "" } });
        expect(screen.queryByRole("img")).toBeNull();
        expect(document.querySelector("[data-avatar]")!.getAttribute("aria-hidden")).toBe("true");
    });

    it.each([
        ["sm", "size-[24px]"],
        ["md", "size-[32px]"],
        ["lg", "size-[48px]"],
    ] as const)("%s is a round circle of a fixed size in the subtle primary pair, with a border for forced colours", (size, box) => {
        render(Avatar, { props: { name: "Ada Lovelace", size, class: "from-the-app", id: "ada" } });
        const classes = screen.getByRole("img").className.split(/\s+/);
        expect(classes).toEqual(
            expect.arrayContaining([box, "rounded-pill", "bg-action-primary-subtle", "text-link", "border", "border-transparent", "from-the-app"]),
        );
        expect(screen.getByRole("img").id).toBe("ada");
    });

    it("upper-cases in the page's language, or the one it is given", () => {
        document.documentElement.lang = "tr";
        render(Avatar, { props: { name: "ilker ışık" } });
        expect(screen.getByRole("img").textContent?.trim()).toBe("İI");
        cleanup();
        render(Avatar, { props: { name: "ilker ışık", locale: "en" } });
        expect(screen.getByRole("img").textContent?.trim()).toBe("II");
    });
});

describe("splitGroup", () => {
    it("shows max people and counts the rest, but never counts one", () => {
        expect(splitGroup(3, 4)).toEqual({ shown: 3, hidden: 0 });
        expect(splitGroup(4, 4)).toEqual({ shown: 4, hidden: 0 });
        expect(splitGroup(5, 4)).toEqual({ shown: 5, hidden: 0 });
        expect(splitGroup(7, 4)).toEqual({ shown: 4, hidden: 3 });
        expect(splitGroup(0, 4)).toEqual({ shown: 0, hidden: 0 });
    });

    it("treats a max below 1 as 1", () => {
        expect(splitGroup(5, 0)).toEqual({ shown: 1, hidden: 4 });
        expect(splitGroup(5, -2)).toEqual({ shown: 1, hidden: 4 });
        expect(splitGroup(2, 0)).toEqual({ shown: 2, hidden: 0 });
    });
});

describe("AvatarGroup", () => {
    const items = () => within(screen.getByRole("list")).getAllByRole("listitem");

    it("is a named list of four people and a +3 that says how many more", () => {
        render(AvatarGroup, { props: { people, label: "Who's going" } });
        expect(screen.getByRole("list", { name: "Who's going" }).tagName).toBe("UL");
        expect(items()).toHaveLength(5);
        expect(within(screen.getByRole("list")).getAllByRole("img").map((image) => image.getAttribute("aria-label"))).toEqual([
            "Ada Lovelace",
            "Grace Hopper",
            "Alan Turing",
            "Edsger Dijkstra",
            "and 3 more",
        ]);
        const more = document.querySelector("[data-avatar-more]")!;
        expect(more.textContent?.trim()).toBe("+3");
        // The same circle as the avatars beside it.
        expect(more.className).toContain("size-[32px]");
        expect(more.className).toContain("rounded-pill");
    });

    it("shows the last person and no +1 when there is one too many", () => {
        render(AvatarGroup, { props: { people: people.slice(0, 5) } });
        expect(items()).toHaveLength(5);
        expect(document.querySelector("[data-avatar-more]")).toBeNull();
        expect(screen.getByRole("img", { name: "Barbara Liskov" })).toBeTruthy();
    });

    it("follows max and size, and takes its words from strings", () => {
        render(AvatarGroup, {
            props: {
                people,
                max: 2,
                size: "lg",
                strings: { more: (count: number, names: string[]) => `och ${count} till: ${names.join(", ")}` },
            },
        });
        expect(items()).toHaveLength(3);
        const more = screen.getByRole("img", { name: "och 5 till: Alan Turing, Edsger Dijkstra, Barbara Liskov, Donald Knuth, Tim Berners-Lee" });
        expect(more.textContent?.trim()).toBe("+5");
        expect(more.className).toContain("size-[48px]");
        expect(screen.getByRole("img", { name: "Ada Lovelace" }).className).toContain("size-[48px]");
    });

    it("overlaps with logical margins and parts the circles with a ring that follows a variable", () => {
        render(AvatarGroup, { props: { people: people.slice(0, 3), "data-testid": "group" } });
        const [first, second] = items();
        expect(first.className).not.toContain("-ms-");
        expect(second.className).toContain("-ms-[8px]");
        expect(screen.getByRole("img", { name: "Ada Lovelace" }).className).toContain(
            "shadow-[0_0_0_2px_var(--zabi-avatar-ring,var(--color-surface-raised))]",
        );
        expect(screen.getByTestId("group")).toBe(screen.getByRole("list"));
    });

    it("has nothing to press", () => {
        render(AvatarGroup, { props: { people } });
        expect(document.querySelectorAll("button, a, [tabindex]")).toHaveLength(0);
    });
});

describe("a picture that is not an address (Z-087)", () => {
    const drawing = createRawSnippet(() => ({
        render: () => '<svg data-drawing viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="var(--qr-ill-skin, #c96)" /></svg>',
    }));

    it("draws the children in the circle in place of the initials, named by the person", () => {
        render(Avatar, { props: { name: "Ada Lovelace", children: drawing } });
        const avatar = screen.getByRole("img", { name: "Ada Lovelace" });
        expect(avatar.querySelector("[data-drawing]")).not.toBeNull();
        expect(avatar.querySelector("[data-avatar-picture]")!.getAttribute("aria-hidden")).toBe("true");
        expect(avatar.querySelector("[data-avatar-initials]")).toBeNull();
        expect(avatar.textContent?.trim()).toBe("");
    });

    it("wins over src: no <img> is rendered", () => {
        render(Avatar, { props: { name: "Ada Lovelace", src: "/a.jpg", children: drawing } });
        expect(screen.getByRole("img", { name: "Ada Lovelace" }).querySelector("img")).toBeNull();
    });

    it("keeps the same size classes as a photo avatar", () => {
        render(Avatar, { props: { name: "Ada Lovelace", size: "lg", children: drawing } });
        expect(screen.getByRole("img", { name: "Ada Lovelace" }).className).toContain("size-[48px]");
    });

    it("an AvatarGroup person with a picture draws it; the others keep their initials", () => {
        render(AvatarGroup, { props: { people: [{ name: "Ada Lovelace", picture: drawing }, { name: "Grace Hopper" }], label: "Going" } });
        const ada = screen.getByRole("img", { name: "Ada Lovelace" });
        const grace = screen.getByRole("img", { name: "Grace Hopper" });
        expect(ada.querySelector("[data-drawing]")).not.toBeNull();
        expect(grace.querySelector("[data-avatar-initials]")!.textContent).toBe("GH");
    });

    it("a list row's avatarPicture sits in the round, decorative unless avatarAlt names it", () => {
        const { container } = render(ListItem, { props: { item: { id: "1", label: "Pub", avatarPicture: drawing } } });
        expect(container.querySelector("[data-drawing]")).not.toBeNull();
        expect(container.querySelector("[data-drawing]")!.parentElement!.getAttribute("aria-hidden")).toBe("true");
        cleanup();
        render(ListItem, { props: { item: { id: "2", label: "Pub", avatarPicture: drawing, avatarAlt: "Pub sign" } } });
        expect(screen.getByRole("img", { name: "Pub sign" })).toBeTruthy();
    });
});

describe("scale (Z-158)", () => {
    it("keeps the sizes in px by default", () => {
        render(Avatar, { props: { name: "Ada Lovelace", size: "lg" } });
        const avatar = screen.getByRole("img", { name: "Ada Lovelace" });
        expect(avatar.className).toContain("size-[48px]");
        expect(avatar.getAttribute("data-scale")).toBe("fixed");
    });

    it("scale=\"text\" sets the circle and the initials in rem", () => {
        render(Avatar, { props: { name: "Ada Lovelace", size: "lg", scale: "text" } });
        const avatar = screen.getByRole("img", { name: "Ada Lovelace" });
        expect(avatar.className).toContain("size-[3rem]");
        expect(avatar.className).toContain("text-[1rem]");
        expect(avatar.className).not.toContain("size-[48px]");
    });

    it("an AvatarGroup passes it on, and its overlap and +N follow", () => {
        const { container } = render(AvatarGroup, { props: { people, max: 2, size: "md", scale: "text" } });
        for (const avatar of container.querySelectorAll("[data-avatar]")) expect(avatar.className).toContain("size-[2rem]");
        expect(container.querySelector("[data-avatar-more]")!.className).toContain("size-[2rem]");
        expect(container.querySelectorAll("li")[1].className).toContain("-ms-[0.5rem]");
    });
});
