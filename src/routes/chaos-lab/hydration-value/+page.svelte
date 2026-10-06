<script lang="ts">
    import Checkbox from "../../../components/atoms/Checkbox.svelte";
    import DateField from "../../../components/atoms/DateField.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Radio from "../../../components/atoms/Radio.svelte";
    import Rating from "../../../components/atoms/Rating.svelte";
    import Select from "../../../components/atoms/Select.svelte";
    import Slider from "../../../components/atoms/Slider.svelte";
    import Textarea from "../../../components/atoms/Textarea.svelte";
    import TimeField from "../../../components/atoms/TimeField.svelte";
    import RadioGroup from "../../../components/molecules/RadioGroup.svelte";
    import SegmentedControl from "../../../components/molecules/SegmentedControl.svelte";

    /**
     * Every control that holds a value, bound to state of this page, for
     * playwright/hydration-value.spec.ts: the page is server-rendered, the
     * test changes a control before the scripts arrive, and once the page has
     * hydrated the choice must still be shown, be the bound value, and have
     * been reported once.
     *
     * Each control has an output beside it with the bound value, and the
     * number of times its change callback has run.
     */
    const sizes = [
        { value: "s", label: "Small" },
        { value: "m", label: "Medium" },
        { value: "l", label: "Large" },
    ];
    const answers = [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "maybe", label: "Maybe" },
    ];

    let terms = $state(false);
    let news = $state(true);
    let native = $state(false);
    let radioA = $state(false);
    let radioB = $state(false);
    let answer = $state<string | undefined>("");
    let preset = $state<string | undefined>("no");
    let stars = $state<number | null>(null);
    let starsPreset = $state<number | null>(2);
    let size = $state<string | undefined>();
    let sizePreset = $state<string | undefined>("s");
    let sizeLoose = $state<string | undefined>("s");
    let starsLoose = $state<number | null>(2);
    let name = $state("");
    let team = $state<string | number | undefined>();
    let notes = $state("");
    let volume = $state(20);
    let date = $state("");
    let time = $state("");

    /** A parent that listens instead of binding: it only learns of a choice through the callback. */
    let listened = $state(false);
    let listenedStars = $state<number | null>(null);

    const calls = $state<Record<string, number>>({});
    const count = (key: string) => (calls[key] = (calls[key] ?? 0) + 1);
</script>

