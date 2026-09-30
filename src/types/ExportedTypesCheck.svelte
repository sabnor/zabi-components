<script lang="ts">
    /**
     * Type-level guard, checked by `npm run check` and never packaged (the
     * library build takes only `.ts` from this folder): each exported `*Props`
     * interface must be assignable to the component it describes. A prop whose
     * type has drifted from the component fails svelte-check here.
     *
     * Deprecated members are left out where their type is not one the
     * component takes; they were never props.
     */
    import Badge from "../components/atoms/Badge.svelte";
    import Button from "../components/atoms/Button.svelte";
    import Card from "../components/atoms/Card.svelte";
    import Checkbox from "../components/atoms/Checkbox.svelte";
    import Heading from "../components/atoms/Heading.svelte";
    import Input from "../components/atoms/Input.svelte";
    import Progress from "../components/atoms/Progress.svelte";
    import Select from "../components/atoms/Select.svelte";
    import Skeleton from "../components/atoms/Skeleton.svelte";
    import Textarea from "../components/atoms/Textarea.svelte";
    import Toggle from "../components/atoms/Toggle.svelte";
    import Tooltip from "../components/atoms/Tooltip.svelte";
    import Alert from "../components/molecules/Alert.svelte";
    import Modal from "../components/molecules/Modal.svelte";
    import type {
        AlertProps,
        BadgeProps,
        ButtonProps,
        CardProps,
        CheckboxProps,
        HeadingProps,
        InputProps,
        ModalProps,
        ProgressProps,
        SelectProps,
        SkeletonProps,
        TextareaProps,
        ToggleProps,
        TooltipProps,
    } from "./index";

    interface Props {
        alert?: AlertProps;
        badge?: BadgeProps;
        /** `variant` still lists four values Button never had; see the interface. */
        button?: Omit<ButtonProps, "variant">;
        card?: CardProps;
        checkbox?: CheckboxProps;
        heading?: HeadingProps;
        input?: InputProps;
        modal?: ModalProps;
        progress?: ProgressProps;
        select?: SelectProps;
        skeleton?: SkeletonProps;
        textarea?: TextareaProps;
        toggle?: ToggleProps;
        tooltip?: TooltipProps;
    }

    let {
        alert = {},
        badge = {},
        button = {},
        card = {},
        checkbox = {},
        heading = {},
        input = {},
        modal = {},
        progress = {},
        select = {},
        skeleton = {},
        textarea = {},
        toggle = {},
        tooltip = {},
    }: Props = $props();
</script>

<Alert {...alert} />
<Badge {...badge} />
<Button {...button} />
<Card {...card} />
<Checkbox {...checkbox} />
<Heading {...heading} />
<Input {...input} />
<Modal {...modal} />
<Progress {...progress} />
<Select {...select} />
<Skeleton {...skeleton} />
<Textarea {...textarea} />
<Toggle {...toggle} />
<Tooltip {...tooltip} />
