<script module lang="ts">
    export interface Crumb {
        name: string;
        /** Site-relative path. Leave it out on the last crumb, which is the page itself. */
        path?: string;
    }

    /**
     * JSON.stringify leaves `<`, `>` and `&` as they are, so a string holding
     * a closing script tag would end the element early and the rest would be
     * parsed as markup. The unicode escapes are the same characters to a JSON
     * parser. U+2028 and U+2029 are valid in JSON but end a line in older
     * script parsers. (The tag is not spelled out here for the same reason:
     * the Svelte parser would end this block on it.)
     */
    export function serializeJsonLd(data: unknown): string {
        return JSON.stringify(data)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/&/g, "\\u0026")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029");
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";
    import {
        GITHUB_URL,
        NPM_URL,
        SITE_NAME,
        SITE_URL,
        VERSION,
    } from "./content";

    interface Props {
        title: string;
        description: string;
        /** Trail from the outermost section to this page, for a BreadcrumbList. */
        breadcrumbs?: Crumb[];
        /** Landing page only: describes the site and the library as entities. */
        library?: boolean;
    }

    let {
        title,
        description,
        breadcrumbs = [],
        library = false,
    }: Props = $props();

    /**
     * Built from the pathname alone, so query strings and the preview
     * deployment's own hostname never become a second canonical URL.
     */
    const canonical = $derived(
        `${SITE_URL}${$page.url.pathname === "/" ? "/" : $page.url.pathname.replace(/\/$/, "")}`,
    );
    const image = `${SITE_URL}/og.png`;

    /**
     * SoftwareSourceCode rather than SoftwareApplication: the latter only earns
     * a rich result with a price and a rating, and the library has neither.
     */
    const librarySchema = $derived({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: SITE_NAME,
                url: `${SITE_URL}/`,
            },
            {
                "@type": "SoftwareSourceCode",
                "@id": `${SITE_URL}/#library`,
                name: SITE_NAME,
                description,
                url: `${SITE_URL}/`,
                codeRepository: GITHUB_URL,
                programmingLanguage: ["Svelte", "TypeScript"],
                runtimePlatform: "Svelte 5",
                license: "https://opensource.org/license/mit",
                version: VERSION,
                sameAs: [NPM_URL],
            },
        ],
    });

    const breadcrumbSchema = $derived({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.path ? `${SITE_URL}${crumb.path}` : canonical,
        })),
    });

    const schemas = $derived([
        ...(library ? [librarySchema] : []),
        ...(breadcrumbs.length > 0 ? [breadcrumbSchema] : []),
    ]);

    /** The closing tag is split so the Svelte parser does not end this block on it. */
    function jsonLdTag(schema: unknown): string {
        return `<script type="application/ld+json">${serializeJsonLd(schema)}<\/script>`;
    }
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
        property="og:image:alt"
        content="Zabi Components: accessible Svelte 5 components, themed by tokens."
    />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    {#each schemas as schema}
        {@html jsonLdTag(schema)}
    {/each}
</svelte:head>
