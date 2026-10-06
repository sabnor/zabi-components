<script lang="ts">
    import Select from "../../../components/atoms/Select.svelte";
    import Dropdown from "../../../components/molecules/Dropdown.svelte";
    import Button from "../../../components/atoms/Button.svelte";
    import Input from "../../../components/atoms/Input.svelte";

    /** QA review lab for Select (playwright/qa-select-review.spec.ts). */
    const opts = [
        { value: "a", label: "Alfa" },
        { value: "b", label: "Beta" },
        { value: "c", label: "Gamma", disabled: true },
        { value: "d", label: "Delta" },
    ];
    const long = [
        { value: "x", label: "Första torsdagen i varje månad utom under sommaruppehållet" },
        { value: "y", label: "Varannan vecka" },
    ];
    const S = {
        placeholder: "ZZ-placeholder",
        searchPlaceholder: "ZZ-search",
        noResults: "ZZ-noresults",
        loading: "ZZ-loading",
        emptyTitle: "ZZ-emptytitle",
        emptyDescription: "ZZ-emptydesc",
        listLabel: "ZZ-list",
        closeLabel: "ZZ-close",
        expandLabel: "ZZ-expand",
        collapseLabel: "ZZ-collapse",
    };

    let pre = $state<string | number | undefined>("b");
    let req = $state<string | number | undefined>(undefined);
    let nat = $state<string | number | undefined>("a");
    let natReq = $state<string | number | undefined>(undefined);
    let log = $state<string[]>([]);
    let ddOpen = $state(false);
    let asyncOpts = $state<typeof opts>([]);
    let asyncValue = $state<string | number | undefined>("b");
    let staleValue = $state<string | number | undefined>("zzz");
    const note = (what: string) => (event: Event) =>
        (log = [...log, `${what}=${(event.target as HTMLSelectElement).value}`]);
</script>

<svelte:head><title>QA select</title></svelte:head>

