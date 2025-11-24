<script lang="ts">
    interface Props {
        method?: "get" | "post";
        action?: string;
        className?: string;
        onsubmit?: (event: SubmitEvent) => void;
    }

    let {
        method = "post",
        action = "",
        className = "",
        onsubmit,
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

    function handleSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        if (onsubmit) {
            onsubmit(event);
        }
    }
</script>

<form
    {method}
    {action}
    class="space-y-4 {className}"
    onsubmit={handleSubmit}
    {...restProps}
>
    {@render children?.()}
</form>
