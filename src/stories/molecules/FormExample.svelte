<script lang="ts">
    import Form from '../../components/molecules/Form.svelte';
    import Input from '../../components/atoms/Input.svelte';
    import Button from '../../components/atoms/Button.svelte';

    let email = $state('');
</script>

<Form className="w-[360px] rounded-lg border border-border p-4">
    <Input
        name="email"
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        bind:value={email}
        required
    />
    <Button type="submit" text="Create Project" />
</Form>
