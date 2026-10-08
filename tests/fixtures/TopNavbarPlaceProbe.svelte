<script lang="ts">
    import { getTopNavbarPlace } from "../../src/components/util/top-navbar";

    const place = getTopNavbarPlace();
</script>

<span data-testid="place" data-place={place}>{place}</span>
