<script lang="ts">
    import ComponentDemo from "../../components/molecules/ComponentDemo.svelte";
    import Button from "../../components/atoms/Button.svelte";
    import IconButton from "../../components/atoms/IconButton.svelte";
    import Card from "../../components/atoms/Card.svelte";
    import CardHeader from "../../components/atoms/CardHeader.svelte";
    import CardContent from "../../components/atoms/CardContent.svelte";
    import Input from "../../components/atoms/Input.svelte";
    import Textarea from "../../components/atoms/Textarea.svelte";
    import Alert from "../../components/molecules/Alert.svelte";
    import Badge from "../../components/atoms/Badge.svelte";
    import Checkbox from "../../components/atoms/Checkbox.svelte";
    import Select from "../../components/atoms/Select.svelte";
    import Toggle from "../../components/atoms/Toggle.svelte";
    import Progress from "../../components/atoms/Progress.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Modal from "../../components/molecules/Modal.svelte";
    import Dropdown from "../../components/molecules/Dropdown.svelte";
    import Tabs from "../../components/molecules/Tabs.svelte";
    import ColorPicker from "../../components/atoms/ColorPicker.svelte";
    import CodeBlock from "../../components/atoms/CodeBlock.svelte";
    import FeatureCard from "../../components/atoms/FeatureCard.svelte";
    import List from "../../components/atoms/List.svelte";
    import OptimizedImage from "../../components/atoms/OptimizedImage.svelte";
    import Skeleton from "../../components/atoms/Skeleton.svelte";
    import Toast from "../../components/atoms/Toast.svelte";
    import Tooltip from "../../components/atoms/Tooltip.svelte";
    import ContactForm from "../../components/molecules/ContactForm.svelte";
    import Form from "../../components/molecules/Form.svelte";
    import ImageUpload from "../../components/molecules/ImageUpload.svelte";
    import SlideUp from "../../components/molecules/SlideUp.svelte";
    import NavigationMenu from "../../components/molecules/NavigationMenu.svelte";
    import NavigationMenuList from "../../components/molecules/NavigationMenuList.svelte";
    import NavigationMenuItem from "../../components/molecules/NavigationMenuItem.svelte";
    import NavigationMenuTrigger from "../../components/molecules/NavigationMenuTrigger.svelte";
    import NavigationMenuContent from "../../components/molecules/NavigationMenuContent.svelte";
    import NavigationMenuLink from "../../components/molecules/NavigationMenuLink.svelte";
    import TopNavbar from "../../components/organisms/TopNavbar.svelte";
    import SidebarNavigation from "../../components/organisms/SidebarNavigation.svelte";
    import SidebarAccountPanel from "../../components/organisms/SidebarAccountPanel.svelte";
    import SidebarPanel from "../../components/organisms/SidebarPanel.svelte";
    import {
        CircleCheck,
        CircleHelp,
        Circle,
        Heart,
    } from "@lucide/svelte";
    import type { ComponentMetadata } from "../../types/page.types";
    import {
        docsListItems,
        selectOptions,
        sampleCode,
        sidebarAppShellDemoItems,
        sidebarNavItems,
        sidebarProjectItems,
    } from "$lib/showcase/components-showcase-constants";

    interface Props {
        component: ComponentMetadata;
        modalOpen?: boolean;
        slideUpOpen?: boolean;
        activeTab?: string;
        selectValue?: string | number | undefined;
        sidebarPath?: string;
        sidebarSearchValue?: string;
        sidebarSearchPanelOpen?: boolean;
        sidebarProjectSearch?: string;
        selectedProjectId?: string;
    }

    let {
        component,
        modalOpen = $bindable(false),
        slideUpOpen = $bindable(false),
        activeTab = $bindable("tab1"),
        selectValue = $bindable<string | number | undefined>(undefined),
        sidebarPath = $bindable("/revenue"),
        sidebarSearchValue = $bindable("Revenue"),
        sidebarSearchPanelOpen = $bindable(false),
        sidebarProjectSearch = $bindable(""),
        selectedProjectId = $bindable("proj-zabi-web"),
    }: Props = $props();

    /** Local state for the SidebarNavigation “app shell” demo only. */
    let appShellPath = $state("/workspace/overview");
    let appShellLightMode = $state(false);
    let appShellSearchValue = $state("");


    /** SidebarNavigation profile-panel demo (matches project picker behavior). */
    const sidebarAccountPanelId = "sidebar-account-panel";
    let sidebarAccountPanelOpen = $state(false);
    let sidebarAccountLightMode = $state(false);
    /** SidebarNavigation app-shell profile-panel demo. */
    const appShellAccountPanelId = "app-shell-account-panel";
    let appShellAccountPanelOpen = $state(false);
    let appShellAccountLightMode = $state(false);

    function toggleSidebarAccountPanel(): void {
        sidebarAccountPanelOpen = !sidebarAccountPanelOpen;
    }

    function toggleAppShellAccountPanel(): void {
        appShellAccountPanelOpen = !appShellAccountPanelOpen;
    }

    function appShellLeafTitle(path: string): string {
        const segments = path.split("/").filter(Boolean);
        const leaf = segments[segments.length - 1] ?? "overview";
        return leaf
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }

    const appShellMainTitle = $derived(appShellLeafTitle(appShellPath));
</script>

