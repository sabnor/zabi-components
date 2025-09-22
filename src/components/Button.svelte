<script lang="ts">
  import "./styles/button.css";

  /**
   * Is this the principal call to action on the page?
   */
  export let variant: "primary" | "secondary" | "outline" | "ghost" = "primary";

  /**
   * What background color to use
   */
  export let backgroundColor: string | undefined = undefined;
  /**
   * How large should the button be?
   */
  export let size: "sm" | "md" | "lg" = "md";
  /**
   * Button contents
   */
  export let children: string = "";
  export let disabled: boolean = false;
  export let type: "button" | "submit" | "reset" = "button";

  $: mode = `storybook-button--${variant}`;

  $: style = backgroundColor ? `background-color: ${backgroundColor}` : "";
</script>

<button
  {type}
  class={["storybook-button", `storybook-button--${size}`, mode].join(" ")}
  {style}
  {disabled}
  on:click
>
  {children}
</button>
