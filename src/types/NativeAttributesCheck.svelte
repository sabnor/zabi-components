<script lang="ts">
    /**
     * Type-level guard, checked by `npm run check` and never packaged (the
     * library build takes only `.ts` from this folder): a form control takes
     * the attributes of the element it renders, typed, not only the props it
     * names. Each of these was spread onto the element at runtime while the
     * component's `Props` was a closed interface, so `<Input autocomplete="email" />`
     * worked in the browser and was an error under svelte-check.
     *
     * Each control gets what its element takes. `autocomplete` and `maxlength`
     * belong to `<input>` and `<textarea>`; `inputmode` and `enterkeyhint` are
     * global attributes, so the button-based controls (Select's trigger,
     * Toggle, ThemeToggle) and the plain elements (Text, Table) take them too.
     */
    import Button from "../components/atoms/Button.svelte";
    import Checkbox from "../components/atoms/Checkbox.svelte";
    import IconButton from "../components/atoms/IconButton.svelte";
    import Input from "../components/atoms/Input.svelte";
    import Radio from "../components/atoms/Radio.svelte";
    import Rating from "../components/atoms/Rating.svelte";
    import Select from "../components/atoms/Select.svelte";
    import Table from "../components/atoms/Table.svelte";
    import Text from "../components/atoms/Text.svelte";
    import Textarea from "../components/atoms/Textarea.svelte";
    import ThemeToggle from "../components/atoms/ThemeToggle.svelte";
    import Toggle from "../components/atoms/Toggle.svelte";
    import RadioGroup from "../components/molecules/RadioGroup.svelte";
    import SegmentedControl from "../components/molecules/SegmentedControl.svelte";
    import type {
        ButtonProps,
        CheckboxProps,
        InputProps,
        RatingProps,
        SegmentedControlProps,
        SelectProps,
        TextareaProps,
        ToggleProps,
    } from "./index";

    // The exported props types take the same attributes as the components.
    const input: InputProps = {
        label: "E-post",
        autocomplete: "email",
        inputmode: "email",
        maxlength: 120,
        enterkeyhint: "next",
        "data-testid": "email",
        hint: "Vi delar den inte.",
        error: "",
        revealable: false,
    };
    const textarea: TextareaProps = {
        autocomplete: "off",
        inputmode: "text",
        maxlength: 500,
        enterkeyhint: "enter",
        "data-testid": "notes",
        hint: "Högst 500 tecken.",
    };
    const checkbox: CheckboxProps = {
        autocomplete: "off",
        inputmode: "none",
        enterkeyhint: "done",
        required: true,
        "data-testid": "terms",
    };
    const select: SelectProps = {
        inputmode: "none",
        enterkeyhint: "done",
        "data-testid": "team",
        "aria-describedby": "elsewhere",
        hint: "Välj ett lag.",
    };
    const toggle: ToggleProps = {
        inputmode: "none",
        enterkeyhint: "done",
        "data-testid": "notify",
        "aria-describedby": "elsewhere",
    };
    const rating: RatingProps = { label: "Quiz", id: "quiz", "data-testid": "quiz", "aria-describedby": "elsewhere" };
    const segmented: SegmentedControlProps = {
        label: "Storlek",
        options: [{ value: "s", label: "S" }, { value: "m", label: "M" }],
        id: "size",
        "data-testid": "size",
        "aria-describedby": "elsewhere",
    };
    // `variant` aside: the exported type still lists deprecated values the component never took.
    const link: Omit<ButtonProps, "variant"> = { href: "/login", target: "_blank", rel: "noopener", download: true };
</script>

<Input {...input} />
<Input
    label="E-post"
    autocomplete="email"
    inputmode="email"
    maxlength={120}
    enterkeyhint="next"
    data-testid="email"
    onchange={(event) => event.currentTarget.value}
/>
<Input label="Lösenord" type="password" autocomplete="current-password" revealable revealLabel="Visa lösenord" />

<Textarea {...textarea} />
<Textarea
    label="Anteckningar"
    autocomplete="off"
    inputmode="text"
    maxlength={500}
    enterkeyhint="enter"
    data-testid="notes"
/>

<Checkbox {...checkbox} />
<Checkbox label="Villkor" autocomplete="off" inputmode="none" enterkeyhint="done" required data-testid="terms" />
<Radio label="Ja" inputmode="none" enterkeyhint="done" required data-testid="yes" />

<Select {...select} />
<Select label="Lag" inputmode="none" enterkeyhint="done" data-testid="team" aria-describedby="elsewhere" />

<Toggle {...toggle} />
<Toggle label="Aviseringar" inputmode="none" enterkeyhint="done" data-testid="notify" />

<ThemeToggle inputmode="none" enterkeyhint="done" data-testid="theme" id="theme" />

<Text inputmode="none" enterkeyhint="done" data-testid="text" id="intro">Text</Text>
<Table caption="Besök" inputmode="none" enterkeyhint="done" data-testid="visits" id="visits" />

<!-- The groups: rest attributes land on the host (a div with role="radiogroup", or a fieldset). -->
<Rating {...rating} />
<Rating label="Quiz" id="quiz" data-testid="quiz" aria-describedby="elsewhere" inputmode="none" enterkeyhint="done" />
<SegmentedControl {...segmented} />
<SegmentedControl
    label="Storlek"
    options={[{ value: "s", label: "S" }, { value: "m", label: "M" }]}
    id="size"
    data-testid="size"
    aria-describedby="elsewhere"
    inputmode="none"
    enterkeyhint="done"
/>
<RadioGroup
    legend="Svar"
    options={[{ value: "ja", label: "Ja" }]}
    id="answer"
    data-testid="answer"
    aria-describedby="elsewhere"
    inputmode="none"
    enterkeyhint="done"
    form="visit"
/>

<!-- A link takes a link's attributes, and a button still takes a button's. -->
<Button {...link} />
<Button href="/login" target="_blank" rel="noopener" download="visits.csv">Logga in</Button>
<Button type="submit" form="visit" formnovalidate>Spara</Button>
<IconButton href="/settings" target="_blank" rel="noopener" label="Inställningar" />
<IconButton type="submit" form="visit" label="Spara" />
