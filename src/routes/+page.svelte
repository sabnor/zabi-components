<script>
    // Atomic Components
    import Button from "../components/atoms/Button.svelte";
    import Badge from "../components/atoms/Badge.svelte";
    import Card from "../components/atoms/Card.svelte";
    import Checkbox from "../components/atoms/Checkbox.svelte";
    import ColorPicker from "../components/atoms/ColorPicker.svelte";
    import Heading from "../components/atoms/Heading.svelte";
    import Input from "../components/atoms/Input.svelte";
    import OptimizedImage from "../components/atoms/OptimizedImage.svelte";
    import ScaleDemo from "../components/atoms/ScaleDemo.svelte";
    import Select from "../components/atoms/Select.svelte";
    import Skeleton from "../components/atoms/Skeleton.svelte";
    import Textarea from "../components/atoms/Textarea.svelte";
    import TextAlignment from "../components/atoms/TextAlignment.svelte";
    import ThemeToggle from "../components/atoms/ThemeToggle.svelte";
    import Toggle from "../components/atoms/Toggle.svelte";
    import PerformanceMonitor from "../components/atoms/PerformanceMonitor.svelte";

    // Molecular Components
    import Alert from "../components/molecules/Alert.svelte";
    import Modal from "../components/molecules/Modal.svelte";
    import ImageUpload from "../components/molecules/ImageUpload.svelte";
    import KeyValueForm from "../components/molecules/KeyValueForm.svelte";
    import Dropdown from "../components/molecules/Dropdown.svelte";
    import SlideUp from "../components/molecules/SlideUp.svelte";

    // Organism Components
    import NotificationManager from "../components/organisms/NotificationManager.svelte";

    // State for interactive examples
    let showModal = false;
    let showSlideUp = false;
    let showAlert = false;
    let showScaleDemo = false;
    let checkboxValue = false;
    let toggleValue = false;
    let inputValue = "";
    let textareaValue = "";
    let selectValue = "";
    let colorValue = "#3B82F6";
    let textAlignValue = "left";
    let formData = {};

    // Button demo state
    let isSaving = false;
    let isDeleting = false;
    let isPressed = false;

    const selectOptions = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    const formConfig = [
        { key: "name", type: "text", label: "Name", required: true },
        { key: "email", type: "email", label: "Email", required: true },
        { key: "message", type: "textarea", label: "Message", rows: 4 },
    ];

    function showToast() {
        // This would trigger a toast notification
        console.log("Toast notification triggered");
    }

    async function handleSave() {
        isSaving = true;
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        isSaving = false;
    }

    async function handleDelete() {
        if (confirm("Are you sure you want to delete this item?")) {
            isDeleting = true;
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            isDeleting = false;
        }
    }

    function handleToggle() {
        isPressed = !isPressed;
    }
</script>

<svelte:head>
    <title>Zabi Components</title>
    <meta
        name="description"
        content="A collection of reusable Svelte components"
    />
</svelte:head>