<svelte:head>
    <title>Hydration value lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="space-y-6 p-4">
    <h1 class="text-lg font-semibold text-headline">Hydration value lab</h1>

    <form class="space-y-6" data-testid="lab-form" onsubmit={(event) => event.preventDefault()}>
        <section data-lab="native">
            <label><input type="checkbox" bind:checked={native} data-testid="native" /> Native, bound</label>
            <output data-testid="native-value">{native}</output>
        </section>

        <section data-lab="checkbox">
            <Checkbox label="Terms" bind:checked={terms} onchange={() => count("checkbox")} />
            <output data-testid="checkbox-value">{terms}</output>
            <output data-testid="checkbox-calls">{calls.checkbox ?? 0}</output>
        </section>

        <section data-lab="checkbox-on">
            <Checkbox label="Newsletter" bind:checked={news} onchange={() => count("checkbox-on")} />
            <output data-testid="checkbox-on-value">{news}</output>
            <output data-testid="checkbox-on-calls">{calls["checkbox-on"] ?? 0}</output>
        </section>

        <section data-lab="checkbox-listened">
            <Checkbox
                label="Listened to"
                checked={listened}
                onchange={(event) => {
                    listened = (event.target as HTMLInputElement).checked;
                    count("checkbox-listened");
                }}
            />
            <output data-testid="checkbox-listened-value">{listened}</output>
            <output data-testid="checkbox-listened-calls">{calls["checkbox-listened"] ?? 0}</output>
        </section>

        <section data-lab="radio">
            <Radio label="Option A" name="lab-radio" value="a" bind:checked={radioA} onchange={() => count("radio")} />
            <Radio label="Option B" name="lab-radio" value="b" bind:checked={radioB} onchange={() => count("radio")} />
            <output data-testid="radio-value">{radioA ? "a" : radioB ? "b" : "none"}</output>
            <output data-testid="radio-calls">{calls.radio ?? 0}</output>
        </section>

        <section data-lab="radio-group">
            <RadioGroup legend="Answer" options={answers} bind:value={answer} />
            <output data-testid="radio-group-value">{answer || "none"}</output>
        </section>

        <section data-lab="radio-group-preset">
            <RadioGroup legend="Preset answer" name="preset-answer" options={answers} bind:value={preset} />
            <output data-testid="radio-group-preset-value">{preset || "none"}</output>
        </section>

        <section data-lab="rating">
            <Rating label="Quiz" bind:value={stars} onchange={() => count("rating")} />
            <output data-testid="rating-value">{stars ?? "none"}</output>
            <output data-testid="rating-calls">{calls.rating ?? 0}</output>
        </section>

        <section data-lab="rating-preset">
            <Rating label="Food" name="food" bind:value={starsPreset} onchange={() => count("rating-preset")} />
            <output data-testid="rating-preset-value">{starsPreset ?? "none"}</output>
            <output data-testid="rating-preset-calls">{calls["rating-preset"] ?? 0}</output>
        </section>

        <section data-lab="rating-listened">
            <Rating
                label="Mood"
                value={listenedStars}
                onchange={(value) => {
                    listenedStars = value;
                    count("rating-listened");
                }}
            />
            <output data-testid="rating-listened-value">{listenedStars ?? "none"}</output>
            <output data-testid="rating-listened-calls">{calls["rating-listened"] ?? 0}</output>
        </section>

        <section data-lab="segmented">
            <SegmentedControl label="Size" options={sizes} bind:value={size} onchange={() => count("segmented")} />
            <output data-testid="segmented-value">{size ?? "none"}</output>
            <output data-testid="segmented-calls">{calls.segmented ?? 0}</output>
        </section>

        <section data-lab="segmented-preset">
            <SegmentedControl
                label="Preset size"
                name="preset-size"
                options={sizes}
                bind:value={sizePreset}
                onchange={() => count("segmented-preset")}
            />
            <output data-testid="segmented-preset-value">{sizePreset ?? "none"}</output>
            <output data-testid="segmented-preset-calls">{calls["segmented-preset"] ?? 0}</output>
        </section>

        <!-- Without a `name`, and with a selection from the start: the radios still have to be one group. -->
        <section data-lab="segmented-loose">
            <SegmentedControl label="Loose size" options={sizes} bind:value={sizeLoose} />
            <output data-testid="segmented-loose-value">{sizeLoose ?? "none"}</output>
        </section>

        <section data-lab="rating-loose">
            <Rating label="Loose score" bind:value={starsLoose} />
            <output data-testid="rating-loose-value">{starsLoose ?? "none"}</output>
        </section>

        <!-- Select brings its own way of keeping a choice: a native select in the server markup. -->
        <section data-lab="select">
            <Select label="Team" options={answers} bind:value={team} searchable={false} />
            <output data-testid="select-value">{team ?? "none"}</output>
        </section>

        <section data-lab="input">
            <Input label="Name" bind:value={name} data-testid="input" />
            <output data-testid="input-value">{name}</output>
        </section>

        <section data-lab="textarea">
            <Textarea label="Notes" bind:value={notes} data-testid="textarea" />
            <output data-testid="textarea-value">{notes}</output>
        </section>

        <section data-lab="slider">
            <Slider label="Volume" min={0} max={100} bind:value={volume} data-testid="slider" />
            <output data-testid="slider-value">{volume}</output>
        </section>

        <section data-lab="date">
            <DateField label="Date" bind:value={date} data-testid="date" />
            <output data-testid="date-value">{date || "none"}</output>
        </section>

        <section data-lab="time">
            <TimeField label="Time" bind:value={time} data-testid="time" />
            <output data-testid="time-value">{time || "none"}</output>
        </section>

        <button type="reset" data-testid="lab-reset">Reset</button>
    </form>
</main>