<main class="p-[16px]">
    <form method="GET" class="w-[328px] max-w-full space-y-4" data-testid="f">
        <div data-testid="pre"><Select label="Preselected" name="pre" hint="Hint for pre" options={opts} searchable={false} bind:value={pre} onchange={note("pre")} /></div>
        <div data-testid="req"><Select label="Required" name="req" required options={opts} searchable={false} bind:value={req} onchange={note("req")} /></div>
        <div data-testid="req2"><Select label="Required too" name="req2" required options={opts} searchable={false} /></div>
        <div data-testid="dis"><Select label="Disabled" name="dis" disabled value="a" options={opts} /></div>
        <div data-testid="err"><Select label="With error" name="err" value="a" error="Fel val" hint="Hint for err" options={opts} /></div>
        <div data-testid="nat"><Select label="Native" name="nat" presentation="native" hint="Hint for native" options={opts} bind:value={nat} onchange={note("nat")} /></div>
        <div data-testid="nat-req"><Select label="Native required" name="natreq" presentation="native" required options={opts} bind:value={natReq} /></div>
        <div data-testid="nat-err"><Select label="Native error" name="naterr" presentation="native" error="Fel val" value="a" options={opts} /></div>
        <div data-testid="nat-dis"><Select label="Native disabled" name="natdis" presentation="native" disabled value="a" options={opts} /></div>
        <div data-testid="nat-long"><Select label="Native long" name="natlong" presentation="native" value="x" options={long} /></div>
        <div data-testid="sm"><Select label="Small" name="sm" size="sm" value="a" options={opts} searchable={false} /></div>
        <div data-testid="lg"><Select label="Large" name="lg" size="lg" value="a" options={opts} searchable={false} /></div>
        <div data-testid="lng"><Select label="Long" name="lng" value="x" options={long} searchable={false} /></div>
        <div data-testid="aria"><Select aria-label="Team" name="aria" value="a" options={opts} searchable={false} /></div>
        <button type="submit" data-testid="submit" class="min-h-11 border px-3">Submit</button>
        <button type="reset" data-testid="reset" class="min-h-11 border px-3">Reset</button>
    </form>
    <button type="button" data-testid="set" class="min-h-11 border px-3" onclick={() => { pre = "d"; nat = "d"; }}>Set d</button>
    <a href="/chaos-lab/select-states" data-testid="away" data-sveltekit-reload>Away</a>
    <p data-testid="state">{pre ?? ""}|{req ?? ""}|{nat ?? ""}|{natReq ?? ""}|{log.join(",")}</p>

    <form method="GET" class="mt-4 w-[328px] max-w-full space-y-4" data-testid="f2">
        <div data-testid="two-a"><Select label="First" name="a1" required options={opts} searchable={false} /></div>
        <div data-testid="two-b"><Select label="Second" name="a2" required options={opts} searchable={false} /></div>
        <div data-testid="async"><Select label="Async" name="async" options={asyncOpts} isLoading={asyncOpts.length === 0} searchable={false} bind:value={asyncValue} onchange={note("async")} /></div>
        <div data-testid="stale"><Select label="Stale" name="stale" options={opts} searchable={false} bind:value={staleValue} onchange={note("stale")} /></div>
        <button type="submit" data-testid="submit2" class="min-h-11 border px-3">Submit 2</button>
    </form>
    <button type="button" data-testid="load" class="min-h-11 border px-3" onclick={() => (asyncOpts = opts)}>Load options</button>
    <p data-testid="state2">{asyncValue ?? "UNDEFINED"}|{staleValue ?? "UNDEFINED"}</p>

    <h2 class="mt-8">Strings</h2>
    <div class="w-[328px] max-w-full space-y-4">
        <div data-testid="str-search"><Select label="L1" strings={S} options={opts} /></div>
        <div data-testid="str-empty"><Select label="L2" strings={S} options={[]} /></div>
        <div data-testid="str-loading"><Select label="L3" strings={S} options={opts} isLoading /></div>
        <div data-testid="str-native"><Select label="L4" strings={S} options={opts} presentation="native" /></div>
        <div data-testid="str-sheet"><Select label="L5" strings={S} options={opts} presentation="sheet" /></div>
        <div data-testid="str-nolabel"><Select strings={S} options={opts} presentation="sheet" /></div>
    </div>

    <h2 class="mt-8">Contexts</h2>
    <div class="flex items-center gap-3" data-testid="ctx-row">
        <span>Sort by</span>
        <Select options={opts} value="a" searchable={false} />
        <Button>Go</Button>
    </div>
    <div class="mt-4 flex items-end gap-3" data-testid="ctx-toolbar">
        <Input label="Search" />
        <Select label="Status" options={opts} value="a" searchable={false} />
        <Button>Apply</Button>
    </div>
    <div class="mt-4 inline-flex items-center gap-3 border" data-testid="ctx-inline-flex">
        <span>Rows</span>
        <Select options={opts} value="a" searchable={false} />
    </div>
    <table class="mt-4" data-testid="ctx-table"><tbody><tr><td>Name</td><td><Select options={opts} value="a" searchable={false} /></td></tr></tbody></table>
    <div class="mt-4" data-testid="ctx-text">Show <span class="inline-block"><Select options={opts} value="a" searchable={false} /></span> per page</div>
    <div class="mt-4 flex justify-between" data-testid="ctx-between">
        <span>Title</span>
        <Select options={opts} value="a" searchable={false} />
    </div>
    <div class="mt-4" data-testid="ctx-classw"><Select class="w-48" options={opts} value="a" searchable={false} /></div>

    <h2 class="mt-8">Dropdown</h2>
    <div class="w-[328px]" data-testid="dd-full">
        <Dropdown fullWidth bind:isOpen={ddOpen} ariaLabel="Actions">
            {#snippet trigger(aria)}
                <button type="button" class="w-full border min-h-11" onclick={() => (ddOpen = !ddOpen)} {...aria}>Full width menu</button>
            {/snippet}
            <button role="menuitem" class="block w-full px-3 py-2 text-left">One</button>
            <button role="menuitem" class="block w-full px-3 py-2 text-left">Two</button>
        </Dropdown>
    </div>
    <div class="h-[500px]"></div>
</main>
