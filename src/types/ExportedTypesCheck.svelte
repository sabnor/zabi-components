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
    import Stat from "../components/atoms/Stat.svelte";
    import SpeechBubble from "../components/atoms/SpeechBubble.svelte";
    import Chip from "../components/atoms/Chip.svelte";
    import ChipGroup from "../components/molecules/ChipGroup.svelte";
    import Button from "../components/atoms/Button.svelte";
    import Card from "../components/atoms/Card.svelte";
    import Checkbox from "../components/atoms/Checkbox.svelte";
    import Heading from "../components/atoms/Heading.svelte";
    import Input from "../components/atoms/Input.svelte";
    import Progress from "../components/atoms/Progress.svelte";
    import Rating from "../components/atoms/Rating.svelte";
    import PickerField from "../components/atoms/PickerField.svelte";
    import Select from "../components/atoms/Select.svelte";
    import Skeleton from "../components/atoms/Skeleton.svelte";
    import Textarea from "../components/atoms/Textarea.svelte";
    import Toggle from "../components/atoms/Toggle.svelte";
    import Tooltip from "../components/atoms/Tooltip.svelte";
    import Alert from "../components/molecules/Alert.svelte";
    import Modal from "../components/molecules/Modal.svelte";
    import SegmentedControl from "../components/molecules/SegmentedControl.svelte";
    import AppBar from "../components/molecules/AppBar.svelte";
    import BottomTabBar from "../components/molecules/BottomTabBar.svelte";
    import AppShell from "../components/organisms/AppShell.svelte";
    import AppNavigation from "../components/organisms/AppNavigation.svelte";
    import FloatingActionButton from "../components/atoms/FloatingActionButton.svelte";
    import BottomSheet from "../components/molecules/BottomSheet.svelte";
    import StickyActionBar from "../components/molecules/StickyActionBar.svelte";
    import DateField from "../components/atoms/DateField.svelte";
    import TimeField from "../components/atoms/TimeField.svelte";
    import Calendar from "../components/molecules/Calendar.svelte";
    import PhotoGrid from "../components/molecules/PhotoGrid.svelte";
    import PhotoViewer from "../components/molecules/PhotoViewer.svelte";
    import Stepper from "../components/molecules/Stepper.svelte";
    import Avatar from "../components/atoms/Avatar.svelte";
    import AvatarGroup from "../components/molecules/AvatarGroup.svelte";
    import type {
        AlertProps,
        BadgeProps,
        StatProps,
        SpeechBubbleProps,
        ChipProps,
        ChipGroupProps,
        ButtonProps,
        CardProps,
        CheckboxProps,
        HeadingProps,
        InputProps,
        ModalProps,
        ProgressProps,
        RatingProps,
        SegmentedControlProps,
        PickerFieldProps,
        SelectProps,
        SkeletonProps,
        TextareaProps,
        ToggleProps,
        TooltipProps,
        AppBarProps,
        BottomTabBarProps,
        AppShellProps,
        AppNavigationProps,
        FloatingActionButtonProps,
        BottomSheetProps,
        StickyActionBarProps,
        DateFieldProps,
        TimeFieldProps,
        CalendarProps,
        PhotoGridProps,
        PhotoViewerProps,
        StepperProps,
        AvatarProps,
        AvatarGroupProps,
    } from "./index";

    interface Props {
        alert?: AlertProps;
        badge?: BadgeProps;
        stat?: StatProps;
        speechBubble?: SpeechBubbleProps;
        chip?: ChipProps;
        chipGroup?: ChipGroupProps;
        /** `variant` still lists four values Button never had; see the interface. */
        button?: Omit<ButtonProps, "variant">;
        card?: CardProps;
        checkbox?: CheckboxProps;
        heading?: HeadingProps;
        input?: InputProps;
        modal?: ModalProps;
        progress?: ProgressProps;
        rating?: RatingProps;
        segmentedControl?: SegmentedControlProps;
        pickerField?: PickerFieldProps;
        select?: SelectProps;
        skeleton?: SkeletonProps;
        textarea?: TextareaProps;
        toggle?: ToggleProps;
        tooltip?: TooltipProps;
        appBar?: AppBarProps;
        bottomTabBar?: BottomTabBarProps;
        appShell?: AppShellProps;
        appNavigation?: AppNavigationProps;
        floatingActionButton?: FloatingActionButtonProps;
        bottomSheet?: BottomSheetProps;
        stickyActionBar?: StickyActionBarProps;
        dateField?: DateFieldProps;
        timeField?: TimeFieldProps;
        calendar?: CalendarProps;
        photoGrid?: PhotoGridProps;
        photoViewer?: PhotoViewerProps;
        stepper?: StepperProps;
        avatar?: AvatarProps;
        avatarGroup?: AvatarGroupProps;
    }

    let {
        alert = {},
        badge = {},
        stat,
        speechBubble = {},
        chip = {},
        chipGroup = {},
        button = {},
        card = {},
        checkbox = {},
        heading = {},
        input = {},
        modal = {},
        progress = {},
        rating = {},
        segmentedControl = { options: [] },
        pickerField = {},
        select = {},
        skeleton = {},
        textarea = {},
        toggle = {},
        tooltip = {},
        appBar = {},
        bottomTabBar = { items: [] },
        appShell = {},
        appNavigation = { items: [] },
        floatingActionButton = { label: "" },
        bottomSheet = { title: "" },
        stickyActionBar = {},
        dateField = {},
        timeField = {},
        calendar = {},
        photoGrid = { photos: [] },
        photoViewer = { photos: [] },
        stepper = { steps: [] },
        avatar = { name: "" },
        avatarGroup = { people: [] },
    }: Props = $props();
</script>

<Alert {...alert} />
<Badge {...badge} />
{#if stat}<Stat {...stat} />{/if}
<SpeechBubble {...speechBubble} />
<Chip {...chip} />
<ChipGroup {...chipGroup} />
<Button {...button} />
<Card {...card} />
<Checkbox {...checkbox} />
<Heading {...heading} />
<Input {...input} />
<Modal {...modal} />
<Progress {...progress} />
<Rating {...rating} />
<SegmentedControl {...segmentedControl} />
<PickerField {...pickerField} />
<Select {...select} />
<Skeleton {...skeleton} />
<Textarea {...textarea} />
<Toggle {...toggle} />
<Tooltip {...tooltip} />
<AppBar {...appBar} />
<BottomTabBar {...bottomTabBar} />
<AppShell {...appShell} />
<AppNavigation {...appNavigation} />
<FloatingActionButton {...floatingActionButton} />
<BottomSheet {...bottomSheet} />
<StickyActionBar {...stickyActionBar} />
<DateField {...dateField} />
<TimeField {...timeField} />
<Calendar {...calendar} />
<PhotoGrid {...photoGrid} />
<PhotoViewer {...photoViewer} />
<Stepper {...stepper} />
<Avatar {...avatar} />
<AvatarGroup {...avatarGroup} />
