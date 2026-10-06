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
    import Rating from "../components/atoms/Rating.svelte";
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
        ButtonProps,
        CardProps,
        CheckboxProps,
        HeadingProps,
        InputProps,
        ModalProps,
        ProgressProps,
        RatingProps,
        SegmentedControlProps,
        SelectProps,
        SkeletonProps,
        TextareaProps,
        ToggleProps,
        TooltipProps,
        AppBarProps,
        BottomTabBarProps,
        AppShellProps,
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
        select?: SelectProps;
        skeleton?: SkeletonProps;
        textarea?: TextareaProps;
        toggle?: ToggleProps;
        tooltip?: TooltipProps;
        appBar?: AppBarProps;
        bottomTabBar?: BottomTabBarProps;
        appShell?: AppShellProps;
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
        button = {},
        card = {},
        checkbox = {},
        heading = {},
        input = {},
        modal = {},
        progress = {},
        rating = {},
        segmentedControl = { options: [] },
        select = {},
        skeleton = {},
        textarea = {},
        toggle = {},
        tooltip = {},
        appBar = {},
        bottomTabBar = { items: [] },
        appShell = {},
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
<Button {...button} />
<Card {...card} />
<Checkbox {...checkbox} />
<Heading {...heading} />
<Input {...input} />
<Modal {...modal} />
<Progress {...progress} />
<Rating {...rating} />
<SegmentedControl {...segmentedControl} />
<Select {...select} />
<Skeleton {...skeleton} />
<Textarea {...textarea} />
<Toggle {...toggle} />
<Tooltip {...tooltip} />
<AppBar {...appBar} />
<BottomTabBar {...bottomTabBar} />
<AppShell {...appShell} />
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
