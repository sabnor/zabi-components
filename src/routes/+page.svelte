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
                    with light and dark mode support.
                </p>
            </div>
            <ThemeToggle size="lg" variant="outline" />
        </div>

        <!-- Scale Demo Section -->
        <div class="space-y-8 mb-12">
            <div class="flex justify-between items-center">
                <Heading level="2" class="text-2xl font-semibold text-primary">
                    Design System Scales
                </Heading>
                <Button
                    on:click={() => (showScaleDemo = true)}
                    variant="outline"
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
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-primary">Buttons</h3>
                <div class="flex flex-wrap gap-4">
                    <Button>Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button size="sm">Small Button</Button>
                    <Button size="lg">Large Button</Button>
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
                        <Button on:click={() => (showModal = false)}
                            >Close</Button
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
                    <Button on:click={() => (showSlideUp = false)}>Close</Button
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
                <Button on:click={showToast}>Show Toast Notification</Button>
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
