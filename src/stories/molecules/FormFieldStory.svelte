<script lang="ts">
    import FormField from '../../components/molecules/FormField.svelte';
    import Input from '../../components/atoms/Input.svelte';

    let email = $state('');
</script>

<FormField
    label="Email"
    description="We will never share your email."
    error={email && !email.includes('@') ? 'Enter a valid email.' : ''}
    required
>
    {#snippet control(props)}
        <Input
            {...props}
            type="email"
            bind:value={email}
            placeholder="you@example.com"
            hideLabel
            label="Email"
        />
    {/snippet}
</FormField>
