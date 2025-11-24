<script lang="ts">
    import Form from "./Form.svelte";
    import Input from "../atoms/Input.svelte";
    import Textarea from "../atoms/Textarea.svelte";
    import Checkbox from "../atoms/Checkbox.svelte";
    import Button from "../atoms/Button.svelte";
    import Card from "../atoms/Card.svelte";
    import type { ContactFormData } from "../../types/page.types";

    interface Props {
        className?: string;
        onsubmit?: (event: SubmitEvent) => void;
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

    function handleFormSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data: ContactFormData = {
            name: (formData.get("name") as string) || "",
            email: (formData.get("email") as string) || "",
            message: (formData.get("message") as string) || "",
            subscribe: formData.get("subscribe") === "on" || false,
        };

        console.log("Form submitted with data:", data);
    }
</script>

<Card size="md" fullWidth={true} title="Get in Touch">
    <Form onsubmit={handleFormSubmit} className="space-y-4">
        <div class="space-y-4">
            <Input
                type="text"
                name="name"
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                oninput={(e) =>
                    (formData.name = (e.target as HTMLInputElement).value)}
            />
            <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                oninput={(e) =>
                    (formData.email = (e.target as HTMLInputElement).value)}
            />
            <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                oninput={(e) =>
                    (formData.email = (e.target as HTMLInputElement).value)}
            />
            <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                oninput={(e) =>
                    (formData.email = (e.target as HTMLInputElement).value)}
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
</Card>
