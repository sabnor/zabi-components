// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Sparkline from "../src/components/atoms/Sparkline.svelte";
import BarChart from "../src/components/molecules/BarChart.svelte";
import LineChart from "../src/components/molecules/LineChart.svelte";
import PieChart from "../src/components/molecules/PieChart.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("charts (server render)", () => {
    it("LineChart is drawn on the server at a width that scales, with its table", () => {
        const { body } = renderOnServer(LineChart, {
            props: { label: "Rätt svar", xLabels: ["a", "b"], series: [{ name: "Lag", points: [1, 2] }] },
        });
        expect(body).toContain('viewBox="0 0 600 240"');
        expect(body).toMatch(/<path[^>]*class="line[^"]*"[^>]*d="M/);
        expect(body).toContain("<table");
        expect(body).toContain("Rätt svar");
        expect(body).not.toContain("NaN");
    });

    it("BarChart, PieChart and Sparkline are drawn on the server", () => {
        const data = [
            { label: "a", value: 3 },
            { label: "b", value: 1 },
        ];
        const bar = renderOnServer(BarChart, { props: { label: "Staplar", data } }).body;
        expect(bar.match(/<rect/g)).toHaveLength(2);
        const pie = renderOnServer(PieChart, { props: { label: "Delar", data, locale: "en" } }).body;
        expect(pie.match(/class="slice/g)).toHaveLength(2);
        expect(pie).toContain("75%");
        const spark = renderOnServer(Sparkline, { props: { points: [1, 2, 3], label: "Upp" } }).body;
        expect(spark).toContain('role="img"');
        expect(spark).toContain('aria-label="Upp"');
        for (const body of [bar, pie, spark]) expect(body).not.toContain("NaN");
    });
});
