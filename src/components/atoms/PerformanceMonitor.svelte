<script lang="ts">
    import { onMount } from "svelte";

    export let isVisible = false;
    export let showInDev = true;
    export let title = "Debug Panel";

    let metrics = {
        domContentLoaded: 0,
        loadComplete: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
    };

    onMount(() => {
        // Performance Observer for Core Web Vitals
        if (typeof window !== "undefined" && "PerformanceObserver" in window) {
            // First Paint
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === "first-paint") {
                        metrics.firstPaint = entry.startTime;
                    }
                }
            }).observe({ entryTypes: ["paint"] });

            // First Contentful Paint
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === "first-contentful-paint") {
                        metrics.firstContentfulPaint = entry.startTime;
                    }
                }
            }).observe({ entryTypes: ["paint"] });

            // Largest Contentful Paint
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                metrics.largestContentfulPaint = lastEntry.startTime;
            }).observe({ entryTypes: ["largest-contentful-paint"] });

            // Cumulative Layout Shift
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!(entry as any).hadRecentInput) {
                        metrics.cumulativeLayoutShift += (entry as any).value;
                    }
                }
            }).observe({ entryTypes: ["layout-shift"] });
        }

        // Basic timing metrics
        window.addEventListener("DOMContentLoaded", () => {
            metrics.domContentLoaded = performance.now();
        });

        window.addEventListener("load", () => {
            metrics.loadComplete = performance.now();
        });

        // Show metrics in development
        if (showInDev && import.meta.env.DEV) {
            setTimeout(() => {
                isVisible = true;
            }, 2000);
        }
    });

    function formatTime(ms: number): string {
        return `${Math.round(ms)}ms`;
    }

    function getPerformanceScore(): string {
        const fcp = metrics.firstContentfulPaint;
        const lcp = metrics.largestContentfulPaint;
        const cls = metrics.cumulativeLayoutShift;

        let score = 100;

        if (fcp > 1800) score -= 20;
        if (lcp > 2500) score -= 30;
        if (cls > 0.1) score -= 25;
        if (metrics.loadComplete > 3000) score -= 25;

        if (score >= 90) return "🟢 Excellent";
        if (score >= 70) return "🟡 Good";
        if (score >= 50) return "🟠 Needs Improvement";
        return "🔴 Poor";
    }
</script>

{#if isVisible}
    <div
        class="fixed bottom-4 left-4 p-4 rounded-lg text-xs font-mono z-50 max-w-xs"
        style="background-color: rgb(var(--color-surface-elevated)); color: rgb(var(--color-text));"
    >
        <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold">{title}</h3>
            <button
                on:click={() => (isVisible = false)}
                class="hover:opacity-80"
                style="color: rgb(var(--color-text-secondary));"
            >
                ×
            </button>
        </div>

        <div class="space-y-1">
            <div>FCP: {formatTime(metrics.firstContentfulPaint)}</div>
            <div>LCP: {formatTime(metrics.largestContentfulPaint)}</div>
            <div>CLS: {metrics.cumulativeLayoutShift.toFixed(3)}</div>
            <div>Load: {formatTime(metrics.loadComplete)}</div>
            <div
                class="pt-1"
                style="border-top-color: rgb(var(--color-border));"
            >
                <div class="font-semibold">{getPerformanceScore()}</div>
            </div>
        </div>
    </div>
{/if}
