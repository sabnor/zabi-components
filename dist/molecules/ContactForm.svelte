<script lang="ts">
    import Form from "./Form.svelte";
    import Input from "../atoms/Input.svelte";
    import Textarea from "../atoms/Textarea.svelte";
    import Checkbox from "../atoms/Checkbox.svelte";
    import Button from "../atoms/Button.svelte";
    import Card from "../atoms/Card.svelte";
    import CardHeader from "../atoms/CardHeader.svelte";
    import CardContent from "../atoms/CardContent.svelte";
    import type { ContactFormData } from "../types/page.types";

    interface Props {
        className?: string;
        onsubmit?: (event: SubmitEvent) => void;
    }

    let {
        className = "",
        onsubmit,
    }: Props = $props();

    let formData = $state<ContactFormData>({
        name: "",
        email: "",
        message: "",
        subscribe: false,
    });

    let fieldErrors = $state<Partial<Record<keyof ContactFormData, string>>>({});
    let formErrorMessage = $state("");

    function validate(data: ContactFormData) {
        const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};

        if (!data.name.trim()) {
            nextErrors.name = "Please enter your name.";
        }

        if (!data.email.trim()) {
            nextErrors.email = "Please enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!(data.message || "").trim()) {
            nextErrors.message = "Please enter a message.";
        }

        fieldErrors = nextErrors;
        return Object.keys(nextErrors).length === 0;
    }

    function handleFormSubmit(event: SubmitEvent) {
        const submittedFormData = new FormData(event.target as HTMLFormElement);
        const data: ContactFormData = {
            name: (submittedFormData.get("name") as string) || "",
            email: (submittedFormData.get("email") as string) || "",
            message: (submittedFormData.get("message") as string) || "",
            subscribe: submittedFormData.get("subscribe") === "on" || false,
        };

        if (!validate(data)) {
            formErrorMessage =
                "We could not submit your request. Fix the highlighted fields and try again.";
            return;
        }

        formErrorMessage = "";
        if (onsubmit) {
            onsubmit(event);
        }
    }
</script>

<div class={className}>
    <Card size="md" fullWidth={true}>
        <CardHeader title="Get in Touch" />
        <CardContent>
            <Form onsubmit={handleFormSubmit} className="space-y-4">
                {#if formErrorMessage}
                <div
                    class="rounded-lg border border-error px-4 py-3 text-sm text-error"
                    role="alert"
                >
                    <p class="font-medium">Something went wrong</p>
                    <p>{formErrorMessage}</p>
                    <p class="mt-1">Recovery action: review your inputs and resubmit.</p>
                </div>
                {/if}
                <div class="space-y-4">
                    <Input
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Enter your name"
                        value={formData.name}
                        oninput={(e) =>
                            (formData.name = (e.target as HTMLInputElement).value)}
                        variant={fieldErrors.name ? "error" : "default"}
                        message={fieldErrors.name || ""}
                    />
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={formData.email}
                        oninput={(e) =>
                            (formData.email = (e.target as HTMLInputElement).value)}
                        variant={fieldErrors.email ? "error" : "default"}
                        message={fieldErrors.email || ""}
                    />
                    <Textarea
                        name="message"
                        label="Message"
                        placeholder="Enter your message"
                        rows={4}
                        value={formData.message}
                        oninput={(e) =>
                            (formData.message = (
                                e.target as HTMLTextAreaElement
                            ).value)}
                        variant={fieldErrors.message ? "error" : "default"}
                        message={fieldErrors.message || ""}
                    />
                    <Checkbox
                        name="subscribe"
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
        </CardContent>
    </Card>
</div>
