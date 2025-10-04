<script lang="ts">
    import Form from "./Form.svelte";
    import Input from "../atoms/Input.svelte";
    import Button from "../atoms/Button.svelte";
    import { createEventDispatcher } from "svelte";
    import type { FormData } from "../../types/page.types";

    interface ContactFormEvents {
        submit: { data: FormData };
    }

    export let initialData: FormData = { name: "", email: "" };
    export let className = "";

    const dispatch = createEventDispatcher<ContactFormEvents>();

    let formData = { ...initialData };

    function handleFormSubmit(event: CustomEvent) {
        dispatch("submit", { data: formData });
    }
</script>

<section class="contact-form max-w-md mx-auto space-y-6 {className}">
    <h3 class="text-xl font-semibold text-text text-center">Contact Form</h3>
    <Form on:submit={handleFormSubmit}>
        <div class="form-field">
            <label for="name" class="form-label">Name</label>
            <Input
                id="name"
                name="name"
                bind:value={formData.name}
                placeholder="Enter your name"
                required
            />
        </div>

        <div class="form-field">
            <label for="email" class="form-label">Email</label>
            <Input
                id="email"
                name="email"
                type="email"
                bind:value={formData.email}
                placeholder="Enter your email"
                required
            />
        </div>

        <div class="form-actions">
            <Button type="submit" variant="primary" className="flex-1">
                Submit
            </Button>
        </div>
    </Form>
</section>

<style>
    .contact-form {
        @apply py-6;
    }
</style>
