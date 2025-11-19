<script lang="ts">
    import { goto } from "$app/navigation";
    import Navigation from "../components/organisms/Navigation.svelte";
    import ThemeToggle from "../components/atoms/ThemeToggle.svelte";
    import ContactForm from "../components/molecules/ContactForm.svelte";
    import ComponentDemo from "../components/molecules/ComponentDemo.svelte";
    import Button from "../components/atoms/Button.svelte";
    import Card from "../components/atoms/Card.svelte";
    import Input from "../components/atoms/Input.svelte";
    import Alert from "../components/molecules/Alert.svelte";
    import Badge from "../components/atoms/Badge.svelte";
    import Checkbox from "../components/atoms/Checkbox.svelte";
    import Select from "../components/atoms/Select.svelte";
    import Textarea from "../components/atoms/Textarea.svelte";
    import Progress from "../components/atoms/Progress.svelte";
    import Toggle from "../components/atoms/Toggle.svelte";
    import Tabs from "../components/molecules/Tabs.svelte";
    import Modal from "../components/molecules/Modal.svelte";
    import Dropdown from "../components/molecules/Dropdown.svelte";
    import Tooltip from "../components/atoms/Tooltip.svelte";
    import Skeleton from "../components/atoms/Skeleton.svelte";

    // Define types inline to avoid module resolution issues
    interface NavItem {
        label: string;
        href: string;
    }

    interface ContactFormData {
        name: string;
        email: string;
        message?: string;
        subscribe?: boolean;
    }

    // Navigation data
    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com" },
    ];

    // Features data
    const features = [
        {
            icon: "🎯",
            title: "TypeScript First",
            description:
                "Full TypeScript support with comprehensive type definitions and excellent IDE experience.",
        },
        {
            icon: "🎨",
            title: "Semantic Colors",
            description:
                "Built-in semantic color system with automatic dark mode support and consistent theming.",
        },
        {
            icon: "🌙",
            title: "Dark Mode Ready",
            description:
                "Automatic dark mode switching with CSS custom properties and seamless theme transitions.",
        },
        {
            icon: "♿",
            title: "Accessibility First",
            description:
                "ARIA compliant components with keyboard navigation support and screen reader compatibility.",
        },
        {
            icon: "📱",
            title: "Responsive Design",
            description:
                "Mobile-first approach with responsive utilities and adaptive layouts for all screen sizes.",
        },
        {
            icon: "🧩",
            title: "Clean API",
            description:
                "Simple, intuitive component APIs with minimal props and maximum flexibility.",
        },
    ];

    // State for interactive components
    let checkboxChecked = $state(false);
    let selectValue = $state<string | number | undefined>(undefined);
    let textareaValue = $state("");
    let progressValue = $state(45);
    let toggleChecked = $state(false);
    let modalOpen = $state(false);
    let dropdownOpen = $state(false);
    let activeTab = $state("tab1");

    // Select options
    const selectOptions = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    // Tabs data
    const tabsData = [
        { id: "tab1", label: "Overview" },
        { id: "tab2", label: "Features" },
        { id: "tab3", label: "Documentation" },
    ];

    // Event handlers
    function handleFormSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log("Form submitted:", data);
        // Handle form submission
    }

    function openModal() {
        modalOpen = true;
    }

    function closeModal() {
        modalOpen = false;
    }
</script>

<svelte:head>
    <title>Zabi Components - Clean & Simple</title>
    <meta
        name="description"
        content="Clean, minimal Svelte 5 components that just work"
    />
</svelte:head>

