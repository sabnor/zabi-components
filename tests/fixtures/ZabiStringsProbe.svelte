<script lang="ts">
    import { getZabiStrings } from "../../src/components/util/zabi-strings.js";

    /** App code reading the provider it is under: prints the common word for "close". */
    interface Props {
        id: string;
    }
    let { id }: Props = $props();

    const words = getZabiStrings();
</script>

<span data-testid={id}>{words.current.common?.close ?? "(none)"}</span>
