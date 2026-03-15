import { w as attr, x as attributes, y as attr_style, z as stringify, F as attr_class, G as clsx, v as head, J as ensure_array_like } from "../../chunks/index.js";
import { g as goto } from "../../chunks/client.js";
import { N as Navigation, T as ThemeToggle, B as Button, C as Card } from "../../chunks/CodeBlock.svelte_svelte_type_style_lang.js";
import { g as generateId, C as ComponentDemo, I as Input, A as Alert, B as Badge, a as Checkbox, S as Select, T as Textarea, b as Tabs, M as Modal, D as Dropdown, c as Tooltip, d as Skeleton, e as ContactForm } from "../../chunks/Skeleton.js";
import { e as escape_html } from "../../chunks/context.js";
function Progress($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = 0,
      max = 100,
      size = "md",
      label = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const progressId = generateId("progress");
    let percentage = Math.min(Math.max(value / max * 100, 0), 100);
    let sizeClasses = { sm: "h-1", md: "h-2", lg: "h-3" };
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex justify-between items-center mb-2"><label${attr("for", progressId)} class="text-sm font-medium text-label">${escape_html(label)}</label> <span class="text-sm text-caption">${escape_html(Math.round(percentage))}%</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attributes({
      id: progressId,
      class: `w-full bg-input rounded-full overflow-hidden ${stringify(sizeClasses[size])}`,
      role: "progressbar",
      "aria-valuenow": value,
      "aria-valuemin": "0",
      "aria-valuemax": max,
      ...restProps
    })}><div class="h-full bg-brand-600 rounded-full"${attr_style(`width: ${stringify(percentage)}%`)}></div></div></div>`);
  });
}
function Toggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      checked = false,
      disabled = false,
      label = "",
      onclick,
      onchange,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const toggleId = generateId("toggle");
    const toggleButtonClasses = () => [
      "relative inline-flex w-10 h-6 flex-shrink-0 cursor-pointer rounded-full border-0 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
      checked ? "bg-action-primary" : "bg-base-400",
      disabled && "opacity-50 cursor-not-allowed"
    ].filter(Boolean).join(" ");
    const toggleThumbClasses = () => {
      const baseClasses = "pointer-events-none absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card transition-transform duration-200 ease-in-out";
      const positionClasses = checked ? "translate-x-4" : "translate-x-0";
      return `${baseClasses} ${positionClasses}`.trim();
    };
    $$renderer2.push(`<div class="flex items-center gap-3"><button type="button" role="switch"${attr("id", toggleId)}${attr("aria-checked", checked)}${attr("aria-label", label || "Toggle")}${attr("disabled", disabled, true)}${attr_class(clsx(toggleButtonClasses()))}><span${attr_class(clsx(toggleThumbClasses()))}></span></button> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", toggleId)} class="text-sm font-medium text-label cursor-pointer">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const navItems = [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com" }
    ];
    const features = [
      {
        icon: "⚡",
        title: "Svelte & Tailwind",
        description: "Built with Svelte 5 runes and Tailwind CSS. Modern, fast, and easy to customize."
      },
      {
        icon: "🎯",
        title: "Easy to Use",
        description: "Simple APIs with minimal props. Get started in minutes, not hours."
      },
      {
        icon: "🎨",
        title: "Beautiful Design",
        description: "Carefully crafted components with semantic colors and automatic dark mode support."
      },
      {
        icon: "♿",
        title: "Accessible",
        description: "WCAG 2.1 AA compliant with full keyboard navigation and screen reader support."
      },
      {
        icon: "📦",
        title: "Lightweight",
        description: "60-80% less code than traditional libraries. Import only what you need."
      },
      {
        icon: "🛡️",
        title: "SSR Safe",
        description: "100% server-side rendering compatible with zero runtime errors."
      }
    ];
    let checkboxChecked = false;
    let selectValue = void 0;
    let textareaValue = "";
    let progressValue = 45;
    let toggleChecked = false;
    let modalOpen = false;
    let dropdownOpen = false;
    let activeTab = "tab1";
    const selectOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ];
    const tabsData = [
      { id: "tab1", label: "Overview" },
      { id: "tab2", label: "Features" },
      { id: "tab3", label: "Documentation" }
    ];
    function handleFormSubmit(event) {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      console.log("Form submitted:", data);
    }
    function openModal() {
      modalOpen = true;
    }
    function closeModal() {
      modalOpen = false;
    }
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Zabi Components - Easy-to-Use Design System</title>`);
      });
      $$renderer3.push(`<meta name="description" content="An easy-to-use design system built with Svelte and Tailwind CSS. Beautiful, accessible components that just work."/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-background"><header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"><div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"><h1 class="text-xl font-bold text-headline">Zabi Components</h1> <div class="flex items-center gap-4">`);
    Navigation($$renderer2, { variant: "header", items: navItems });
    $$renderer2.push(`<!----> `);
    ThemeToggle($$renderer2, {});
    $$renderer2.push(`<!----></div></div></header> <main class="container mx-auto px-4 sm:px-6 lg:px-8"><section class="py-24 sm:py-32"><div class="mx-auto max-w-4xl text-center"><div class="mb-8 inline-flex items-center rounded-full border border-border bg-base-50 px-4 py-2 text-sm text-description"><span class="mr-2">⚡</span> <span>Built with Svelte 5 &amp; Tailwind CSS</span></div> <h1 class="text-5xl font-bold tracking-tight text-headline sm:text-6xl md:text-7xl mb-6">Your Easy-to-Use <span class="text-brand-700">Design System</span></h1> <p class="text-xl text-description mb-8 sm:text-2xl">Beautifully designed components built with Svelte and
                    Tailwind CSS. Simple, accessible, and ready to use.</p> <p class="text-lg text-description/80 mb-12">Get started in minutes with clean, minimal components that
                    just work. Less is more.</p> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">`);
    Button($$renderer2, {
      variant: "primary",
      size: "lg",
      onclick: () => goto(),
      text: "Get Started"
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      size: "lg",
      onclick: () => goto(),
      text: "View Components"
    });
    $$renderer2.push(`<!----></div> <div class="flex flex-wrap justify-center gap-6 text-sm text-description"><div class="flex items-center gap-2"><span class="text-brand-600">✓</span> <span>TypeScript</span></div> <div class="flex items-center gap-2"><span class="text-brand-600">✓</span> <span>Accessible</span></div> <div class="flex items-center gap-2"><span class="text-brand-600">✓</span> <span>SSR Safe</span></div> <div class="flex items-center gap-2"><span class="text-brand-600">✓</span> <span>Dark Mode</span></div></div></div></section> <section class="py-24 border-t border-border"><div class="mx-auto max-w-6xl"><div class="text-center mb-16"><h2 class="text-3xl font-bold text-headline mb-4 sm:text-4xl">Why Choose Zabi Components?</h2> <p class="text-lg text-description">An easy-to-use design system built with Svelte and
                        Tailwind CSS</p></div> <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
    const each_array = ensure_array_like(features);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let feature = each_array[$$index];
      Card($$renderer2, {
        variant: "flat",
        size: "md",
        fullWidth: true,
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="flex items-start gap-4"><div class="text-3xl flex-shrink-0" aria-hidden="true">${escape_html(feature.icon)}</div> <div><h3 class="text-xl font-semibold text-headline mb-2">${escape_html(feature.title)}</h3> <p class="text-description leading-relaxed">${escape_html(feature.description)}</p></div></div>`);
        },
        $$slots: { default: true }
      });
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="py-24 border-t border-border"><div class="mx-auto max-w-7xl"><div class="text-center mb-16"><h2 class="text-3xl font-bold text-headline mb-4 sm:text-4xl">Components</h2> <p class="text-lg text-description">Interactive examples of our most popular components</p></div> <div class="space-y-8">`);
    ComponentDemo($$renderer2, {
      title: "Button Component",
      description: "Clean, accessible buttons with multiple variants and sizes",
      code: `<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary" size="md">Secondary Button</Button>
