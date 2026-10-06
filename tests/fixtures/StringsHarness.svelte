<script lang="ts">
    import CodeBlock from "../../src/components/atoms/CodeBlock.svelte";
    import ColorPicker from "../../src/components/atoms/ColorPicker.svelte";
    import Toggle from "../../src/components/atoms/Toggle.svelte";
    import ComponentDemo from "../../src/components/molecules/ComponentDemo.svelte";
    import ContactForm from "../../src/components/molecules/ContactForm.svelte";
    import FormField from "../../src/components/molecules/FormField.svelte";
    import PropsTable from "../../src/components/molecules/PropsTable.svelte";
    import SidebarBrandHeader from "../../src/components/molecules/SidebarBrandHeader.svelte";
    import SidebarFooter from "../../src/components/molecules/SidebarFooter.svelte";
    import SidebarAccountPanel from "../../src/components/organisms/SidebarAccountPanel.svelte";
    import SidebarNavigation from "../../src/components/organisms/SidebarNavigation.svelte";
    import TopNavbar from "../../src/components/organisms/TopNavbar.svelte";
    import type { ThemeMode } from "../../src/components/util/theme-mode";

    /**
     * Each component that has words of its own, in the state that says the
     * most of them. With `words`, every one of them is the app's; without,
     * they are the defaults.
     */
    interface Props {
        kind: string;
        // Each component reads the keys it knows.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        words?: any;
        themeModes?: "two" | "three";
        collapsed?: boolean;
        onThemeModeChange?: (mode: ThemeMode) => void;
        onThemeToggle?: (next: boolean) => void;
    }

    let { kind, words, themeModes, collapsed = false, onThemeModeChange, onThemeToggle }: Props = $props();

    /** The props that were settable all along: an app in another language sets these too. */
    const own = $derived(words ? "¤own" : undefined);
</script>

{#if kind === "FormField"}
    <FormField label="Namn" required requiredLabel={words?.requiredLabel}>
        {#snippet control(field)}
            <input {...field} />
        {/snippet}
    </FormField>
{:else if kind === "CodeBlock"}
    <CodeBlock code="let a = 1;" copyLabel={words?.copyLabel} copiedLabel={words?.copiedLabel} />
{:else if kind === "ColorPicker"}
    <ColorPicker label="Färg" strings={words} />
{:else if kind === "Toggle"}
    <Toggle aria-label={words?.ariaLabel} aria-labelledby={words?.ariaLabelledby} label={words?.label} />
{:else if kind === "ContactForm"}
    <ContactForm strings={words} />
{:else if kind === "PropsTable"}
    <PropsTable
        caption={own}
        strings={words}
        props={[
            { name: "label", type: "string", required: true, description: "Namnet" },
            { name: "size", type: "string", required: false, description: "Storleken" },
        ]}
    />
    <PropsTable caption={own} strings={words} props={[]} />
{:else if kind === "ComponentDemo"}
    <ComponentDemo title="Knapp" code="<Button />" strings={words}>Innehåll</ComponentDemo>
{:else if kind === "SidebarBrandHeader"}
    <SidebarBrandHeader logoSrc="/logo.png" strings={words} />
{:else if kind === "SidebarFooter"}
    <SidebarFooter {collapsed} profileName="Anna" profileEmail="anna@example.se" profileInitials="AN" strings={words} />
{:else if kind === "SidebarAccountPanel"}
    <SidebarAccountPanel
        profileName="Anna"
        profileEmail="anna@example.se"
        logoutLabel={own ?? "Log out"}
        strings={words}
        {themeModes}
        {onThemeModeChange}
        {onThemeToggle}
    />
{:else if kind === "SidebarNavigation"}
    <SidebarNavigation
        ariaLabel={own}
        strings={words}
        logoSrc="/logo.png"
        profileName="Anna"
        profileEmail="anna@example.se"
        profileInitials="AN"
        searchPlaceholder={own}
        searchValue={words ? "zzz" : "zzz"}
        items={[
            { id: "a", label: "Rundor", href: "/rundor" },
            { id: "b", label: "Lag", href: "/lag", section: "Spel" },
            { id: "c", label: "Hjälp", href: "/hjalp", group: "secondary" },
        ]}
    />
    <SidebarNavigation
        ariaLabel={own}
        strings={words}
        mode={collapsed ? "collapsed" : "expanded"}
        logoSrc="/logo.png"
        profileName="Anna"
        profileEmail="anna@example.se"
        profileInitials="AN"
        searchPlaceholder={own}
        items={[
            { id: "a", label: "Rundor", href: "/rundor" },
            { id: "b", label: "Lag", href: "/lag", section: "Spel" },
            { id: "c", label: "Hjälp", href: "/hjalp", group: "secondary" },
        ]}
    />
{:else if kind === "TopNavbar"}
    <TopNavbar
        brand="Quizrundan"
        ariaLabel={own}
        strings={words}
        {themeModes}
        themeLabels={words?.themeLabels}
        themeStorageKey={null}
        items={[
            { label: "Rundor", href: "/rundor" },
            { label: "Källkod", href: "https://example.se/kod" },
        ]}
    />
{/if}
