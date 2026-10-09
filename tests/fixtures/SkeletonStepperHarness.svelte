<script lang="ts">
    import SkeletonGroup from "../../src/components/atoms/SkeletonGroup.svelte";
    import Stepper from "../../src/components/molecules/Stepper.svelte";
</script>

<SkeletonGroup aria-label="Laddar">
    <Stepper steps={["One", "Two"]} current={0} />
</SkeletonGroup>
