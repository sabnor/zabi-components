import type { ComponentDoc } from "../../../types/page.types";
import { componentsCatalog } from "../components-catalog";
import { makeDoc, demoId } from "./_shared";

const props = componentsCatalog.atoms.find((c) => c.name === "Skeleton")!.props;

export const doc: ComponentDoc = makeDoc({
    name: "Skeleton",
    category: "atoms",
    description:
        "Neutral placeholder that mirrors the shape of content while it loads. Use when the final layout is predictable to reduce perceived latency and layout shift.",
    defaultExample: {
        title: "Default",
        description: "A single text line placeholder that fills its container.",
        demoId: demoId("Skeleton", "default"),
        code: `<Skeleton />`,
    },
    examples: [
        {
            title: "Avatar",
            description: "Circle variant for avatars and icon placeholders.",
            demoId: demoId("Skeleton", "avatar"),
            code: `<Skeleton variant="circle" />`,
        },
        {
            title: "Media block",
            description:
                "Block variant for cards, images, thumbnails, and hero regions.",
            demoId: demoId("Skeleton", "block"),
            code: `<Skeleton variant="block" />`,
        },
        {
            title: "Custom size",
            description:
                "Use `width` / `height` for CSS lengths or pixel values, or Tailwind width utilities via `class`.",
            demoId: demoId("Skeleton", "size"),
            code: `<div class="space-y-3">
  <Skeleton width="50%" />
  <Skeleton width={240} height={8} />
  <Skeleton variant="block" class="w-64" />
</div>`,
        },
        {
            title: "User row",
            description:
                "A realistic list-row pattern: avatar beside two lines of text.",
            demoId: demoId("Skeleton", "userRow"),
            code: `<div class="flex items-center gap-3">
  <Skeleton variant="circle" />
  <div class="flex-1 space-y-2">
    <Skeleton width="60%" />
    <Skeleton width="40%" />
  </div>
</div>`,
        },
        {
            title: "Article card",
            description:
                "Drop-in placeholder for feed cards, blog previews, and product tiles.",
            demoId: demoId("Skeleton", "articleCard"),
            code: `<article class="space-y-3">
  <Skeleton variant="block" />
  <Skeleton width="70%" height={16} />
  <div class="space-y-2">
    <Skeleton />
    <Skeleton width="85%" />
  </div>
</article>`,
        },
    ],
    variantsStates: ["text", "circle", "block"],
    props,
    guidelines: {
        whenToUse: [
            "Use for predictable layouts during data fetching (lists, cards, profile headers).",
            "Prefer skeletons over spinners for content-heavy pages to preserve structure.",
        ],
        whenToAvoid: [
            "Avoid for unknown/dynamic layouts — use a lighter loading state instead.",
            "Avoid showing skeletons for very fast operations (it can feel like flicker).",
        ],
    },
});

