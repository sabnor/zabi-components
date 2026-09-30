<script lang="ts">
    import { ExternalLink } from "@lucide/svelte";
    import { GITHUB_URL, NPM_URL, STORYBOOK_URL } from "./content";
</script>

<footer class="border-t border-border">
    <div
        class="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-description sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"
    >
        <p>Zabi Components is open source under the MIT license.</p>
        <nav aria-label="Footer">
            <!-- Links are one line of small text; the pseudo-elements extend the tap
            area to 44px, and the row gap keeps those areas from overlapping. -->
            <ul class="flex flex-wrap gap-x-8 gap-y-6">
                <li><a class="focus-ring relative inline-flex rounded-sm before:absolute before:-inset-x-2 before:-inset-y-3 hover:text-headline" href="/docs">Docs</a></li>
                <li><a class="focus-ring relative inline-flex rounded-sm before:absolute before:-inset-x-2 before:-inset-y-3 hover:text-headline" href="/components">Components</a></li>
                <li>
                    <a
                        class="focus-ring relative inline-flex items-center rounded-sm before:absolute before:-inset-x-2 before:-inset-y-3 hover:text-headline"
                        href={STORYBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer">Storybook<ExternalLink size={12} class="ml-1 inline-block shrink-0 align-[-0.1em] opacity-70" aria-hidden="true" /><span class="sr-only">(opens in a new tab)</span></a>
                </li>
                <li>
                    <a
                        class="focus-ring relative inline-flex items-center rounded-sm before:absolute before:-inset-x-2 before:-inset-y-3 hover:text-headline"
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer">GitHub<ExternalLink size={12} class="ml-1 inline-block shrink-0 align-[-0.1em] opacity-70" aria-hidden="true" /><span class="sr-only">(opens in a new tab)</span></a>
                </li>
                <li>
                    <a
                        class="focus-ring relative inline-flex items-center rounded-sm before:absolute before:-inset-x-2 before:-inset-y-3 hover:text-headline"
                        href={NPM_URL}
                        target="_blank"
                        rel="noopener noreferrer">npm<ExternalLink size={12} class="ml-1 inline-block shrink-0 align-[-0.1em] opacity-70" aria-hidden="true" /><span class="sr-only">(opens in a new tab)</span></a>
                </li>
            </ul>
        </nav>
    </div>
</footer>