<div class="space-y-8">
                            {#each component.examples as example}
                                <ComponentDemo
                                    title={example.title}
                                    description={example.description}
                                    code={example.code}
                                    language={example.language || "svelte"}
                                >
                                    {#if component.name === "Button"}
                                        <div class="space-y-4">
                                            <div class="flex flex-wrap items-center gap-2">
                                                <span
                                                    class="text-sm font-medium text-headline"
                                                >
                                                    Variants:
                                                </span>
                                                {#each component.variants as variant}
                                                    <span
                                                        class="rounded-md bg-base-100 px-2 py-1 text-xs text-headline"
                                                    >
                                                        {variant}
                                                    </span>
                                                {/each}
                                            </div>
                                            <div
                                                class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
                                            >
                                                <Button
                                                    variant="primary"
                                                    text="Primary"
                                                />
                                                <Button
                                                    variant="secondary"
                                                    text="Secondary"
                                                />
                                                <Button
                                                    variant="outline"
                                                    text="Outline"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    text="Ghost"
                                                />
                                                <Button
                                                    variant="link"
                                                    text="Link"
                                                />
                                                <Button
                                                    variant="danger"
                                                    text="Danger"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-wrap gap-4 items-center"
                                            >
                                                <Button
                                                    variant="primary"
                                                    disabled
                                                    text="Disabled Primary"
                                                />
                                                <Button
                                                    variant="secondary"
                                                    disabled
                                                    text="Disabled Secondary"
                                                />
                                                <Button
                                                    variant="danger"
                                                    disabled
                                                    text="Disabled Danger"
                                                />
                                            </div>
                                        </div>
                                    {:else if component.name === "IconButton"}
                                        <div class="space-y-4">
                                            <div
                                                class="flex flex-wrap gap-4 items-center"
                                            >
                                                <div
                                                    class="flex flex-col items-center gap-1"
                                                >
                                                    <span
                                                        class="text-xs font-medium text-headline"
                                                    >
                                                        primary
                                                    </span>
                                                    <IconButton
                                                        variant="primary"
                                                        label="Favorite"
                                                    >
                                                        <Heart />
                                                    </IconButton>
                                                </div>
                                                <div
                                                    class="flex flex-col items-center gap-1"
                                                >
                                                    <span
                                                        class="text-xs font-medium text-headline"
                                                    >
                                                        secondary
                                                    </span>
                                                    <IconButton
                                                        variant="secondary"
                                                        label="Favorite"
                                                    >
                                                        <Heart />
                                                    </IconButton>
                                                </div>
                                                <div
                                                    class="flex flex-col items-center gap-1"
                                                >
                                                    <span
                                                        class="text-xs font-medium text-headline"
                                                    >
                                                        ghost
                                                    </span>
                                                    <IconButton
                                                        variant="ghost"
                                                        label="Favorite"
                                                    >
                                                        <Heart />
                                                    </IconButton>
                                                </div>
                                                <div
                                                    class="flex flex-col items-center gap-1"
                                                >
                                                    <span
                                                        class="text-xs font-medium text-headline"
                                                    >
                                                        outline
                                                    </span>
                                                    <IconButton
                                                        variant="outline"
                                                        label="Favorite"
                                                    >
                                                        <Heart />
                                                    </IconButton>
                                                </div>
                                                <div
                                                    class="flex flex-col items-center gap-1"
                                                >
                                                    <span
                                                        class="text-xs font-medium text-headline"
                                                    >
                                                        danger
                                                    </span>
                                                    <IconButton
                                                        variant="danger"
                                                        label="Remove"
                                                    >
                                                        <Heart />
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div
                                                class="flex flex-wrap gap-4 items-center"
                                            >
                                                <IconButton
                                                    variant="primary"
                                                    disabled
                                                    label="Favorite"
                                                >
                                                    <Heart />
                                                </IconButton>
                                                <IconButton
                                                    variant="secondary"
                                                    disabled
                                                    label="Favorite"
                                                >
                                                    <Heart />
                                                </IconButton>
                                                <IconButton
                                                    variant="danger"
                                                    disabled
                                                    label="Remove"
                                                >
                                                    <Heart />
                                                </IconButton>
                                            </div>
                                        </div>
                                    {:else if component.name === "Input"}
                                        <div class="w-full space-y-4">
                                            <Input
                                                label="Name"
                                                placeholder="Enter your name"
                                                variant="default"
                                            />
                                            <Input
                                                label="Email"
                                                type="email"
                                                placeholder="Enter your email"
                                                variant="success"
                                            />
                                            <Input
                                                label="Password"
                                                type="password"
                                                placeholder="Enter your password"
                                                variant="warning"
                                            />
                                            <Input
                                                label="Error Field"
                                                placeholder="This field has an error"
                                                variant="error"
                                            />
                                            <Input
                                                label="Disabled Field"
                                                placeholder="This field is disabled"
                                                disabled={true}
                                            />
                                        </div>
                                    {:else if component.name === "Card"}
                                        <div
                                            class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                            <Card>
                                                <CardHeader title="Default Card" />
                                                <CardContent>
                                                    <p class="text-description">
                                                        This is a default card with
                                                        clean styling.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card variant="elevated">
                                                <CardHeader title="Elevated Card" />
                                                <CardContent>
                                                    <p class="text-description">
                                                        This card indicates a
                                                        successful action.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card variant="outlined">
                                                <CardHeader title="Outlined Card" />
                                                <CardContent>
                                                    <p class="text-description">
                                                        This card shows a warning
                                                        state.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card variant="flat">
                                                <CardHeader title="Flat Card" />
                                                <CardContent>
                                                    <p class="text-description">
                                                        This card indicates an error
                                                        state.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardHeader title="Info Card" />
                                                <CardContent>
                                                    <p class="text-description">
                                                        This card provides
                                                        informational content.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    {:else if component.name === "List"}
                                        <div class="w-full space-y-4">
                                            <List
                                                items={docsListItems}
                                                selectedId="billing"
                                                ariaLabel="Account navigation"
                                            />
                                            <List
                                                items={docsListItems}
                                                showArrow={false}
                                                ariaLabel="Account navigation without arrows"
                                            />
                                        </div>
                                    {:else if component.name === "Alert"}
                                        <div class="space-y-4">
                                            <Alert
                                                variant="info"
                                                title="Info Alert"
                                                message="This is an informational message."
                                            />
                                            <Alert
                                                variant="success"
                                                title="Success!"
                                                message="Your action was completed successfully."
                                            />
                                            <Alert
                                                variant="warning"
                                                title="Warning"
                                                message="Please review your input before proceeding."
                                            />
                                            <Alert
                                                variant="error"
                                                title="Error"
                                                message="Something went wrong. Please try again."
                                            />
                                        </div>
                                    {:else if component.name === "ContactForm"}
                                        <div class="w-full">
                                            <ContactForm />
                                        </div>
                                    {:else if component.name === "Dropdown"}
                                        <div class="w-full space-y-4">
                                            <Dropdown>
                                                {#snippet trigger()}
                                                    <Button
                                                        text="Select an option"
                                                    />
                                                {/snippet}
                                                {#snippet children()}
                                                    <div class="p-2 space-y-1">
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-base-100 rounded"
                                                            >Option 1</button
                                                        >
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-base-100 rounded"
                                                            >Option 2</button
                                                        >
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-base-100 rounded"
                                                            >Option 3</button
                                                        >
                                                    </div>
                                                {/snippet}
                                            </Dropdown>
                                            <Dropdown>
                                                {#snippet trigger()}
                                                    <Button
                                                        text="Choose a color"
                                                    />
                                                {/snippet}
                                                {#snippet children()}
                                                    <div class="p-2 space-y-1">
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-base-100 rounded"
                                                            >Red</button
                                                        >
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-base-100 rounded"
                                                            >Blue</button
                                                        >
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-base-100 rounded"
                                                            >Green</button
                                                        >
                                                    </div>
                                                {/snippet}
                                            </Dropdown>
                                        </div>
                                    {:else if component.name === "Form"}
                                        <div class="w-full">
                                            <Form>
                                                <div class="space-y-4">
                                                    <Input
                                                        label="Name"
                                                        placeholder="Enter your name"
                                                    />
                                                    <Input
                                                        label="Email"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                    />
                                                    <Textarea
                                                        label="Message"
                                                        placeholder="Enter your message"
                                                    />
                                                    <Button
                                                        type="submit"
                                                        text="Submit"
                                                    />
                                                </div>
                                            </Form>
                                        </div>
                                    {:else if component.name === "ImageUpload"}
                                        <div class="w-full">
                                            <ImageUpload
                                                accept="image/jpeg,image/png,image/gif"
                                                placeholder="Choose an image"
                                            />
                                        </div>
                                    {:else if component.name === "Modal"}
                                        <div class="space-y-4">
                                            <Button
                                                onclick={() =>
                                                    (modalOpen = true)}
                                                text="Open Modal"
                                            />
                                            <Modal
                                                isOpen={modalOpen}
                                                onclick={() =>
                                                    (modalOpen = false)}
                                                title="Example Modal"
                                            >
                                                <p
                                                    class="text-description mb-4"
                                                >
                                                    This is a modal dialog with
                                                    some content.
                                                </p>
                                                <div
                                                    class="flex gap-2 justify-end"
                                                >
                                                    <Button
                                                        variant="secondary"
                                                        onclick={() =>
                                                            (modalOpen = false)}
                                                        text="Cancel"
                                                    />
                                                    <Button
                                                        onclick={() =>
                                                            (modalOpen = false)}
                                                        text="Confirm"
                                                    />
                                                </div>
                                            </Modal>
                                        </div>
                                    {:else if component.name === "SlideUp"}
                                        <div class="space-y-4">
                                            <Button
                                                onclick={() =>
                                                    (slideUpOpen = true)}
                                                text="Open Slide Up"
                                            />
                                            <SlideUp
                                                isOpen={slideUpOpen}
                                                onclick={() =>
                                                    (slideUpOpen = false)}
                                                title="Slide Up Panel"
                                            >
                                                <div class="p-6">
                                                    <h3
                                                        class="text-lg font-semibold text-headline mb-4"
                                                    >
                                                        Slide Up Panel
                                                    </h3>
                                                    <p
                                                        class="text-description mb-4"
                                                    >
                                                        This is a slide-up panel
                                                        with custom content.
                                                    </p>
                                                    <Button
                                                        onclick={() =>
                                                            (slideUpOpen = false)}
                                                        text="Close"
                                                    />
                                                </div>
                                            </SlideUp>
                                        </div>
                                    {:else if component.name === "Tabs"}
                                        <div class="w-full">
                                            <Tabs
                                                tabs={[
                                                    {
                                                        id: "tab1",
                                                        label: "Overview",
                                                    },
                                                    {
                                                        id: "tab2",
                                                        label: "Details",
                                                    },
                                                    {
                                                        id: "tab3",
                                                        label: "Settings",
                                                    },
                                                ]}
                                                activeTab="tab1"
                                            >
                                                {#if activeTab === "tab1"}
                                                    <p>
                                                        This is the overview tab
                                                        content.
                                                    </p>
                                                {:else if activeTab === "tab2"}
                                                    <p>
                                                        This is the details tab
                                                        content.
                                                    </p>
                                                {:else if activeTab === "tab3"}
                                                    <p>
                                                        This is the settings tab
                                                        content.
                                                    </p>
                                                {/if}
                                            </Tabs>
                                        </div>
                                    {:else if component.name === "NavigationMenu"}
                                        <div class="space-y-6">
                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-headline mb-4"
                                                >
                                                    Data-Driven API
                                                </h4>
                                                <NavigationMenu
                                                    items={[
                                                        {
                                                            value: "home",
                                                            label: "Home",
                                                            content: [
                                                                {
                                                                    href: "/docs",
                                                                    label: "Introduction",
                                                                    description:
                                                                        "Re-usable components built using Svelte and Tailwind CSS.",
                                                                },
                                                                {
                                                                    href: "/docs/installation",
                                                                    label: "Installation",
                                                                    description:
                                                                        "How to install dependencies and structure your app.",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            value: "components",
                                                            label: "Components",
                                                            content: [
                                                                {
                                                                    href: "/components/button",
                                                                    label: "Button",
                                                                    description:
                                                                        "A clickable button component with multiple variants.",
                                                                },
                                                                {
                                                                    href: "/components/input",
                                                                    label: "Input",
                                                                    description:
                                                                        "A form input component with validation support.",
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            value: "docs",
                                                            label: "Docs",
                                                            href: "/docs",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-headline mb-4"
                                                >
                                                    Compound Component API
                                                </h4>
                                                <NavigationMenu>
                                                    <NavigationMenuList>
                                                        <NavigationMenuItem
                                                            value="home"
                                                        >
                                                            <NavigationMenuTrigger
                                                                value="home"
                                                                >Home</NavigationMenuTrigger
                                                            >
                                                            <NavigationMenuContent
                                                                value="home"
                                                            >
                                                                <ul
                                                                    class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                                                                >
                                                                    <li
                                                                        class="row-span-3"
                                                                    >
                                                                        <NavigationMenuLink
                                                                            asChild
                                                                        >
                                                                            <a
                                                                                class="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md md:p-6"
                                                                                href="/"
                                                                            >
                                                                                <div
                                                                                    class="mb-2 text-lg font-medium"
                                                                                >
                                                                                    zabi-components
                                                                                </div>
                                                                                <p
                                                                                    class="text-sm leading-tight text-description"
                                                                                >
                                                                                    Beautifully
                                                                                    designed
                                                                                    components
                                                                                    built
                                                                                    with
                                                                                    Tailwind
                                                                                    CSS.
                                                                                </p>
                                                                            </a>
                                                                        </NavigationMenuLink>
                                                                    </li>
                                                                    <NavigationMenuLink
                                                                        href="/docs"
                                                                    >
                                                                        <div
                                                                            class="text-sm font-medium leading-none"
                                                                        >
                                                                            Introduction
                                                                        </div>
                                                                        <p
                                                                            class="line-clamp-2 text-sm leading-snug text-description"
                                                                        >
                                                                            Re-usable
                                                                            components
                                                                            built
                                                                            using
                                                                            Svelte
                                                                            and
                                                                            Tailwind
                                                                            CSS.
                                                                        </p>
                                                                    </NavigationMenuLink>
                                                                    <NavigationMenuLink
                                                                        href="/docs/installation"
                                                                    >
                                                                        <div
                                                                            class="text-sm font-medium leading-none"
                                                                        >
                                                                            Installation
                                                                        </div>
                                                                        <p
                                                                            class="line-clamp-2 text-sm leading-snug text-description"
                                                                        >
                                                                            How
                                                                            to
                                                                            install
                                                                            dependencies
                                                                            and
                                                                            structure
                                                                            your
                                                                            app.
                                                                        </p>
                                                                    </NavigationMenuLink>
                                                                    <NavigationMenuLink
                                                                        href="/docs/primitives/typography"
                                                                    >
                                                                        <div
                                                                            class="text-sm font-medium leading-none"
                                                                        >
                                                                            Typography
                                                                        </div>
                                                                        <p
                                                                            class="line-clamp-2 text-sm leading-snug text-description"
                                                                        >
                                                                            Styles
                                                                            for
                                                                            headings,
                                                                            paragraphs,
                                                                            lists...etc
                                                                        </p>
                                                                    </NavigationMenuLink>
                                                                </ul>
                                                            </NavigationMenuContent>
                                                        </NavigationMenuItem>
                                                        <NavigationMenuItem
                                                            value="components"
                                                        >
                                                            <NavigationMenuTrigger
                                                                value="components"
                                                                >Components</NavigationMenuTrigger
                                                            >
                                                            <NavigationMenuContent
                                                                value="components"
                                                            >
                                                                <ul
                                                                    class="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                                                                >
                                                                    <NavigationMenuLink
                                                                        href="/components/button"
                                                                    >
                                                                        <div
                                                                            class="text-sm font-medium leading-none"
                                                                        >
                                                                            Button
                                                                        </div>
                                                                        <p
                                                                            class="line-clamp-2 text-sm leading-snug text-description"
                                                                        >
                                                                            A
                                                                            clickable
                                                                            button
                                                                            component
                                                                            with
                                                                            multiple
                                                                            variants.
                                                                        </p>
                                                                    </NavigationMenuLink>
                                                                    <NavigationMenuLink
                                                                        href="/components/input"
                                                                    >
                                                                        <div
                                                                            class="text-sm font-medium leading-none"
                                                                        >
                                                                            Input
                                                                        </div>
                                                                        <p
                                                                            class="line-clamp-2 text-sm leading-snug text-description"
                                                                        >
                                                                            A
                                                                            form
                                                                            input
                                                                            component
                                                                            with
                                                                            validation
                                                                            support.
                                                                        </p>
                                                                    </NavigationMenuLink>
                                                                    <NavigationMenuLink
                                                                        href="/components/card"
                                                                    >
                                                                        <div
                                                                            class="text-sm font-medium leading-none"
                                                                        >
                                                                            Card
                                                                        </div>
                                                                        <p
                                                                            class="line-clamp-2 text-sm leading-snug text-description"
                                                                        >
                                                                            A
                                                                            flexible
                                                                            card
                                                                            container
                                                                            with
                                                                            semantic
                                                                            variants.
                                                                        </p>
                                                                    </NavigationMenuLink>
                                                                    <NavigationMenuLink
                                                                        href="/components/modal"
                                                                    >
                                                                        <div
                                                                            class="text-sm font-medium leading-none"
                                                                        >
                                                                            Modal
                                                                        </div>
                                                                        <p
                                                                            class="line-clamp-2 text-sm leading-snug text-description"
                                                                        >
                                                                            A
                                                                            modal
                                                                            dialog
                                                                            with
                                                                            backdrop
                                                                            and
                                                                            customizable
                                                                            content.
                                                                        </p>
                                                                    </NavigationMenuLink>
                                                                </ul>
                                                            </NavigationMenuContent>
                                                        </NavigationMenuItem>
                                                        <NavigationMenuItem
                                                            value="docs"
                                                        >
                                                            <NavigationMenuLink
                                                                href="/docs"
                                                                >Docs</NavigationMenuLink
                                                            >
                                                        </NavigationMenuItem>
                                                    </NavigationMenuList>
                                                </NavigationMenu>
                                            </div>
                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-headline mb-4"
                                                >
                                                    With Icons
                                                </h4>
                                                <NavigationMenu>
                                                    <NavigationMenuList>
                                                        <NavigationMenuItem
                                                            value="status"
                                                        >
                                                            <NavigationMenuTrigger
                                                                value="status"
                                                                >Status</NavigationMenuTrigger
                                                            >
                                                            <NavigationMenuContent
                                                                value="status"
                                                            >
                                                                <ul
                                                                    class="grid w-[200px] gap-4"
                                                                >
                                                                    <li>
                                                                        <NavigationMenuLink
                                                                            href="#"
                                                                            className="flex flex-row items-center gap-2"
                                                                        >
                                                                            <CircleHelp
                                                                                class="h-4 w-4"
                                                                            />
                                                                            Backlog
                                                                        </NavigationMenuLink>
                                                                        <NavigationMenuLink
                                                                            href="#"
                                                                            className="flex flex-row items-center gap-2"
                                                                        >
                                                                            <Circle
                                                                                class="h-4 w-4"
                                                                            />
                                                                            To Do
                                                                        </NavigationMenuLink>
                                                                        <NavigationMenuLink
                                                                            href="#"
                                                                            className="flex flex-row items-center gap-2"
                                                                        >
                                                                            <CircleCheck
                                                                                class="h-4 w-4"
                                                                            />
                                                                            Done
                                                                        </NavigationMenuLink>
                                                                    </li>
                                                                </ul>
                                                            </NavigationMenuContent>
                                                        </NavigationMenuItem>
                                                    </NavigationMenuList>
                                                </NavigationMenu>
                                            </div>
                                        </div>
                                    {:else if component.name === "TopNavbar"}
                                        <div class="space-y-6">
                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-headline mb-2"
                                                >
                                                    Full bar with inline links
                                                </h4>
                                                <TopNavbar
                                                    brand="Zabi Components"
                                                    brandHref="/"
                                                    showThemeToggle={false}
                                                    items={[
                                                        {
                                                            label: "Home",
                                                            href: "/",
                                                        },
                                                        {
                                                            label: "Components",
                                                            href: "/components",
                                                        },
                                                        {
                                                            label: "Docs",
                                                            href: "/docs",
                                                        },
                                                    ]}
                                                    navVariant="header"
                                                    currentPath="/components"
                                                />
                                            </div>
                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-headline mb-2"
                                                >
                                                    Embedded link list
                                                </h4>
                                                <div
                                                    class="rounded-lg border border-border bg-base-50 p-4"
                                                >
                                                    <TopNavbar
                                                        embedded
                                                        ariaLabel="Demo navigation"
                                                        navVariant="header"
                                                        items={[
                                                            {
                                                                label: "Home",
                                                                href: "/",
                                                            },
                                                            {
                                                                label: "About",
                                                                href: "/about",
                                                            },
                                                            {
                                                                label: "Contact",
                                                                href: "/contact",
                                                            },
                                                        ]}
                                                        currentPath="/about"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    {:else if component.name === "SidebarNavigation"}
                                        <div class="space-y-10">
                                            <section
                                                class="rounded-xl border border-border bg-base-50/70 p-5 ring-1 ring-border/40"
                                                aria-labelledby="sn-built-from"
                                            >
                                                <h4
                                                    id="sn-built-from"
                                                    class="mb-2 text-sm font-semibold text-headline"
                                                >
                                                    What
                                                    <code class="rounded bg-base-100 px-1 font-mono text-xs"
                                                        >SidebarNavigation</code
                                                    >
                                                    is built from
                                                </h4>
                                                <p class="mb-3 text-sm leading-relaxed text-description">
                                                    The organism composes smaller pieces from this library
                                                    plus icons. Section headings and grouped lists come from
                                                    <strong class="text-headline">SidebarNavSection</strong>;
                                                    optional logo + wordmark from
                                                    <strong class="text-headline">SidebarBrandHeader</strong>.
                                                    Row badges use
                                                    <a
                                                        href="/components/Badge"
                                                        class="text-link font-medium underline-offset-2 hover:underline"
                                                        >Badge</a
                                                    >, search uses
                                                    <a
                                                        href="/components/Input"
                                                        class="text-link font-medium underline-offset-2 hover:underline"
                                                        >Input</a
                                                    >
                                                    (or a search trigger button). For “pick a workspace” flows,
                                                    pair the rail with
                                                    <a
                                                        href="/components/SidebarPanel"
                                                        class="text-link font-medium underline-offset-2 hover:underline"
                                                        >SidebarPanel</a
                                                    >
                                                    (see the second example below).
                                                </p>
                                                <ul
                                                    class="list-disc space-y-1.5 pl-5 text-sm text-description"
                                                >
                                                    <li>
                                                        <span class="font-medium text-headline">Molecules</span>
                                                        — <code class="text-xs font-mono">SidebarBrandHeader</code>,
                                                        <code class="text-xs font-mono">SidebarNavSection</code>
                                                    </li>
                                                    <li>
                                                        <span class="font-medium text-headline">Atoms</span> —
                                                        <code class="text-xs font-mono">Badge</code>,
                                                        <code class="text-xs font-mono">Input</code>
                                                    </li>
                                                    <li>
                                                        <span class="font-medium text-headline">Icons</span> —
                                                        <code class="text-xs font-mono">@lucide/svelte</code> (e.g.
                                                        Search, LogOut, Sun, Moon)
                                                    </li>
                                                </ul>
                                            </section>

                                            <div>
                                                <h4
                                                    class="mb-1 text-sm font-medium text-headline"
                                                >
                                                    Realistic app shell
                                                </h4>
                                                <p
                                                    class="mb-4 max-w-3xl text-sm leading-relaxed text-description"
                                                >
                                                    A compact product layout: floating sidebar rail
                                                    (<code class="font-mono text-xs">layout="card"</code>),
                                                    brand row, grouped primary nav, footer profile + logout +
                                                    theme, and a main column where your routed page content
                                                    would render.
                                                </p>
                                                <div
                                                    class="flex max-w-5xl flex-col overflow-visible rounded-2xl border border-border bg-base-100 shadow-sm md:min-h-[min(520px,65vh)] md:flex-row"
                                                >
                                                    {#snippet appShellProfilePanel()}
                                                        <SidebarAccountPanel
                                                            panelId={appShellAccountPanelId}
                                                            profileName="Alex Rivera"
                                                            profileEmail="alex@northwind.app"
                                                            bind:isLightMode={appShellAccountLightMode}
                                                            onThemeToggle={(next) =>
                                                                (appShellAccountLightMode = next)}
                                                            onLogout={() => (appShellAccountPanelOpen = false)}
                                                            onAccount={() => (appShellAccountPanelOpen = false)}
                                                            onClose={() => (appShellAccountPanelOpen = false)}
                                                            variant="elevated"
                                                        />
                                                    {/snippet}
                                                    <SidebarNavigation
                                                        layout="card"
                                                        className="min-h-[min(480px,60vh)] shrink-0 md:min-h-0 md:max-w-[280px]"
                                                        brandName="Northwind"
                                                        logoSrc="/favicon.png"
                                                        logoAlt="Northwind"
                                                        items={sidebarAppShellDemoItems}
                                                        currentPath={appShellPath}
                                                        bind:searchValue={appShellSearchValue}
                                                        searchMode="input"
                                                        searchPlaceholder="Search workspace…"
                                                        profileName="Alex Rivera"
                                                        profileEmail="alex@northwind.app"
                                                        profileInitials="AR"
                                                        bind:isLightMode={appShellLightMode}
                                                        onProfileClick={toggleAppShellAccountPanel}
                                                        profilePanelOpen={appShellAccountPanelOpen}
                                                        profilePanelControlsId={appShellAccountPanelId}
                                                        profilePanel={appShellProfilePanel}
                                                        onNavigate={(item, event) => {
                                                            event.preventDefault();
                                                            appShellPath = item.href;
                                                        }}
                                                    />
                                                    <div
                                                        class="flex min-h-0 min-w-0 flex-1 flex-col gap-4 border-t border-border p-5 md:border-l md:border-t-0"
                                                    >
                                                        <header
                                                            class="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-3"
                                                        >
                                                            <div>
                                                                <p
                                                                    class="text-xs font-medium uppercase tracking-wide text-description"
                                                                >
                                                                    Main content (your app route)
                                                                </p>
                                                                <h3
                                                                    class="text-xl font-semibold text-headline"
                                                                >
                                                                    {appShellMainTitle}
                                                                </h3>
                                                            </div>
                                                            <Badge
                                                                variant="info"
                                                                text="Demo preview"
                                                            />
                                                        </header>
                                                        <div
                                                            class="grid flex-1 gap-3 sm:grid-cols-2"
                                                        >
                                                            <Card>
                                                                <CardHeader title="Pipeline" />
                                                                <CardContent>
                                                                    <p class="text-sm text-description">
                                                                        Cards, tables, or charts would live
                                                                        here—whatever the selected nav item
                                                                        loads in a real SvelteKit
                                                                        <code class="font-mono text-xs"
                                                                            >+page.svelte</code
                                                                        >.
                                                                    </p>
                                                                </CardContent>
                                                            </Card>
                                                            <Card>
                                                                <CardHeader title="Activity" />
                                                                <CardContent>
                                                                    <ul
                                                                        class="space-y-2 text-sm text-description"
                                                                    >
                                                                        <li>Design review · 2:00 PM</li>
                                                                        <li>Deploy preview #412 · passed</li>
                                                                        <li>New comment on PR #88</li>
                                                                    </ul>
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-headline mb-2"
                                                >
                                                    Searchable Input Mode
                                                </h4>
                                                <div
                                                    class="inline-block overflow-visible rounded-2xl border border-border"
                                                >
                                                    <SidebarNavigation
                                                        mode="expanded"
                                                        searchMode="input"
                                                        items={sidebarNavItems}
                                                        currentPath={sidebarPath}
                                                        bind:searchValue={sidebarSearchValue}
                                                        onNavigate={(item, event) => {
                                                            event.preventDefault();
                                                            sidebarPath = item.href;
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-headline mb-2"
                                                >
                                                    Trigger Button + sidebar panel
                                                </h4>
                                                <div
                                                    class="flex flex-wrap items-start gap-4"
                                                >
                                                    {#snippet sidebarProfilePanel()}
                                                        <SidebarAccountPanel
                                                            panelId={sidebarAccountPanelId}
                                                            profileName="Jane Doe"
                                                            profileEmail="jane@example.com"
                                                            bind:isLightMode={sidebarAccountLightMode}
                                                            onThemeToggle={(next) =>
                                                                (sidebarAccountLightMode = next)}
                                                            onLogout={() => (sidebarAccountPanelOpen = false)}
                                                            onAccount={() => (sidebarAccountPanelOpen = false)}
                                                            onClose={() => (sidebarAccountPanelOpen = false)}
                                                            variant="plain"
                                                        />
                                                    {/snippet}
                                                    <SidebarNavigation
                                                        mode="expanded"
                                                        searchMode="button"
                                                        items={sidebarNavItems}
                                                        currentPath={sidebarPath}
                                                        searchValue={selectedProjectId
                                                            ? sidebarProjectItems.find((item) => item.id === selectedProjectId)?.label || "Search projects"
                                                            : "Search projects"}
                                                        onSearchClick={() => {
                                                            sidebarSearchPanelOpen =
                                                                !sidebarSearchPanelOpen;
                                                        }}
                                                        onNavigate={(item, event) => {
                                                            event.preventDefault();
                                                            sidebarPath = item.href;
                                                        }}
                                                        onProfileClick={toggleSidebarAccountPanel}
                                                        profilePanelOpen={sidebarAccountPanelOpen}
                                                        profilePanelControlsId={sidebarAccountPanelId}
                                                        profilePanel={sidebarProfilePanel}
                                                    />
                                                    {#if sidebarSearchPanelOpen}
                                                        <SidebarPanel
                                                            title="Project picker"
                                                            subtitle="Search and switch projects"
                                                            searchPlaceholder="Search projects..."
                                                            ariaLabel="Project picker panel"
                                                            items={sidebarProjectItems}
                                                            bind:searchValue={sidebarProjectSearch}
                                                            bind:selectedItemId={selectedProjectId}
                                                            onClose={() => {
                                                                sidebarSearchPanelOpen = false;
                                                            }}
                                                        />
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    {:else if component.name === "SidebarPanel"}
                                        <div class="space-y-6">
                                            <SidebarPanel
                                                title="Project picker"
                                                subtitle="Search and switch projects"
                                                searchPlaceholder="Search projects..."
                                                ariaLabel="Project picker panel"
                                                items={sidebarProjectItems}
                                                bind:searchValue={sidebarProjectSearch}
                                                bind:selectedItemId={selectedProjectId}
                                            />
                                            <SidebarPanel
                                                title="Empty list"
                                                subtitle="First-time setup state"
                                                searchPlaceholder="Search..."
                                                ariaLabel="Empty panel example"
                                                items={[]}
                                                emptyStateTitle="No items yet"
                                                emptyStateDescription="Create your first item to get started."
                                            />
                                        </div>
                                    {:else if component.name === "ColorPicker"}
                                        <div class="w-full space-y-6">
                                            <ColorPicker
                                                label="Choose a color"
                                            />
                                            <ColorPicker
                                                value="#3b82f6"
                                                label="Background Color"
                                            />
                                            <ColorPicker
                                                disabled={true}
                                                label="Disabled Picker"
                                            />
                                        </div>
                                    {:else if component.name === "Badge"}
                                        <div
                                            class="flex flex-wrap gap-2 items-center"
                                        >
                                            <Badge text="Default" />
                                            <Badge
                                                variant="success"
                                                text="Success"
                                            />
                                            <Badge
                                                variant="warning"
                                                text="Warning"
                                            />
                                            <Badge
                                                variant="error"
                                                text="Error"
                                            />
                                            <Badge variant="info" text="Info" />
                                        </div>
                                    {:else if component.name === "Checkbox"}
                                        <div class="w-full space-y-4">
                                            <Checkbox
                                                label="Accept terms and conditions"
                                            />
                                            <Checkbox
                                                label="Email verified"
                                                checked={true}
                                            />
                                            <Checkbox label="Review required" />
                                            <Checkbox
                                                disabled={true}
                                                label="Disabled option"
                                            />
                                        </div>
                                    {:else if component.name === "Select"}
                                        <div class="w-full space-y-6">
                                            <Select
                                                label="Default (Searchable)"
                                                placeholder="Choose an option"
                                                searchable={true}
                                                searchPlaceholder="Search options"
                                                maxMenuHeight="50vh"
                                                menuWidth="100%"
                                                options={selectOptions}
                                                bind:value={selectValue}
                                            />
                                            <Select
                                                label="Default (No Search)"
                                                placeholder="Choose an option"
                                                searchable={false}
                                                maxMenuHeight="50vh"
                                                menuWidth="100%"
                                                options={selectOptions}
                                            />
                                            <Select
                                                label="Success"
                                                placeholder="Choose an option"
                                                variant="success"
                                                message="Selection looks good"
                                                searchable={true}
                                                searchPlaceholder="Search options"
                                                maxMenuHeight="50vh"
                                                menuWidth="100%"
                                                options={selectOptions}
                                            />
                                            <Select
                                                label="Warning"
                                                placeholder="Choose an option"
                                                variant="warning"
                                                message="Double-check your choice"
                                                searchable={true}
                                                searchPlaceholder="Search options"
                                                maxMenuHeight="50vh"
                                                menuWidth="100%"
                                                options={selectOptions}
                                            />
                                            <Select
                                                label="Error"
                                                placeholder="Choose an option"
                                                variant="error"
                                                message="Please select a valid option"
                                                searchable={true}
                                                searchPlaceholder="Search options"
                                                maxMenuHeight="50vh"
                                                menuWidth="100%"
                                                options={selectOptions}
                                            />
                                        </div>
                                    {:else if component.name === "CodeBlock"}
                                        <div class="w-full">
                                            <CodeBlock
                                                code={sampleCode}
                                                language="javascript"
                                                showLineNumbers={true}
                                            />
                                        </div>
                                    {:else if component.name === "FeatureCard"}
                                        <div
                                            class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
                                        >
                                            <FeatureCard
                                                title="Fast Performance"
                                                description="Lightning fast loading times with optimized code"
                                            />
                                            <FeatureCard
                                                title="Secure by Default"
                                                description="End-to-end encryption and security best practices"
                                                icon="shield"
                                            />
                                            <FeatureCard
                                                title="Easy to Use"
                                                description="Intuitive interface designed for productivity"
                                                icon="star"
                                            />
                                        </div>
                                    {:else if component.name === "Heading"}
                                        <div class="space-y-4">
                                            <Heading
                                                level={1}
                                                text="Display Heading"
                                            />
                                            <Heading
                                                level={2}
                                                text="Section Heading"
                                            />
                                            <Heading
                                                level={3}
                                                text="Subtitle Heading"
                                            />
                                            <Heading
                                                level={4}
                                                text="Subsection"
                                            />
                                        </div>
                                    {:else if component.name === "OptimizedImage"}
                                        <div class="w-full space-y-4">
                                            <OptimizedImage
                                                src="/vite.svg"
                                                alt="Vite Logo"
                                                width={200}
                                                height={200}
                                            />
                                            <OptimizedImage
                                                src="/svelte.svg"
                                                alt="Svelte Logo"
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                    {:else if component.name === "Skeleton"}
                                        <div class="w-full space-y-4">
                                            <Skeleton />
                                            <Skeleton
                                                width="200px"
                                                height="100px"
                                            />
                                            <Skeleton
                                                width="40px"
                                                height="40px"
                                            />
                                            <div class="flex space-x-2">
                                                <Skeleton
                                                    width="32px"
                                                    height="32px"
                                                />
                                                <div class="space-y-2 flex-1">
                                                    <Skeleton width="80%" />
                                                    <Skeleton width="60%" />
                                                </div>
                                            </div>
                                        </div>
                                    {:else if component.name === "Toast"}
                                        <div class="w-full space-y-4">
                                            <Toast
                                                message="This is an info toast"
                                            />
                                            <Toast
                                                message="Operation completed successfully!"
                                            />
                                            <Toast
                                                message="Please review your input"
                                            />
                                            <Toast
                                                message="An error occurred"
                                            />
                                        </div>
                                    {:else if component.name === "Tooltip"}
                                        <div class="flex gap-4 items-center">
                                            <Tooltip
                                                content="This is a tooltip"
                                            >
                                                <Button text="Hover me" />
                                            </Tooltip>
                                            <Tooltip
                                                content="Top tooltip"
                                                placement="top"
                                            >
                                                <Button
                                                    variant="secondary"
                                                    text="Top"
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                content="Bottom tooltip"
                                                placement="bottom"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    text="Bottom"
                                                />
                                            </Tooltip>
                                        </div>
                                    {/if}
                                </ComponentDemo>
                            {/each}
</div>
