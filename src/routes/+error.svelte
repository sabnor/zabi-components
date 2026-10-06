<script lang="ts">
    import { page } from "$app/stores";
    import SiteFooter from "$lib/marketing/SiteFooter.svelte";

    const notFound = $derived($page.status === 404);
</script>

<svelte:head>
    <title>{notFound ? "Page not found" : "Something went wrong"} | Zabi Components</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<!-- The top bar is 4rem plus a 1px border; without the pixel the page scrolls by one. -->
<div class="error-page flex min-h-[calc(100dvh-var(--site-header-height))] flex-col bg-background text-body">
    <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p class="text-sm font-semibold text-description">Error {$page.status}</p>
        <h1 class="mt-3 max-w-3xl text-4xl font-bold leading-tight text-headline sm:text-5xl">
            {notFound ? "That page does not exist." : "Something went wrong."}
        </h1>
        <p class="mt-6 max-w-lg text-lg leading-8 text-description">
            {#if notFound}
                {$page.error?.message && $page.error.message !== "Not Found"
                    ? $page.error.message
                    : "The link may be out of date, or the address may have a typo."}
                Every component is listed in the catalog.
            {:else}
                Reload the page to try again. If it keeps happening, the docs and the
                component catalog are still available.
            {/if}
        </p>
        <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
                href="/components"
                class="focus-ring inline-flex h-12 items-center justify-center rounded-xl bg-action-primary px-6 text-base font-semibold text-action-primary transition-colors hover:bg-action-primary-hover"
            >
                Browse components
            </a>
            <a
                href="/docs"
                class="focus-ring inline-flex h-12 items-center justify-center rounded-xl border border-border-medium px-6 text-base font-semibold text-headline transition-colors hover:bg-card"
            >
                Get started
            </a>
        </div>
    </main>
    <SiteFooter />
</div>

<style>
    @media (prefers-reduced-motion: reduce) {
        .error-page :global(*) {
            transition-duration: 0.01ms !important;
        }
    }
</style>
