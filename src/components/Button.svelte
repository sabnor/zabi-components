<script lang="ts">
  export let variant: "primary" | "secondary" = "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let disabled: boolean = false;
  export let type: "button" | "submit" | "reset" = "button";
</script>

<button
  {type}
  {disabled}
  class="inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed {variant ===
  'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
    : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500'} {size ===
  'sm'
    ? 'px-3 py-1.5 text-sm'
    : size === 'lg'
      ? 'px-6 py-3 text-lg'
      : 'px-4 py-2 text-base'}"
  on:click
>
  <slot />
</button>
