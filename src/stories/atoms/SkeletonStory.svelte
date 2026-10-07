<script lang="ts">
    import Skeleton from "../../components/atoms/Skeleton.svelte";
    import SkeletonGroup from "../../components/atoms/SkeletonGroup.svelte";
</script>

<div class="w-[32rem] max-w-full">
    <SkeletonGroup class="flex items-center gap-3">
        <Skeleton variant="circle" />
        <Skeleton width="60%" class="flex-1" />
    </SkeletonGroup>
</div>
