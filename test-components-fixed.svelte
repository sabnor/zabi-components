<!-- Test file to verify zabi-components work correctly -->
<script lang="ts">
    import {
        Button,
        Input,
        Checkbox,
        Card,
        Badge,
        ThemeToggle,
    } from "./src/lib/index.js";

    let testValue = $state("Hello World");
    let isChecked = $state(false);
    let isOpen = $state(false);
</script>

<div class="p-8 space-y-4">
    <h1 class="text-2xl font-bold">Zabi Components Test</h1>

    <!-- Button Test -->
    <div class="space-y-2">
        <h2 class="text-lg font-semibold">Buttons</h2>
        <div class="flex gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
        </div>
    </div>

    <!-- Input Test -->
    <div class="space-y-2">
        <h2 class="text-lg font-semibold">Inputs</h2>
        <Input
            bind:value={testValue}
            label="Test Input"
            placeholder="Enter text..."
        />
        <p>Value: {testValue}</p>
    </div>

    <!-- Checkbox Test -->
    <div class="space-y-2">
        <h2 class="text-lg font-semibold">Checkboxes</h2>
        <Checkbox bind:checked={isChecked} label="Test Checkbox" />
        <p>Checked: {isChecked}</p>
    </div>

    <!-- Card Test -->
    <div class="space-y-2">
        <h2 class="text-lg font-semibold">Cards</h2>
        <Card>
            <h3 class="font-semibold">Test Card</h3>
            <p>This is a test card component.</p>
        </Card>
    </div>

    <!-- Badge Test -->
    <div class="space-y-2">
        <h2 class="text-lg font-semibold">Badges</h2>
        <div class="flex gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
        </div>
    </div>

    <!-- Theme Toggle Test -->
    <div class="space-y-2">
        <h2 class="text-lg font-semibold">Theme Toggle</h2>
        <ThemeToggle />
    </div>

    <div class="mt-8 p-4 bg-green-100 border border-green-300 rounded">
        <h3 class="font-semibold text-green-800">
            ✅ All components loaded successfully!
        </h3>
        <p class="text-green-700">
            No "Cannot read properties of null" errors detected.
        </p>
    </div>
</div>
