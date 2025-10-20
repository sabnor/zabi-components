import { y as attributes, z as stringify, F as attr, G as attr_class, J as clsx, x as head, K as ensure_array_like } from "../../chunks/index.js";
import { g as goto } from "../../chunks/client.js";
import { B as Button, N as Navigation, T as ThemeToggle, C as Card } from "../../chunks/Card.js";
import { g as generateId, I as Input, B as Badge, C as ComponentDemo, A as Alert } from "../../chunks/Badge.js";
import { e as escape_html } from "../../chunks/context.js";
function Form($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      method = "post",
      action = "",
      className = "",
      onsubmit,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<form${attributes({
      method,
      action,
      class: `space-y-4 ${stringify(className)}`,
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></form>`);
  });
}
function getInputVariantClasses(variant) {
  const variantMap = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
    info: "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
  };
  return variantMap[variant] || variantMap.default;
}
function Textarea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      name = "",
      label = "",
      placeholder = "",
      disabled = false,
      rows = 4,
      size = "md",
      variant = "default",
      oninput,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let textareaId = generateId("textarea");
    let sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    };
    let variantClass = getInputVariantClasses(variant);
    let textareaClasses = [
      "w-full rounded-md transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
      "resize-y",
      sizeClasses[size],
      variantClass
    ].join(" ");
    let labelClasses = "block text-sm font-medium text-primary mb-1";
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", textareaId)}${attr_class(clsx(labelClasses))}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <textarea${attributes({
      id: textareaId,
      name,
      placeholder,
      disabled,
      rows,
      class: clsx(textareaClasses),
      ...restProps
    })}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div>`);
  });
}
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      checked = false,
      name = "",
      disabled = false,
      label = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let checkboxId = "";
    let checkboxClasses = [
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
      "focus:ring-blue-500 focus:ring-2",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ].join(" ");
    $$renderer2.push(`<div class="flex items-center gap-2"><input${attributes(
      {
        type: "checkbox",
        id: checkboxId,
        name,
        checked,
        disabled,
        class: clsx(checkboxClasses),
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", checkboxId)} class="text-sm font-medium cursor-pointer">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function ContactForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { className = "", children, $$slots, $$events, ...restProps } = $$props;
    let formData = { name: "", email: "", message: "", subscribe: false };
    function handleFormSubmit(event) {
      const formData2 = new FormData(event.target);
      const data = {
        name: formData2.get("name") || "",
        email: formData2.get("email") || "",
        message: formData2.get("message") || "",
        subscribe: formData2.get("subscribe") === "on" || false
      };
      console.log("Form submitted with data:", data);
    }
    $$renderer2.push(`<div${attr_class(`max-w-md mx-auto ${stringify(className)}`)}><div class="mb-6"><h2 class="text-2xl font-bold text-text mb-2">Get in Touch</h2> <p class="text-text-secondary">We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.</p></div> `);
    Form($$renderer2, {
      onsubmit: handleFormSubmit,
      className: "space-y-4",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="space-y-4">`);
        Input($$renderer3, {
          type: "text",
          name: "name",
          label: "Name",
          placeholder: "Enter your name",
          value: formData.name,
          oninput: (e) => formData.name = e.target.value
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          type: "email",
          name: "email",
          label: "Email",
          placeholder: "Enter your email",
          value: formData.email,
          oninput: (e) => formData.email = e.target.value
        });
        $$renderer3.push(`<!----> `);
        Textarea($$renderer3, {
          name: "message",
          label: "Message",
          placeholder: "Enter your message",
          rows: 4,
          value: formData.message,
          oninput: (e) => formData.message = e.target.value
        });
        $$renderer3.push(`<!----> `);
        Checkbox($$renderer3, {
          name: "subscribe",
          label: "Subscribe to updates",
          checked: formData.subscribe,
          onchange: (e) => formData.subscribe = e.target.checked
        });
        $$renderer3.push(`<!----></div> <div class="pt-4">`);
        Button($$renderer3, {
          type: "submit",
          variant: "primary",
          size: "md",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Send Message`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div>`);
  });
}
function FeatureCard($$renderer, $$props) {
  let {
    icon = "✨",
    title,
    description,
    className = "",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<div${attributes({
    class: `p-6 rounded-lg bg-surface border border-border hover:border-primary/20 hover:shadow-sm transition-colors duration-200 ${stringify(className)}`,
    ...restProps
  })}><div class="flex items-start gap-4"><div class="flex-shrink-0 text-2xl" aria-hidden="true">${escape_html(icon)}</div> <div class="flex-1 min-w-0"><h3 class="text-lg font-semibold text-text mb-2">${escape_html(title)}</h3> <p class="text-text-secondary leading-relaxed">${escape_html(description)}</p></div></div></div>`);
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
        icon: "🎯",
        title: "TypeScript First",
        description: "Full TypeScript support with comprehensive type definitions and excellent IDE experience."
      },
      {
        icon: "🎨",
        title: "Semantic Colors",
        description: "Built-in semantic color system with automatic dark mode support and consistent theming."
      },
      {
        icon: "🌙",
        title: "Dark Mode Ready",
        description: "Automatic dark mode switching with CSS custom properties and seamless theme transitions."
      },
      {
        icon: "♿",
        title: "Accessibility First",
        description: "ARIA compliant components with keyboard navigation support and screen reader compatibility."
      },
      {
        icon: "📱",
        title: "Responsive Design",
        description: "Mobile-first approach with responsive utilities and adaptive layouts for all screen sizes."
      },
      {
        icon: "🧩",
        title: "Clean API",
        description: "Simple, intuitive component APIs with minimal props and maximum flexibility."
      }
    ];
    function handleFormSubmit(event) {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      console.log("Form submitted:", data);
    }
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Zabi Components - Clean &amp; Simple</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Clean, minimal Svelte 5 components that just work"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-background"><header class="flex items-center justify-between p-4 bg-surface border-b border-border"><h1 class="text-xl font-bold text-text">Zabi Components</h1> <div class="flex items-center gap-4">`);
    Navigation($$renderer2, { variant: "header", items: navItems });
    $$renderer2.push(`<!----> `);
    ThemeToggle($$renderer2, {});
    $$renderer2.push(`<!----></div></header> <main class="container mx-auto p-6 space-y-16"><section class="py-20 px-4 text-center"><div class="max-w-4xl mx-auto"><h1 class="text-5xl md:text-6xl font-bold text-text mb-6">Zabi Components</h1> <p class="text-xl md:text-2xl text-text-secondary mb-8">Clean, minimal Svelte 5 components that just work</p> <p class="text-lg text-text-secondary/80 max-w-2xl mx-auto mb-12">Build beautiful, accessible user interfaces with our
                    carefully crafted component library. Less is more.</p> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">`);
    Button($$renderer2, {
      variant: "primary",
      size: "lg",
      onclick: () => goto(),
      className: "px-8 py-3",
      text: "Get Started"
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "secondary",
      size: "lg",
      onclick: () => goto(),
      className: "px-8 py-3",
      text: "View Components"
    });
    $$renderer2.push(`<!----></div> <div class="mt-8 flex justify-center">`);
    Badge($$renderer2, {
      variant: "info",
      className: "text-sm",
      text: "v4.0.0 - Svelte 5 Ready"
    });
    $$renderer2.push(`<!----></div></div></section> <section class="py-16"><div class="text-center mb-12"><h2 class="text-3xl font-bold text-text mb-4">Why Choose Zabi Components?</h2> <p class="text-lg text-text-secondary max-w-2xl mx-auto">Built with modern web standards and developer experience in
                    mind</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
    const each_array = ensure_array_like(features);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let feature = each_array[$$index];
      FeatureCard($$renderer2, {
        icon: feature.icon,
        title: feature.title,
        description: feature.description
      });
    }
    $$renderer2.push(`<!--]--></div></section> <section class="py-16"><div class="text-center mb-12"><h2 class="text-3xl font-bold text-text mb-4">See It In Action</h2> <p class="text-lg text-text-secondary max-w-2xl mx-auto">Interactive examples of our most popular components</p></div> <div class="space-y-8">`);
    ComponentDemo($$renderer2, {
      title: "Button Component",
      description: "Clean, accessible buttons with multiple variants and sizes",
      code: `<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary" size="md">Secondary Button</Button>
<Button variant="danger" size="sm">Danger Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="brand">Brand Button</Button>`,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex flex-wrap gap-4 items-center">`);
        Button($$renderer3, { variant: "primary", size: "lg", text: "Primary" });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, { variant: "secondary", size: "md", text: "Secondary" });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, { variant: "danger", size: "sm", text: "Danger" });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, { variant: "ghost", text: "Ghost" });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, { variant: "brand", text: "Brand" });
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
        $$renderer3.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        Card($$renderer3, {
          title: "Default Card",
          variant: "default",
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-text-secondary">This is a default card with clean styling.</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card($$renderer3, {
          title: "Success Card",
          variant: "success",
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-text-secondary">This card indicates a successful action.</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card($$renderer3, {
          title: "Warning Card",
          variant: "warning",
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-text-secondary">This card shows a warning state.</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card($$renderer3, {
          title: "Error Card",
          variant: "error",
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-text-secondary">This card indicates an error state.</p>`);
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
        $$renderer3.push(`<div class="space-y-4 max-w-md">`);
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
        $$renderer3.push(`<div class="space-y-4">`);
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
    $$renderer2.push(`<!----></div> <div class="text-center mt-12">`);
    Button($$renderer2, {
      variant: "primary",
      size: "lg",
      onclick: () => goto(),
      className: "px-8 py-3",
      text: "View All Components"
    });
    $$renderer2.push(`<!----></div></section> <section class="py-16"><div class="text-center mb-12"><h2 class="text-3xl font-bold text-text mb-4">Get In Touch</h2> <p class="text-lg text-text-secondary max-w-2xl mx-auto">Have questions or feedback? We'd love to hear from you.</p></div> `);
    ContactForm($$renderer2, { onsubmit: handleFormSubmit });
    $$renderer2.push(`<!----></section></main> <footer class="bg-surface-secondary border-t border-border py-8"><div class="container mx-auto px-6"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><div class="text-center md:text-left"><p class="text-text-secondary mb-2">Clean components that just work. Less is more.</p> <p class="text-sm text-text-secondary/80">© 2024 Zabi Components. MIT License.</p></div> <div class="flex gap-6"><a href="/docs" class="text-text-secondary hover:text-text transition-colors">Docs</a> <a href="/components" class="text-text-secondary hover:text-text transition-colors">Components</a> <a href="https://github.com" class="text-text-secondary hover:text-text transition-colors">GitHub</a></div></div></div></footer></div>`);
  });
}
export {
  _page as default
};
