<script lang="ts">
    import Form from "./Form.svelte";
    import Input from "../atoms/Input.svelte";
    import Textarea from "../atoms/Textarea.svelte";
    import Checkbox from "../atoms/Checkbox.svelte";
    import Button from "../atoms/Button.svelte";
    import type { ContactFormData } from "../../types/page.types";

    interface Props {
        className?: string;
    }

    let {
        className = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

    let formData = $state<ContactFormData>({
        name: "",
        email: "",
        message: "",
        subscribe: false,
    });

    function handleFormSubmit(
        event: CustomEvent<{ data: Record<string, any> }>,
    ) {
        const data: ContactFormData = {
            name: event.detail.data.name || "",
            email: event.detail.data.email || "",
            message: event.detail.data.message || "",
            subscribe: event.detail.data.subscribe || false,
        };
        // Form submission is now handled by the parent component
        // through event forwarding
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

    <Form onsubmit={handleFormSubmit} className="space-y-4">
        <div class="space-y-4">
            <Input
                type="text"
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                oninput={(e) =>
                    (formData.name = (e.target as HTMLInputElement).value)}
            />
            <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                oninput={(e) =>
                    (formData.email = (e.target as HTMLInputElement).value)}
            />
            <Textarea
                label="Message"
                placeholder="Enter your message"
                rows={4}
                value={formData.message}
                oninput={(e) =>
                    (formData.message = (
                        e.target as HTMLTextAreaElement
                    ).value)}
            />
            <Checkbox
                label="Subscribe to updates"
                checked={formData.subscribe}
                onchange={(e) =>
                    (formData.subscribe = (
                        e.target as HTMLInputElement
                    ).checked)}
            />
        </div>
        <div class="pt-4">
            <Button type="submit" variant="primary" size="md">
                Send Message
            </Button>
        </div>
    </Form>
</div>
