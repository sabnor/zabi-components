<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Form from "./Form.svelte";
    import Input from "../atoms/Input.svelte";
    import Textarea from "../atoms/Textarea.svelte";
    import Checkbox from "../atoms/Checkbox.svelte";
    import Button from "../atoms/Button.svelte";
    import type { ContactFormData } from "../../types/page.types";

    export let className: string = "";

    const dispatch = createEventDispatcher<{
        submit: { data: ContactFormData };
    }>();

    let formData: ContactFormData = {
        name: "",
        email: "",
        message: "",
        subscribe: false,
    };

    function handleFormSubmit(
        event: CustomEvent<{ data: Record<string, any> }>,
    ) {
        const data: ContactFormData = {
            name: event.detail.data.name || "",
            email: event.detail.data.email || "",
            message: event.detail.data.message || "",
            subscribe: event.detail.data.subscribe || false,
        };
        dispatch("submit", { data });
    }
</script>

<div class="max-w-md mx-auto {className}">
    <div class="mb-6">
        <h2 class="text-2xl font-bold text-text mb-2">Get in Touch</h2>
        <p class="text-text-secondary">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
        </p>
    </div>

    <Form on:submit={handleFormSubmit} className="space-y-4">
        <div class="space-y-4">
            <Input
                type="text"
                label="Name"
                placeholder="Enter your name"
                bind:value={formData.name}
            />
            <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                bind:value={formData.email}
            />
            <Textarea
                label="Message"
                placeholder="Enter your message"
                rows={4}
                bind:value={formData.message}
            />
            <Checkbox
                label="Subscribe to updates"
                bind:checked={formData.subscribe}
            />
        </div>
        <div class="pt-4">
            <Button type="submit" variant="primary" size="md">
                Send Message
            </Button>
        </div>
    </Form>
</div>