<div class="min-h-screen bg-background">
    <header
        class="flex items-center justify-between p-4 bg-base-50 border-b border-border"
    >
        <h1 class="text-xl font-bold text-headline">Zabi Components</h1>
        <div class="flex items-center gap-4">
            <Navigation variant="header" items={navItems} />
            <ThemeToggle />
        </div>
    </header>

    <main class="container mx-auto p-6 space-y-16">
        <!-- Hero Section -->
        <section class="py-20 px-4">
            <div class="max-w-4xl mx-auto">
                <Card size="lg" fullWidth={false}>
                    <div class="text-center">
                        <h1
                            class="text-5xl md:text-6xl font-bold text-headline mb-6"
                        >
                            Zabi Components
                        </h1>
                        <p class="text-xl md:text-2xl text-description mb-8">
                            Clean, minimal Svelte 5 components that just work
                        </p>
                        <p
                            class="text-lg text-description/80 max-w-2xl mx-auto mb-12"
                        >
                            Build beautiful, accessible user interfaces with our
                            carefully crafted component library. Less is more.
                        </p>

                        <!-- CTA Buttons -->
                        <div
                            class="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onclick={() => goto("/docs")}
                                text="Get Started"
                            />
                            <Button
                                variant="secondary"
                                size="lg"
                                onclick={() => goto("/components")}
                                text="View Components"
                            />
                        </div>

                        <!-- Version Badge -->
                        <div class="mt-8 flex justify-center">
                            <Badge
                                variant="info"
                                text="v4.0.0 - Svelte 5 Ready"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-headline mb-4">
                        Why Choose Zabi Components?
                    </h2>
                    <p class="text-lg text-description max-w-2xl mx-auto">
                        Built with modern web standards and developer experience
                        in mind
                    </p>
                </div>

                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {#each features as feature}
                        <div class="relative pl-14">
                            <Card
                                size="md"
                                fullWidth={true}
                                title={feature.title}
                                description={feature.description}
                            />
                            <div
                                class="absolute top-6 left-6 text-2xl pointer-events-none"
                                aria-hidden="true"
                            >
                                {feature.icon}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </section>

        <!-- Component Showcase Section -->
        <section class="py-16">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-headline mb-4">
                        See It In Action
                    </h2>
                    <p class="text-lg text-description max-w-2xl mx-auto">
                        Interactive examples of our most popular components
                    </p>
                </div>

                <div class="space-y-8">
                    <!-- Button Examples -->
                    <ComponentDemo
                        title="Button Component"
                        description="Clean, accessible buttons with multiple variants and sizes"
                        code={`<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary" size="md">Secondary Button</Button>
<Button variant="danger" size="sm">Danger Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="brand">Brand Button</Button>`}
                    >
                        <div
                            class="w-full flex flex-wrap gap-4 items-center justify-center"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                text="Primary"
                            />
                            <Button
                                variant="secondary"
                                size="md"
                                text="Secondary"
                            />
                            <Button variant="danger" size="sm" text="Danger" />
                            <Button variant="ghost" text="Ghost" />
                            <Button variant="primary" text="Primary" />
                        </div>
                    </ComponentDemo>

                    <!-- Card Examples -->
                    <ComponentDemo
                        title="Card Component"
                        description="Flexible card containers with semantic color variants"
                        code={`<Card title="Default Card" variant="default">
  This is a default card with clean styling.
</Card>

<Card title="Success Card" variant="success">
  This card indicates a successful action.
</Card>

<Card title="Warning Card" variant="warning">
  This card shows a warning state.
</Card>

<Card title="Error Card" variant="error">
  This card indicates an error state.
</Card>`}
                    >
                        <div
                            class="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <Card title="Default Card" fullWidth={true}>
                                <p class="text-description">
                                    This is a default card with clean styling.
                                </p>
                            </Card>
                            <Card title="Success Card" fullWidth={true}>
                                <p class="text-description">
                                    This card indicates a successful action.
                                </p>
                            </Card>
                            <Card title="Warning Card" fullWidth={true}>
                                <p class="text-description">
                                    This card shows a warning state.
                                </p>
                            </Card>
                            <Card title="Error Card" fullWidth={true}>
                                <p class="text-description">
                                    This card indicates an error state.
                                </p>
                            </Card>
                        </div>
                    </ComponentDemo>

                    <!-- Input Examples -->
                    <ComponentDemo
                        title="Input Component"
                        description="Form inputs with labels, variants, and accessibility features"
                        code={`<Input 
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
/>`}
                    >
                        <div class="space-y-4 max-w-md min-w-[250px]">
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
                        </div>
                    </ComponentDemo>

                    <!-- Alert Examples -->
                    <ComponentDemo
                        title="Alert Component"
                        description="Contextual alerts with different variants and optional close functionality"
                        code={`<Alert variant="info" title="Info Alert" message="This is an informational message." />

<Alert variant="success" title="Success!" message="Your action was completed successfully." />

<Alert variant="warning" title="Warning" message="Please review your input before proceeding." />

<Alert variant="error" title="Error" message="Something went wrong. Please try again." />`}
                    >
                        <div class="w-full space-y-4">
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
                    </ComponentDemo>

                    <!-- Badge Examples -->
                    <ComponentDemo
                        title="Badge Component"
                        description="Status badges with multiple variants and sizes"
                        code={`<Badge variant="default" text="Default" />
<Badge variant="success" text="Success" />
<Badge variant="warning" text="Warning" />
<Badge variant="error" text="Error" />
<Badge variant="info" text="Info" />
<Badge variant="neutral" text="Neutral" />
<Badge variant="energetic" text="Energetic" />

<!-- Sizes -->
<Badge variant="success" size="sm" text="Small" />
<Badge variant="success" size="md" text="Medium" />
<Badge variant="success" size="lg" text="Large" />`}
                    >
                        <div class="w-full space-y-4">
                            <div class="flex flex-wrap gap-3 items-center">
                                <Badge variant="default" text="Default" />
                                <Badge variant="success" text="Success" />
                                <Badge variant="warning" text="Warning" />
                                <Badge variant="error" text="Error" />
                                <Badge variant="info" text="Info" />
                                <Badge variant="neutral" text="Neutral" />
                                <Badge variant="energetic" text="Energetic" />
                            </div>
                            <div class="flex flex-wrap gap-3 items-center">
                                <Badge
                                    variant="success"
                                    size="sm"
                                    text="Small"
                                />
                                <Badge
                                    variant="success"
                                    size="md"
                                    text="Medium"
                                />
                                <Badge
                                    variant="success"
                                    size="lg"
                                    text="Large"
                                />
                            </div>
                        </div>
                    </ComponentDemo>

                    <!-- Checkbox Examples -->
                    <ComponentDemo
                        title="Checkbox Component"
                        description="Accessible checkboxes with labels and disabled states"
                        code={`<Checkbox label="Accept terms and conditions" checked={checked} />

<Checkbox label="Subscribe to newsletter" checked={false} />

<Checkbox label="Disabled checkbox" checked={true} disabled={true} />`}
                    >
                        <div class="w-full space-y-4">
                            <Checkbox
                                label="Accept terms and conditions"
                                checked={checkboxChecked}
                                onchange={(e) => {
                                    checkboxChecked = (
                                        e.target as HTMLInputElement
                                    ).checked;
                                }}
                            />
                            <Checkbox label="Subscribe to newsletter" />
                            <Checkbox
                                label="Disabled checkbox"
                                checked={true}
                                disabled={true}
                            />
                        </div>
                    </ComponentDemo>

                    <!-- Select Examples -->
                    <ComponentDemo
                        title="Select Component"
                        description="Dropdown selects with variants and validation states"
                        code={`<Select 
  label="Choose an option" 
  options={options} 
  value={value}
  placeholder="Select..."
/>

<Select 
  label="Success state" 
  options={options} 
  variant="success"
  message="Selection is valid"
/>

<Select 
  label="Error state" 
  options={options} 
  variant="error"
  message="Please select an option"
/>`}
                    >
                        <div class="space-y-4 max-w-md min-w-[250px]">
                            <Select
                                label="Choose an option"
                                options={selectOptions}
                                value={selectValue}
                                placeholder="Select an option..."
                                onchange={(e) => {
                                    selectValue = (e.target as any).value;
                                }}
                            />
                            <Select
                                label="Success state"
                                options={selectOptions}
                                variant="success"
                                message="Selection is valid"
                                value="option1"
                            />
                            <Select
                                label="Error state"
                                options={selectOptions}
                                variant="error"
                                message="Please select an option"
                            />
                        </div>
                    </ComponentDemo>

                    <!-- Textarea Examples -->
                    <ComponentDemo
                        title="Textarea Component"
                        description="Multi-line text inputs with variants and validation"
                        code={`<Textarea 
  label="Message" 
  placeholder="Enter your message..."
  rows={4}
/>

<Textarea 
  label="Success state" 
  variant="success"
  message="Message is valid"
  rows={4}
/>

<Textarea 
  label="Error state" 
  variant="error"
  message="Please enter a message"
  rows={4}
/>`}
                    >
                        <div class="space-y-4 max-w-md min-w-[250px]">
                            <Textarea
                                label="Message"
                                placeholder="Enter your message..."
                                rows={4}
                                value={textareaValue}
                                oninput={(e) => {
                                    textareaValue = (
                                        e.target as HTMLTextAreaElement
                                    ).value;
                                }}
                            />
                            <Textarea
                                label="Success state"
                                variant="success"
                                message="Message is valid"
                                rows={4}
                                value="This is a valid message"
                            />
                            <Textarea
                                label="Error state"
                                variant="error"
                                message="Please enter a message"
                                rows={4}
                            />
                        </div>
                    </ComponentDemo>

                    <!-- Progress Examples -->
                    <ComponentDemo
                        title="Progress Component"
                        description="Progress bars with different sizes and labels"
                        code={`<Progress value={45} max={100} label="Loading" />

<Progress value={75} max={100} size="sm" />

<Progress value={90} max={100} size="lg" label="Upload Progress" />`}
                    >
                        <div class="w-full space-y-6 max-w-md min-w-[250px]">
                            <Progress
                                value={progressValue}
                                max={100}
                                label="Loading"
                            />
                            <Progress value={75} max={100} size="sm" />
                            <Progress
                                value={90}
                                max={100}
                                size="lg"
                                label="Upload Progress"
                            />
                        </div>
                    </ComponentDemo>

                    <!-- Toggle Examples -->
                    <ComponentDemo
                        title="Toggle Component"
                        description="Switch toggles for boolean settings"
                        code={`<Toggle label="Enable notifications" checked={checked} />

<Toggle label="Dark mode" checked={true} />

<Toggle label="Disabled toggle" checked={false} disabled={true} />`}
                    >
                        <div class="w-full space-y-4">
                            <Toggle
                                label="Enable notifications"
                                checked={toggleChecked}
                                onchange={(e) => {
                                    toggleChecked = e.checked;
                                }}
                            />
                            <Toggle label="Dark mode" checked={true} />
                            <Toggle
                                label="Disabled toggle"
                                checked={false}
                                disabled={true}
                            />
                        </div>
                    </ComponentDemo>

                    <!-- Tabs Examples -->
                    <ComponentDemo
                        title="Tabs Component"
                        description="Tabbed interfaces with keyboard navigation"
                        code={`<Tabs tabs={tabs} activeTab={activeTab}>
  {#snippet children({ activeTab })}
    {#if activeTab === 'tab1'}
      <p>Tab 1 content</p>
    {:else if activeTab === 'tab2'}
      <p>Tab 2 content</p>
    {:else if activeTab === 'tab3'}
      <p>Tab 3 content</p>
    {/if}
  {/snippet}
</Tabs>`}
                    >
                        <div class="w-full">
                            <Tabs tabs={tabsData} {activeTab}>
                                {#snippet children({
                                    activeTab,
                                }: {
                                    activeTab: string;
                                })}
                                    {#if activeTab === "tab1"}
                                        <Card size="sm" fullWidth={true}>
                                            <p class="text-body">
                                                This is the overview tab
                                                content. Tabs provide a clean
                                                way to organize content.
                                            </p>
                                        </Card>
                                    {:else if activeTab === "tab2"}
                                        <Card size="sm" fullWidth={true}>
                                            <p class="text-body">
                                                Features tab content. Navigate
                                                between tabs using arrow keys
                                                for accessibility.
                                            </p>
                                        </Card>
                                    {:else if activeTab === "tab3"}
                                        <Card size="sm" fullWidth={true}>
                                            <p class="text-body">
                                                Documentation tab content. All
                                                tabs support keyboard
                                                navigation.
                                            </p>
                                        </Card>
                                    {/if}
                                {/snippet}
                            </Tabs>
                        </div>
                    </ComponentDemo>

                    <!-- Modal Examples -->
                    <ComponentDemo
                        title="Modal Component"
                        description="Modal dialogs with different sizes and footer support"
                        code={`<Button onclick={() => modalOpen = true} text="Open Modal" />

<Modal isOpen={modalOpen} title="Example Modal" size="md">
  <p>Modal content goes here</p>
  
  {#snippet footer()}
    <Button variant="secondary" onclick={() => modalOpen = false} text="Cancel" />
    <Button variant="primary" onclick={() => modalOpen = false} text="Confirm" />
  {/snippet}
</Modal>`}
                    >
                        <div class="w-full flex justify-center">
                            <Button
                                variant="primary"
                                onclick={openModal}
                                text="Open Modal"
                            />
                            <Modal
                                isOpen={modalOpen}
                                title="Example Modal"
                                size="md"
                                onclick={closeModal}
                            >
                                <p class="text-body mb-4">
                                    This is a modal dialog. Click outside or
                                    press Escape to close it. Modals are great
                                    for confirmations, forms, or additional
                                    content.
                                </p>
                                {#snippet footer()}
                                    <Button
                                        variant="secondary"
                                        onclick={closeModal}
                                        text="Cancel"
                                    />
                                    <Button
                                        variant="primary"
                                        onclick={closeModal}
                                        text="Confirm"
                                    />
                                {/snippet}
                            </Modal>
                        </div>
                    </ComponentDemo>

                    <!-- Dropdown Examples -->
                    <ComponentDemo
                        title="Dropdown Component"
                        description="Dropdown menus with flexible positioning"
                        code={`<Dropdown isOpen={isOpen} placement="bottom-start">
  {#snippet trigger()}
    <Button onclick={() => isOpen = !isOpen} text="Open Dropdown" />
  {/snippet}
  
  {#snippet children()}
    <div class="px-2 py-2">
      <button class="w-full text-left px-4 py-2 hover:bg-base-100 rounded-md">Option 1</button>
      <button class="w-full text-left px-4 py-2 hover:bg-base-100 rounded-md">Option 2</button>
      <button class="w-full text-left px-4 py-2 hover:bg-base-100 rounded-md">Option 3</button>
    </div>
  {/snippet}
</Dropdown>`}
                    >
                        <div class="w-full">
                            <Dropdown
                                isOpen={dropdownOpen}
                                placement="bottom-start"
                            >
                                {#snippet trigger()}
                                    <Button
                                        onclick={() =>
                                            (dropdownOpen = !dropdownOpen)}
                                        text="Open Dropdown"
                                    />
                                {/snippet}
                                {#snippet children()}
                                    <div class="px-2 py-2">
                                        <button
                                            class="w-full text-left px-4 py-2 text-body hover:bg-base-100 rounded-md transition-colors"
                                            onclick={() =>
                                                (dropdownOpen = false)}
                                        >
                                            Option 1
                                        </button>
                                        <button
                                            class="w-full text-left px-4 py-2 text-body hover:bg-base-100 rounded-md transition-colors"
                                            onclick={() =>
                                                (dropdownOpen = false)}
                                        >
                                            Option 2
                                        </button>
                                        <button
                                            class="w-full text-left px-4 py-2 text-body hover:bg-base-100 rounded-md transition-colors"
                                            onclick={() =>
                                                (dropdownOpen = false)}
                                        >
                                            Option 3
                                        </button>
                                    </div>
                                {/snippet}
                            </Dropdown>
                        </div>
                    </ComponentDemo>

                    <!-- Tooltip Examples -->
                    <ComponentDemo
                        title="Tooltip Component"
                        description="Tooltips with multiple placement options"
                        code={`<Tooltip content="This is a tooltip" placement="top">
  <Button text="Hover me" />
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <Button variant="secondary" text="Hover me" />
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <Button variant="ghost" text="Hover me" />
</Tooltip>`}
                    >
                        <div
                            class="w-full flex flex-wrap gap-4 items-center justify-center"
                        >
                            <Tooltip
                                content="This is a tooltip"
                                placement="top"
                            >
                                <Button text="Hover me" />
                            </Tooltip>
                            <Tooltip content="Right tooltip" placement="right">
                                <Button variant="secondary" text="Hover me" />
                            </Tooltip>
                            <Tooltip
                                content="Bottom tooltip"
                                placement="bottom"
                            >
                                <Button variant="ghost" text="Hover me" />
                            </Tooltip>
                            <Tooltip content="Left tooltip" placement="left">
                                <Button variant="primary" text="Hover me" />
                            </Tooltip>
                        </div>
                    </ComponentDemo>

                    <!-- Skeleton Examples -->
                    <ComponentDemo
                        title="Skeleton Component"
                        description="Loading placeholders with customizable dimensions"
                        code={`<Skeleton width="100%" height="1rem" />
<Skeleton width="80%" height="1rem" />
<Skeleton width="60%" height="1rem" />

<!-- Card skeleton -->
<div class="space-y-3">
  <Skeleton width="100%" height="200px" />
  <Skeleton width="100%" height="1rem" />
  <Skeleton width="70%" height="1rem" />
</div>`}
                    >
                        <div class="w-full space-y-4">
                            <div class="space-y-2">
                                <Skeleton width="100%" height="1rem" />
                                <Skeleton width="80%" height="1rem" />
                                <Skeleton width="60%" height="1rem" />
                            </div>
                            <Card size="sm" fullWidth={true}>
                                <div class="space-y-3">
                                    <Skeleton width="100%" height="200px" />
                                    <Skeleton width="100%" height="1rem" />
                                    <Skeleton width="70%" height="1rem" />
                                </div>
                            </Card>
                        </div>
                    </ComponentDemo>
                </div>

                <!-- View All Components CTA -->
                <div class="text-center mt-12">
                    <Button
                        variant="primary"
                        size="lg"
                        onclick={() => goto("/components")}
                        text="View All Components"
                    />
                </div>
            </div>
        </section>

        <!-- Contact Form -->
        <section class="py-16">
            <div class="max-w-2xl mx-auto">
                <Card size="md">
                    <div class="text-center mb-8">
                        <h2 class="text-3xl font-bold text-headline mb-4">
                            Get In Touch
                        </h2>
                        <p class="text-lg text-description">
                            Have questions or feedback? We'd love to hear from
                            you.
                        </p>
                    </div>
                    <ContactForm onsubmit={handleFormSubmit} />
                </Card>
            </div>
        </section>
    </main>

    <footer class="bg-base-100 border-t border-border py-8">
        <div class="container mx-auto px-6">
            <div
                class="flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <div class="text-center md:text-left">
                    <p class="text-description mb-2">
                        Clean components that just work. Less is more.
                    </p>
                    <p class="text-sm text-description/80">
                        © 2024 Zabi Components. MIT License.
                    </p>
                </div>
                <div class="flex gap-6">
                    <a
                        href="/docs"
                        class="text-description hover:text-body transition-colors"
                        >Docs</a
                    >
                    <a
                        href="/components"
                        class="text-description hover:text-body transition-colors"
                        >Components</a
                    >
                    <a
                        href="https://github.com"
                        class="text-description hover:text-body transition-colors"
                        >GitHub</a
                    >
                </div>
            </div>
        </div>
    </footer>
</div>