<div class="min-h-screen bg-page">
    <section class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-4xl font-bold text-primary mb-2">
                    Zabi Components
                </h1>
                <p class="text-lg text-secondary">
                    A collection of reusable Svelte components built with
                    Tailwind CSS and TypeScript, featuring comprehensive scales
                    with light and dark mode support. Now with enhanced Button
                    component featuring 7 variants, full accessibility, and
                    semantic tokens.
                </p>
            </div>
            <ThemeToggle size="lg" />
        </div>

        <!-- Scale Demo Section -->
        <div class="space-y-8 mb-12">
            <div class="flex justify-between items-center">
                <Heading level="2" class="text-2xl font-semibold text-primary">
                    Design System Scales
                </Heading>
                <Button
                    on:click={() => (showScaleDemo = true)}
                    variant="secondary"
                >
                    View Scale Demo
                </Button>
            </div>
            <p class="text-secondary">
                Comprehensive Tailwind scales supporting both light and dark
                modes. Includes color palettes, typography, spacing, shadows,
                animations, and more.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="card p-4">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        Color Scales
                    </h3>
                    <p class="text-secondary text-sm mb-3">
                        Primary, secondary, neutral, and semantic color palettes
                        with 11 shades each.
                    </p>
                    <div class="flex space-x-1">
                        <div class="w-4 h-4 bg-primary rounded"></div>
                        <div class="w-4 h-4 bg-secondary rounded"></div>
                        <div class="w-4 h-4 bg-success rounded"></div>
                        <div class="w-4 h-4 bg-warning rounded"></div>
                        <div class="w-4 h-4 bg-error rounded"></div>
                    </div>
                </div>
                <div class="card p-4">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        Typography
                    </h3>
                    <p class="text-secondary text-sm mb-3">
                        Extended typography scale from 2xs to 9xl with proper
                        line heights.
                    </p>
                    <div class="space-y-1">
                        <p class="text-sm text-primary">Small text</p>
                        <p class="text-base text-primary">Base text</p>
                        <p class="text-lg text-primary">Large text</p>
                    </div>
                </div>
                <div class="card p-4">
                    <h3 class="text-lg font-semibold text-primary mb-2">
                        Adaptive Design
                    </h3>
                    <p class="text-secondary text-sm mb-3">
                        Automatic light/dark mode support with CSS custom
                        properties.
                    </p>
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-primary rounded-full"></div>
                        <span class="text-sm text-secondary"
                            >Theme-aware colors</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- Atomic Components -->
        <div class="space-y-8 mb-12">
            <Heading level="2" class="text-2xl font-semibold text-primary"
                >Atomic Components</Heading
            >

            <!-- Buttons -->
            <div class="space-y-8">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-medium text-primary">
                        Button Component
                    </h3>
                    <Badge variant="success">New & Improved</Badge>
                </div>

                <!-- All Variants -->
                <div class="space-y-4">
                    <h4 class="text-md font-medium text-secondary">
                        All Variants
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="warning">Warning</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button variant="primary" loading>Loading</Button>
                    </div>
                </div>

                <!-- Sizes -->
                <div class="space-y-4">
                    <h4 class="text-md font-medium text-secondary">Sizes</h4>
                    <div class="flex items-center gap-4">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                    </div>
                </div>

                <!-- States -->
                <div class="space-y-4">
                    <h4 class="text-md font-medium text-secondary">States</h4>
                    <div class="flex flex-wrap gap-4">
                        <Button variant="primary">Normal</Button>
                        <Button variant="primary" loading>Loading</Button>
                        <Button variant="primary" disabled>Disabled</Button>
                        <Button variant="primary" fullWidth>Full Width</Button>
                    </div>
                </div>

                <!-- Interactive Examples -->
                <div class="space-y-4">
                    <h4 class="text-md font-medium text-secondary">
                        Interactive Examples
                    </h4>
                    <div class="flex flex-wrap gap-4">
                        <Button
                            variant="primary"
                            loading={isSaving}
                            on:click={handleSave}
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>

                        <Button
                            variant="danger"
                            loading={isDeleting}
                            on:click={handleDelete}
                        >
                            {isDeleting ? "Deleting..." : "Delete Item"}
                        </Button>

                        <Button
                            variant="secondary"
                            ariaPressed={isPressed}
                            on:click={handleToggle}
                        >
                            {isPressed ? "Pressed" : "Toggle"}
                        </Button>

                        <Button variant="ghost" ariaLabel="Settings">⚙️</Button>
                    </div>
                </div>

                <!-- With Icons -->
                <div class="space-y-4">
                    <h4 class="text-md font-medium text-secondary">
                        With Icons
                    </h4>
                    <div class="flex flex-wrap gap-4">
                        <Button variant="primary" iconLeft="🔍">Search</Button>
                        <Button variant="success" iconRight="✓">Confirm</Button>
                        <Button variant="warning" iconLeft="⚠️" iconRight="→"
                            >Proceed</Button
                        >
                        <Button variant="ghost" iconLeft="📁">Open</Button>
                    </div>
                </div>

                <!-- Accessibility Features -->
                <div class="space-y-4">
                    <h4 class="text-md font-medium text-secondary">
                        Accessibility Features
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="card p-4">
                            <h5 class="font-medium text-primary mb-2">
                                ARIA Support
                            </h5>
                            <div class="space-y-2">
                                <Button ariaLabel="Close dialog" variant="ghost"
                                    >×</Button
                                >
                                <Button
                                    ariaPressed={isPressed}
                                    on:click={handleToggle}
                                >
                                    Toggle Button
                                </Button>
                            </div>
                        </div>
                        <div class="card p-4">
                            <h5 class="font-medium text-primary mb-2">
                                Keyboard Navigation
                            </h5>
                            <p class="text-sm text-secondary">
                                All buttons support Tab navigation, Enter/Space
                                activation, and proper focus indicators.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Semantic Tokens -->
                <div class="space-y-4">
                    <h4 class="text-md font-medium text-secondary">
                        Semantic Token Usage
                    </h4>
                    <div class="card p-4">
                        <p class="text-sm text-secondary mb-3">
                            All button variants use semantic design tokens for
                            consistent theming and automatic light/dark mode
                            support.
                        </p>
                        <div
                            class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs"
                        >
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-primary rounded"></div>
                                <span>Primary</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-success rounded"></div>
                                <span>Success</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-warning rounded"></div>
                                <span>Warning</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-error rounded"></div>
                                <span>Danger</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Badges -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-primary">Badges</h3>
                <div class="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                </div>
            </div>

            <!-- Cards -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-primary">Cards</h3>
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    <Card>
                        <h4 class="font-semibold mb-2">Basic Card</h4>
                        <p class="text-gray-600">
                            This is a basic card component.
                        </p>
                    </Card>
                    <Card variant="elevated">
                        <h4 class="font-semibold mb-2">Elevated Card</h4>
                        <p class="text-gray-600">This card has elevation.</p>
                    </Card>
                    <Card variant="outlined">
                        <h4 class="font-semibold mb-2">Outlined Card</h4>
                        <p class="text-gray-600">This card has a border.</p>
                    </Card>
                </div>
            </div>

            <!-- Form Controls -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">Form Controls</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <Input
                            bind:value={inputValue}
                            placeholder="Enter text..."
                            label="Text Input"
                        />
                        <Textarea
                            bind:value={textareaValue}
                            placeholder="Enter message..."
                            label="Textarea"
                            rows="3"
                        />
                        <Select
                            bind:value={selectValue}
                            options={selectOptions}
                            label="Select Option"
                        />
                        <ColorPicker
                            bind:value={colorValue}
                            label="Color Picker"
                        />
                        <TextAlignment
                            bind:value={textAlignValue}
                            label="Text Alignment"
                        />
                    </div>
                    <div class="space-y-4">
                        <Checkbox
                            bind:checked={checkboxValue}
                            label="Checkbox Option"
                        />
                        <Toggle
                            bind:checked={toggleValue}
                            label="Toggle Switch"
                        />
                        <div class="p-4 border rounded-lg">
                            <h4 class="font-medium mb-2">Selected Values:</h4>
                            <p class="text-sm text-gray-600">
                                Input: {inputValue}
                            </p>
                            <p class="text-sm text-gray-600">
                                Textarea: {textareaValue}
                            </p>
                            <p class="text-sm text-gray-600">
                                Select: {selectValue}
                            </p>
                            <p class="text-sm text-gray-600">
                                Color: {colorValue}
                            </p>
                            <p class="text-sm text-gray-600">
                                Alignment: {textAlignValue}
                            </p>
                            <p class="text-sm text-gray-600">
                                Checkbox: {checkboxValue}
                            </p>
                            <p class="text-sm text-gray-600">
                                Toggle: {toggleValue}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Skeleton -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">
                    Skeleton Loading
                </h3>
                <div class="space-y-2">
                    <Skeleton height="h-4" width="w-3/4" />
                    <Skeleton height="h-4" width="w-1/2" />
                    <Skeleton height="h-20" width="w-full" />
                </div>
            </div>

            <!-- Optimized Image -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">
                    Optimized Image
                </h3>
                <OptimizedImage
                    src="/vite.svg"
                    alt="Vite Logo"
                    width="100"
                    height="100"
                    class="rounded-lg"
                />
            </div>
        </div>

        <!-- Molecular Components -->
        <div class="space-y-8 mb-12">
            <Heading level="2" class="text-2xl font-semibold text-gray-800"
                >Molecular Components</Heading
            >

            <!-- Alerts -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">Alerts</h3>
                <div class="space-y-2">
                    <Alert variant="info">This is an info alert</Alert>
                    <Alert variant="success">This is a success alert</Alert>
                    <Alert variant="warning">This is a warning alert</Alert>
                    <Alert variant="error">This is an error alert</Alert>
                </div>
            </div>

            <!-- Modal -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">Modal</h3>
                <Button on:click={() => (showModal = true)}>Open Modal</Button>
                <Modal bind:isOpen={showModal} title="Example Modal">
                    <p class="mb-4">This is a modal dialog example.</p>
                    <div class="flex gap-2">
                        <Button
                            variant="primary"
                            on:click={() => (showModal = false)}>Close</Button
                        >
                        <Button
                            variant="secondary"
                            on:click={() => (showModal = false)}>Cancel</Button
                        >
                    </div>
                </Modal>
            </div>

            <!-- Slide Up -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">Slide Up</h3>
                <Button on:click={() => (showSlideUp = true)}
                    >Open Slide Up</Button
                >
                <SlideUp bind:isOpen={showSlideUp} title="Slide Up Panel">
                    <p class="mb-4">This is a slide-up panel example.</p>
                    <Button
                        variant="primary"
                        on:click={() => (showSlideUp = false)}>Close</Button
                    >
                </SlideUp>
            </div>

            <!-- Dropdown -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">Dropdown</h3>
                <Dropdown>
                    <Button slot="trigger">Dropdown Menu</Button>
                    <div slot="content" class="p-2">
                        <button
                            class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded"
                            on:click={() => console.log("Option 1 clicked")}
                            >Option 1</button
                        >
                        <button
                            class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded"
                            on:click={() => console.log("Option 2 clicked")}
                            >Option 2</button
                        >
                        <button
                            class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded"
                            on:click={() => console.log("Option 3 clicked")}
                            >Option 3</button
                        >
                    </div>
                </Dropdown>
            </div>

            <!-- Image Upload -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">Image Upload</h3>
                <ImageUpload
                    accept="image/*"
                    maxSize={5 * 1024 * 1024}
                    onUpload={(files) => console.log("Uploaded files:", files)}
                />
            </div>

            <!-- Key Value Form -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">Dynamic Form</h3>
                <KeyValueForm
                    config={formConfig}
                    bind:data={formData}
                    on:submit={(e) => console.log("Form submitted:", e.detail)}
                />
            </div>
        </div>

        <!-- Organism Components -->
        <div class="space-y-8 mb-12">
            <Heading level="2" class="text-2xl font-semibold text-gray-800"
                >Organism Components</Heading
            >

            <!-- Notification Manager -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-700">
                    Notification Manager
                </h3>
                <Button variant="primary" on:click={showToast}
                    >Show Toast Notification</Button
                >
                <NotificationManager />
            </div>
        </div>

        <!-- Performance Monitor -->
        <div class="space-y-4">
            <h3 class="text-lg font-medium text-primary">
                Performance Monitor
            </h3>
            <PerformanceMonitor />
        </div>

        <!-- Scale Demo Modal -->
        {#if showScaleDemo}
            <div
                class="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
                <div
                    class="bg-card-elevated rounded-lg shadow-adaptive-xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
                >
                    <div
                        class="flex justify-between items-center p-4 border-b border-primary"
                    >
                        <h2 class="text-xl font-semibold text-primary">
                            Design System Scales Demo
                        </h2>
                        <button
                            on:click={() => (showScaleDemo = false)}
                            class="text-tertiary hover:text-primary transition-colors"
                            aria-label="Close scale demo"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="overflow-y-auto max-h-[calc(90vh-80px)]">
                        <ScaleDemo />
                    </div>
                </div>
            </div>
        {/if}
    </section>
</div>