<Button variant="danger" size="sm">Danger Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="brand">Brand Button</Button>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full flex flex-wrap gap-4 items-center justify-center">`);
        Button($$renderer3, { variant: "primary", size: "lg", text: "Primary" });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, { variant: "secondary", size: "md", text: "Secondary" });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, { variant: "danger", size: "sm", text: "Danger" });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, { variant: "ghost", text: "Ghost" });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, { variant: "primary", text: "Primary" });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Card Component",
      description: "Flexible card containers with semantic color variants",
      code: `<Card title="Default Card" variant="default">
  This is a default card with clean styling.
</Card>

<Card title="Success Card" variant="success">
  This card indicates a successful action.
</Card>

<Card title="Warning Card" variant="warning">
  This card shows a warning state.
</Card>

<Card title="Error Card" variant="error">
  This card indicates an error state.
</Card>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">`);
        Card($$renderer3, {
          title: "Default Card",
          fullWidth: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-description">This is a default card with clean styling.</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card($$renderer3, {
          title: "Success Card",
          fullWidth: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-description">This card indicates a successful action.</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card($$renderer3, {
          title: "Warning Card",
          fullWidth: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-description">This card shows a warning state.</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card($$renderer3, {
          title: "Error Card",
          fullWidth: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-description">This card indicates an error state.</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Input Component",
      description: "Form inputs with labels, variants, and accessibility features",
      code: `<Input 
  label="Name" 
  placeholder="Enter your name" 
  variant="default"
/>

<Input 
  label="Email" 
  type="email" 
  placeholder="Enter your email" 
  variant="success"
/>

<Input 
  label="Password" 
  type="password" 
  placeholder="Enter your password" 
  variant="warning"
/>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="space-y-4 max-w-md min-w-[250px]">`);
        Input($$renderer3, {
          label: "Name",
          placeholder: "Enter your name",
          variant: "default"
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          variant: "success"
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          variant: "warning"
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Alert Component",
      description: "Contextual alerts with different variants and optional close functionality",
      code: `<Alert variant="info" title="Info Alert" message="This is an informational message." />

<Alert variant="success" title="Success!" message="Your action was completed successfully." />

<Alert variant="warning" title="Warning" message="Please review your input before proceeding." />

<Alert variant="error" title="Error" message="Something went wrong. Please try again." />`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full space-y-4">`);
        Alert($$renderer3, {
          variant: "info",
          title: "Info Alert",
          message: "This is an informational message."
        });
        $$renderer3.push(`<!----> `);
        Alert($$renderer3, {
          variant: "success",
          title: "Success!",
          message: "Your action was completed successfully."
        });
        $$renderer3.push(`<!----> `);
        Alert($$renderer3, {
          variant: "warning",
          title: "Warning",
          message: "Please review your input before proceeding."
        });
        $$renderer3.push(`<!----> `);
        Alert($$renderer3, {
          variant: "error",
          title: "Error",
          message: "Something went wrong. Please try again."
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Badge Component",
      description: "Status badges with multiple variants and sizes",
      code: `<Badge variant="default" text="Default" />
<Badge variant="success" text="Success" />
<Badge variant="warning" text="Warning" />
<Badge variant="error" text="Error" />
<Badge variant="info" text="Info" />
<Badge variant="neutral" text="Neutral" />
<Badge variant="energetic" text="Energetic" />

<!-- Sizes -->
<Badge variant="success" size="sm" text="Small" />
<Badge variant="success" size="md" text="Medium" />
<Badge variant="success" size="lg" text="Large" />`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full space-y-4"><div class="flex flex-wrap gap-3 items-center">`);
        Badge($$renderer3, { variant: "default", text: "Default" });
        $$renderer3.push(`<!----> `);
        Badge($$renderer3, { variant: "success", text: "Success" });
        $$renderer3.push(`<!----> `);
        Badge($$renderer3, { variant: "warning", text: "Warning" });
        $$renderer3.push(`<!----> `);
        Badge($$renderer3, { variant: "error", text: "Error" });
        $$renderer3.push(`<!----> `);
        Badge($$renderer3, { variant: "info", text: "Info" });
        $$renderer3.push(`<!----> `);
        Badge($$renderer3, { variant: "neutral", text: "Neutral" });
        $$renderer3.push(`<!----> `);
        Badge($$renderer3, { variant: "energetic", text: "Energetic" });
        $$renderer3.push(`<!----></div> <div class="flex flex-wrap gap-3 items-center">`);
        Badge($$renderer3, { variant: "success", size: "sm", text: "Small" });
        $$renderer3.push(`<!----> `);
        Badge($$renderer3, { variant: "success", size: "md", text: "Medium" });
        $$renderer3.push(`<!----> `);
        Badge($$renderer3, { variant: "success", size: "lg", text: "Large" });
        $$renderer3.push(`<!----></div></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Checkbox Component",
      description: "Accessible checkboxes with labels and disabled states",
      code: `<Checkbox label="Accept terms and conditions" checked={checked} />

<Checkbox label="Subscribe to newsletter" checked={false} />

<Checkbox label="Disabled checkbox" checked={true} disabled={true} />`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full space-y-4">`);
        Checkbox($$renderer3, {
          label: "Accept terms and conditions",
          checked: checkboxChecked,
          onchange: (e) => {
            checkboxChecked = e.target.checked;
          }
        });
        $$renderer3.push(`<!----> `);
        Checkbox($$renderer3, { label: "Subscribe to newsletter" });
        $$renderer3.push(`<!----> `);
        Checkbox($$renderer3, { label: "Disabled checkbox", checked: true, disabled: true });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Select Component",
      description: "Dropdown selects with variants and validation states",
      code: `<Select 
  label="Choose an option" 
  options={options} 
  value={value}
  placeholder="Select..."
/>

<Select 
  label="Success state" 
  options={options} 
  variant="success"
  message="Selection is valid"
/>

<Select 
  label="Error state" 
  options={options} 
  variant="error"
  message="Please select an option"
/>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="space-y-4 max-w-md min-w-[250px]">`);
        Select($$renderer3, {
          label: "Choose an option",
          options: selectOptions,
          value: selectValue,
          placeholder: "Select an option...",
          onchange: (e) => {
            selectValue = e.target.value;
          }
        });
        $$renderer3.push(`<!----> `);
        Select($$renderer3, {
          label: "Success state",
          options: selectOptions,
          variant: "success",
          message: "Selection is valid",
          value: "option1"
        });
        $$renderer3.push(`<!----> `);
        Select($$renderer3, {
          label: "Error state",
          options: selectOptions,
          variant: "error",
          message: "Please select an option"
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Textarea Component",
      description: "Multi-line text inputs with variants and validation",
      code: `<Textarea 
  label="Message" 
  placeholder="Enter your message..."
  rows={4}
/>

<Textarea 
  label="Success state" 
  variant="success"
  message="Message is valid"
  rows={4}
/>

<Textarea 
  label="Error state" 
  variant="error"
  message="Please enter a message"
  rows={4}
/>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="space-y-4 max-w-md min-w-[250px]">`);
        Textarea($$renderer3, {
          label: "Message",
          placeholder: "Enter your message...",
          rows: 4,
          value: textareaValue,
          oninput: (e) => {
            textareaValue = e.target.value;
          }
        });
        $$renderer3.push(`<!----> `);
        Textarea($$renderer3, {
          label: "Success state",
          variant: "success",
          message: "Message is valid",
          rows: 4,
          value: "This is a valid message"
        });
        $$renderer3.push(`<!----> `);
        Textarea($$renderer3, {
          label: "Error state",
          variant: "error",
          message: "Please enter a message",
          rows: 4
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Progress Component",
      description: "Progress bars with different sizes and labels",
      code: `<Progress value={45} max={100} label="Loading" />

<Progress value={75} max={100} size="sm" />

<Progress value={90} max={100} size="lg" label="Upload Progress" />`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full space-y-6 max-w-md min-w-[250px]">`);
        Progress($$renderer3, { value: progressValue, max: 100, label: "Loading" });
        $$renderer3.push(`<!----> `);
        Progress($$renderer3, { value: 75, max: 100, size: "sm" });
        $$renderer3.push(`<!----> `);
        Progress($$renderer3, { value: 90, max: 100, size: "lg", label: "Upload Progress" });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Toggle Component",
      description: "Switch toggles for boolean settings",
      code: `<Toggle label="Enable notifications" checked={checked} />

<Toggle label="Dark mode" checked={true} />

<Toggle label="Disabled toggle" checked={false} disabled={true} />`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full space-y-4">`);
        Toggle($$renderer3, {
          label: "Enable notifications",
          checked: toggleChecked,
          onchange: (e) => {
            toggleChecked = e.checked;
          }
        });
        $$renderer3.push(`<!----> `);
        Toggle($$renderer3, { label: "Dark mode", checked: true });
        $$renderer3.push(`<!----> `);
        Toggle($$renderer3, { label: "Disabled toggle", checked: false, disabled: true });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Tabs Component",
      description: "Tabbed interfaces with keyboard navigation",
      code: `<Tabs tabs={tabs} activeTab={activeTab}>
  {#snippet children({ activeTab })}
    {#if activeTab === 'tab1'}
      <p>Tab 1 content</p>
    {:else if activeTab === 'tab2'}
      <p>Tab 2 content</p>
    {:else if activeTab === 'tab3'}
      <p>Tab 3 content</p>
    {/if}
  {/snippet}
</Tabs>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full">`);
        {
          let children = function($$renderer4, { activeTab: activeTab2 }) {
            if (activeTab2 === "tab1") {
              $$renderer4.push("<!--[-->");
              Card($$renderer4, {
                size: "sm",
                fullWidth: true,
                children: ($$renderer5) => {
                  $$renderer5.push(`<p class="text-body">This is the overview tab
                                                content. Tabs provide a clean
                                                way to organize content.</p>`);
                },
                $$slots: { default: true }
              });
            } else {
              $$renderer4.push("<!--[!-->");
              if (activeTab2 === "tab2") {
                $$renderer4.push("<!--[-->");
                Card($$renderer4, {
                  size: "sm",
                  fullWidth: true,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<p class="text-body">Features tab content. Navigate
                                                between tabs using arrow keys
                                                for accessibility.</p>`);
                  },
                  $$slots: { default: true }
                });
              } else {
                $$renderer4.push("<!--[!-->");
                if (activeTab2 === "tab3") {
                  $$renderer4.push("<!--[-->");
                  Card($$renderer4, {
                    size: "sm",
                    fullWidth: true,
                    children: ($$renderer5) => {
                      $$renderer5.push(`<p class="text-body">Documentation tab content. All
                                                tabs support keyboard
                                                navigation.</p>`);
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]-->`);
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]-->`);
          };
          Tabs($$renderer3, {
            tabs: tabsData,
            activeTab,
            children,
            $$slots: { default: true }
          });
        }
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Modal Component",
      description: "Modal dialogs with different sizes and footer support",
      code: `<Button onclick={() => modalOpen = true} text="Open Modal" />

<Modal isOpen={modalOpen} title="Example Modal" size="md">
  <p>Modal content goes here</p>
  
  {#snippet footer()}
    <Button variant="secondary" onclick={() => modalOpen = false} text="Cancel" />
    <Button variant="primary" onclick={() => modalOpen = false} text="Confirm" />
  {/snippet}
</Modal>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full flex justify-center">`);
        Button($$renderer3, { variant: "primary", onclick: openModal, text: "Open Modal" });
        $$renderer3.push(`<!----> `);
        {
          let footer = function($$renderer4) {
            Button($$renderer4, { variant: "secondary", onclick: closeModal, text: "Cancel" });
            $$renderer4.push(`<!----> `);
            Button($$renderer4, { variant: "primary", onclick: closeModal, text: "Confirm" });
            $$renderer4.push(`<!---->`);
          };
          Modal($$renderer3, {
            isOpen: modalOpen,
            title: "Example Modal",
            size: "md",
            onclick: closeModal,
            footer,
            children: ($$renderer4) => {
              $$renderer4.push(`<p class="text-body mb-4">This is a modal dialog. Click outside or
                                    press Escape to close it. Modals are great
                                    for confirmations, forms, or additional
                                    content.</p>`);
            },
            $$slots: { footer: true, default: true }
          });
        }
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Dropdown Component",
      description: "Dropdown menus with flexible positioning",
      code: `<Dropdown isOpen={isOpen} placement="bottom-start">
  {#snippet trigger()}
    <Button onclick={() => isOpen = !isOpen} text="Open Dropdown" />
  {/snippet}
  
  {#snippet children()}
    <div class="px-2 py-2">
      <button class="w-full text-left px-4 py-2 hover:bg-base-100 rounded-md">Option 1</button>
      <button class="w-full text-left px-4 py-2 hover:bg-base-100 rounded-md">Option 2</button>
      <button class="w-full text-left px-4 py-2 hover:bg-base-100 rounded-md">Option 3</button>
    </div>
  {/snippet}
</Dropdown>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full">`);
        {
          let trigger = function($$renderer4) {
            Button($$renderer4, {
              onclick: () => dropdownOpen = !dropdownOpen,
              text: "Open Dropdown"
            });
          }, children = function($$renderer4) {
            $$renderer4.push(`<div class="px-2 py-2"><button class="w-full text-left px-4 py-2 text-body hover:bg-base-100 rounded-md transition-colors">Option 1</button> <button class="w-full text-left px-4 py-2 text-body hover:bg-base-100 rounded-md transition-colors">Option 2</button> <button class="w-full text-left px-4 py-2 text-body hover:bg-base-100 rounded-md transition-colors">Option 3</button></div>`);
          };
          Dropdown($$renderer3, {
            isOpen: dropdownOpen,
            placement: "bottom-start",
            trigger,
            children,
            $$slots: { trigger: true, default: true }
          });
        }
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Tooltip Component",
      description: "Tooltips with multiple placement options",
      code: `<Tooltip content="This is a tooltip" placement="top">
  <Button text="Hover me" />
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <Button variant="secondary" text="Hover me" />
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <Button variant="ghost" text="Hover me" />
</Tooltip>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full flex flex-wrap gap-4 items-center justify-center">`);
        Tooltip($$renderer3, {
          content: "This is a tooltip",
          placement: "top",
          children: ($$renderer4) => {
            Button($$renderer4, { text: "Hover me" });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Tooltip($$renderer3, {
          content: "Right tooltip",
          placement: "right",
          children: ($$renderer4) => {
            Button($$renderer4, { variant: "secondary", text: "Hover me" });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Tooltip($$renderer3, {
          content: "Bottom tooltip",
          placement: "bottom",
          children: ($$renderer4) => {
            Button($$renderer4, { variant: "ghost", text: "Hover me" });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Tooltip($$renderer3, {
          content: "Left tooltip",
          placement: "left",
          children: ($$renderer4) => {
            Button($$renderer4, { variant: "primary", text: "Hover me" });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    ComponentDemo($$renderer2, {
      title: "Skeleton Component",
      description: "Loading placeholders with customizable dimensions",
      code: `<Skeleton width="100%" height="1rem" />
<Skeleton width="80%" height="1rem" />
<Skeleton width="60%" height="1rem" />

<!-- Card skeleton -->
<div class="space-y-3">
  <Skeleton width="100%" height="200px" />
  <Skeleton width="100%" height="1rem" />
  <Skeleton width="70%" height="1rem" />
</div>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-full space-y-4"><div class="space-y-2">`);
        Skeleton($$renderer3, { width: "100%", height: "1rem" });
        $$renderer3.push(`<!----> `);
        Skeleton($$renderer3, { width: "80%", height: "1rem" });
        $$renderer3.push(`<!----> `);
        Skeleton($$renderer3, { width: "60%", height: "1rem" });
        $$renderer3.push(`<!----></div> `);
        Card($$renderer3, {
          size: "sm",
          fullWidth: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="space-y-3">`);
            Skeleton($$renderer4, { width: "100%", height: "200px" });
            $$renderer4.push(`<!----> `);
            Skeleton($$renderer4, { width: "100%", height: "1rem" });
            $$renderer4.push(`<!----> `);
            Skeleton($$renderer4, { width: "70%", height: "1rem" });
            $$renderer4.push(`<!----></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="text-center mt-16">`);
    Button($$renderer2, {
      variant: "outline",
      size: "lg",
      onclick: () => goto(),
      text: "View All Components"
    });
    $$renderer2.push(`<!----></div></div></section> <section class="py-24 border-t border-border"><div class="mx-auto"><div class="text-center mb-12"><h2 class="text-3xl font-bold text-headline mb-4 sm:text-4xl">Get In Touch</h2> <p class="text-lg text-description">Have questions or feedback? We'd love to hear from you.</p></div> `);
    Card($$renderer2, {
      variant: "outlined",
      size: "md",
      fullWidth: true,
      children: ($$renderer3) => {
        ContactForm($$renderer3, { onsubmit: handleFormSubmit });
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section></main> <footer class="border-t border-border py-12"><div class="container mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row justify-between items-center gap-6"><div class="text-center md:text-left"><p class="text-description mb-1 font-medium">Zabi Components</p> <p class="text-sm text-description/80">Clean components that just work. Less is more.</p> <p class="text-sm text-description/60 mt-2">© 2024 Zabi Components. MIT License.</p></div> <div class="flex gap-6"><a href="/docs" class="text-sm text-description hover:text-headline transition-colors">Docs</a> <a href="/components" class="text-sm text-description hover:text-headline transition-colors">Components</a> <a href="https://github.com" class="text-sm text-description hover:text-headline transition-colors">GitHub</a></div></div></div></footer></div>`);
  });
}
export {
  _page as default
};
