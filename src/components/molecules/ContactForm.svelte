<script lang="ts">
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import Form from "./Form.svelte";
    import Input from "../atoms/Input.svelte";
    import Textarea from "../atoms/Textarea.svelte";
    import Checkbox from "../atoms/Checkbox.svelte";
    import Button from "../atoms/Button.svelte";
    import Card from "../atoms/Card.svelte";
    import CardHeader from "../atoms/CardHeader.svelte";
    import CardContent from "../atoms/CardContent.svelte";
    import type { ContactFormData } from "../types/page.types";
    import { cn } from "../util/cn.js";
    import {
        DEFAULT_CONTACT_FORM_STRINGS,
        type ContactFormStrings,
    } from "../util/ready-made-strings.js";

    /**
     * A ready-made contact form, in English. An app in another language
     * passes every text through `strings`, or builds its own form from
     * `Form`, `FormField` and the fields.
     */
    interface Props {
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        /** Every label, placeholder, error and the heading, for another language. */
        strings?: Partial<ContactFormStrings>;
        onsubmit?: (event: SubmitEvent) => void;
    }

    let {
        class: classAttr = "",
        className: legacyClass = "",
        strings,
        onsubmit,
    }: Props = $props();

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("contactForm");
    const text = $derived(mergeStrings(DEFAULT_CONTACT_FORM_STRINGS, provided(), strings));

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));

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
            nextErrors.name = text.nameRequired;
        }

        if (!data.email.trim()) {
            nextErrors.email = text.emailRequired;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            nextErrors.email = text.emailInvalid;
        }

        if (!(data.message || "").trim()) {
            nextErrors.message = text.messageRequired;
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
            // Block native submission so the page does not reload and wipe the errors.
            event.preventDefault();
            formErrorMessage = text.errorMessage;
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
        <CardHeader title={text.heading} />
        <CardContent>
            <Form onsubmit={handleFormSubmit} className="space-y-4">
                {#if formErrorMessage}
                <div
                    class="rounded-control border border-error px-4 py-3 text-sm text-error"
                    role="alert"
                >
                    <p class="font-medium">{text.errorTitle}</p>
                    <p>{formErrorMessage}</p>
                    <p class="mt-1">{text.errorRecovery}</p>
                </div>
                {/if}
                <div class="space-y-4">
                    <Input
                        type="text"
                        name="name"
                        label={text.nameLabel}
                        placeholder={text.namePlaceholder}
                        value={formData.name}
                        oninput={(e) =>
                            (formData.name = (e.target as HTMLInputElement).value)}
                        variant={fieldErrors.name ? "error" : "default"}
                        message={fieldErrors.name || ""}
                    />
                    <Input
                        type="email"
                        name="email"
                        label={text.emailLabel}
                        placeholder={text.emailPlaceholder}
                        value={formData.email}
                        oninput={(e) =>
                            (formData.email = (e.target as HTMLInputElement).value)}
                        variant={fieldErrors.email ? "error" : "default"}
                        message={fieldErrors.email || ""}
                    />
                    <Textarea
                        name="message"
                        label={text.messageLabel}
                        placeholder={text.messagePlaceholder}
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
                        label={text.subscribeLabel}
                        checked={formData.subscribe}
                        onchange={(e) =>
                            (formData.subscribe = (
                                e.target as HTMLInputElement
                            ).checked)}
                    />
                </div>
                <div class="pt-4">
                    <Button type="submit" variant="primary" size="md">
                        {text.submit}
                    </Button>
                </div>
            </Form>
        </CardContent>
    </Card>
</div>
