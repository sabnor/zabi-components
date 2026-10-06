/**
 * The words of the components that come with text of their own: the colour
 * picker, the ready-made contact form, and the two the docs site is built
 * from. Each takes its own as `strings`; what is left out stays as it is here.
 */

/** `ColorPicker`. */
export interface ColorPickerStrings {
    /** Accessible name of the field the hex value is typed in. */
    hexInput: string;
    /** Accessible name of the swatch button that opens the picker. */
    open: string;
    /** Accessible name of the picker that opens. */
    picker: string;
    /** Accessible name of the hue slider in it. */
    hue: string;
    /** Accessible name of the colour map: the two sliders below, on one surface. */
    area: string;
    /** Accessible name of the map's slider that goes across. */
    saturation: string;
    /** Accessible name of the map's slider that goes up and down. */
    lightness: string;
    /** The message under the field while what is typed is not a hex colour. */
    invalidHex: string;
}

export const DEFAULT_COLOR_PICKER_STRINGS: ColorPickerStrings = {
    hexInput: "Hex color input",
    open: "Open color picker",
    picker: "Color picker",
    hue: "Hue slider",
    area: "Saturation and lightness",
    saturation: "Saturation",
    lightness: "Lightness",
    invalidHex: "Please enter a valid hex color (e.g., #ff0000 or #f00)",
};

/** `ContactForm`: every label, placeholder and message of the form. */
export interface ContactFormStrings {
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    subscribeLabel: string;
    submit: string;
    /** Under a field left empty or filled in wrongly. */
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
    /** The box above the fields when the form could not be sent: its three lines. */
    errorTitle: string;
    errorMessage: string;
    errorRecovery: string;
}

export const DEFAULT_CONTACT_FORM_STRINGS: ContactFormStrings = {
    heading: "Get in Touch",
    nameLabel: "Name",
    namePlaceholder: "Enter your name",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    messageLabel: "Message",
    messagePlaceholder: "Enter your message",
    subscribeLabel: "Subscribe to updates",
    submit: "Send Message",
    nameRequired: "Please enter your name.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address.",
    messageRequired: "Please enter a message.",
    errorTitle: "Something went wrong",
    errorMessage: "We could not submit your request. Fix the highlighted fields and try again.",
    errorRecovery: "Recovery action: review your inputs and resubmit.",
};

/** `PropsTable`. The caption is the `caption` prop. */
export interface PropsTableStrings {
    name: string;
    type: string;
    required: string;
    default: string;
    description: string;
    yes: string;
    no: string;
    /** Shown instead of the table when there are no props. */
    empty: string;
}

export const DEFAULT_PROPS_TABLE_STRINGS: PropsTableStrings = {
    name: "Name",
    type: "Type",
    required: "Required",
    default: "Default",
    description: "Description",
    yes: "Yes",
    no: "No",
    empty: "No documented props.",
};

/** `ComponentDemo`. */
export interface ComponentDemoStrings {
    /** The two tabs, and what the switch between them is called. */
    preview: string;
    code: string;
    showPreview: string;
    showCode: string;
}

export const DEFAULT_COMPONENT_DEMO_STRINGS: ComponentDemoStrings = {
    preview: "Preview",
    code: "Code",
    showPreview: "Show preview",
    showCode: "Show code",
};
