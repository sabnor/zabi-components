<script lang="ts">
    import ExternalLink from "@lucide/svelte/icons/external-link";
    import { page } from "$app/stores";
    import Badge from "../../components/atoms/Badge.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Text from "../../components/atoms/Text.svelte";
    import { GITHUB_URL, NPM_URL, STORYBOOK_URL, SITE_NAME, VERSION } from "./content";

    interface FooterLink {
        label: string;
        href: string;
        external?: boolean;
    }

    const columns: { title: string; links: FooterLink[] }[] = [
        {
            title: "Library",
            links: [
                { label: "Components", href: "/components" },
                { label: "Docs", href: "/docs" },
                { label: "Theming", href: "/theming" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Storybook", href: STORYBOOK_URL, external: true },
                { label: "GitHub", href: GITHUB_URL, external: true },
                { label: "npm", href: NPM_URL, external: true },
                { label: "Changelog", href: `${GITHUB_URL}/blob/main/CHANGELOG.md`, external: true },
            ],
        },
    ];

    /** A section's own page and the pages under it, such as /components/card. */
    function isCurrent(href: string, pathname: string): boolean {
        return pathname === href || pathname.startsWith(`${href}/`);
    }

    const year = new Date().getFullYear();
</script>

<footer class="border-t border-border pb-[env(safe-area-inset-bottom,0px)]">
    <div class="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-10 md:flex-row md:justify-between md:gap-16">
            <div class="max-w-sm">
                <div class="flex items-center gap-3">
                    <a
                        href="/"
                        class="focus-ring display rounded-sm text-xl font-bold text-headline"
                        >{SITE_NAME}</a
                    >
                    <Badge size="sm">v{VERSION}</Badge>
                </div>
                <Text size="sm" tone="description" class="mt-3"
                    >Accessible Svelte 5 components, themed by tokens.</Text
                >
            </div>

            <div class="grid grid-cols-2 gap-x-10 gap-y-8 sm:gap-x-16">
                {#each columns as column (column.title)}
                    <nav aria-label={column.title}>
                        <Heading level={2} size={6} class="text-sm!">{column.title}</Heading>
                        <!-- Links are one line of small text; the pseudo-elements extend the
                        tap area to 44px, and the row gap keeps those areas from overlapping. -->
                        <ul class="mt-3 flex flex-col gap-y-5 text-sm text-description">
                            {#each column.links as link (link.href)}
                                <li>
                                    <a
                                        class="focus-ring relative inline-flex items-center rounded-sm before:absolute before:-inset-x-2 before:-inset-y-3 hover:text-headline"
                                        href={link.href}
                                        aria-current={!link.external && isCurrent(link.href, $page.url.pathname)
                                            ? "page"
                                            : undefined}
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                        >{link.label}{#if link.external}<ExternalLink
                                                size={12}
                                                class="ml-1 inline-block shrink-0 align-[-0.1em] opacity-70"
                                                aria-hidden="true"
                                            /><span class="sr-only">(opens in a new tab)</span>{/if}</a
                                    >
                                </li>
                            {/each}
                        </ul>
                    </nav>
                {/each}
            </div>
        </div>

        <div class="mt-10 border-t border-border pt-6">
            <Text size="xs" tone="caption"
                >&copy; {year} {SITE_NAME}. Open source under the MIT license.</Text
            >
        </div>
    </div>
</footer>
