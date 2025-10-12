# Migration Guide: v2.0.x → v2.1.x

This guide helps you migrate from Zabi Components v2.0.x to v2.1.x, which includes major changes to event handling for better SSR compatibility and cross-framework support.

## 🚨 Breaking Changes Overview

The main breaking change is the **elimination of `createEventDispatcher`** and the **replacement of two-way binding** with **controlled components** pattern. This makes components:

- ✅ **SSR-safe** (no more hydration errors)
- ✅ **Cross-framework compatible** (works in React, Vue, Svelte, vanilla JS)
- ✅ **Standards compliant** (uses native DOM events)

## 📋 Migration Checklist

- [ ] Update form components to use controlled pattern
- [ ] Replace `bind:value` with `value` prop + event handlers
- [ ] Update event handlers to use native DOM events
- [ ] Test in SSR environment
- [ ] Update TypeScript types if using custom event handlers

## 🔄 Component-by-Component Migration

### Form Components

#### Input Component

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let inputValue = '';
</script>

<Input bind:value={inputValue} label="Name" />
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let inputValue = '';
  
  function handleInput(event: Event) {
    inputValue = (event.target as HTMLInputElement).value;
  }
</script>

<Input 
  value={inputValue} 
  on:input={handleInput} 
  label="Name" 
/>
```

#### Textarea Component

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let message = '';
</script>

<Textarea bind:value={message} label="Message" />
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let message = '';
  
  function handleInput(event: Event) {
    message = (event.target as HTMLTextAreaElement).value;
  }
</script>

<Textarea 
  value={message} 
  on:input={handleInput} 
  label="Message" 
/>
```

#### Select Component

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let selectedValue = '';
</script>

<Select bind:value={selectedValue} options={options} />
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let selectedValue = '';
  
  function handleChange(event: Event) {
    selectedValue = (event.target as HTMLSelectElement).value;
  }
</script>

<Select 
  value={selectedValue} 
  on:change={handleChange} 
  options={options} 
/>
```

#### Checkbox Component

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let isChecked = false;
</script>

<Checkbox bind:checked={isChecked} label="Subscribe" />
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let isChecked = false;
  
  function handleChange(event: Event) {
    isChecked = (event.target as HTMLInputElement).checked;
  }
</script>

<Checkbox 
  checked={isChecked} 
  on:change={handleChange} 
  label="Subscribe" 
/>
```

### Interactive Components

#### Button Component

**Before (v2.0.x):**
```svelte
<Button on:click={handleClick}>Click me</Button>
```

**After (v2.1.x):**
```svelte
<!-- No change needed! Event forwarding works the same -->
<Button on:click={handleClick}>Click me</Button>
```

#### Toggle Component

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let isToggled = false;
</script>

<Toggle bind:checked={isToggled} label="Toggle" />
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let isToggled = false;
  
  function handleClick(event: Event) {
    isToggled = !isToggled;
  }
</script>

<Toggle 
  checked={isToggled} 
  on:click={handleClick} 
  label="Toggle" 
/>
```

### Complex Components

#### Modal Component

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let isOpen = false;
  
  function handleClose() {
    isOpen = false;
  }
</script>

<Modal bind:isOpen on:close={handleClose}>
  Modal content
</Modal>
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let isOpen = false;
  
  function handleClose() {
    isOpen = false;
  }
</script>

<Modal bind:isOpen on:click={handleClose}>
  Modal content
</Modal>
```

#### Tabs Component

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let activeTab = 'tab1';
  
  function handleTabChange(event: CustomEvent) {
    activeTab = event.detail.activeTab;
  }
</script>

<Tabs 
  bind:activeTab 
  tabs={tabs} 
  on:change={handleTabChange} 
/>
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let activeTab = 'tab1';
  
  function handleTabChange(event: Event) {
    // Tab change is handled internally, just update activeTab
    // You can listen to activeTab changes with reactive statements
  }
  
  $: console.log('Active tab changed:', activeTab);
</script>

<Tabs 
  bind:activeTab 
  tabs={tabs} 
/>
```

#### Form Component

**Before (v2.0.x):**
```svelte
<script lang="ts">
  function handleFormSubmit(event: CustomEvent) {
    console.log('Form data:', event.detail.data);
  }
</script>

<Form on:submit={handleFormSubmit}>
  <!-- form content -->
</Form>
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  function handleFormSubmit(event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);
  }
</script>

<Form on:submit={handleFormSubmit}>
  <!-- form content -->
</Form>
```

## 🎯 Common Patterns

### Form with Multiple Fields

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let formData = {
    name: '',
    email: '',
    message: ''
  };
</script>

<Form on:submit={handleSubmit}>
  <Input bind:value={formData.name} label="Name" />
  <Input bind:value={formData.email} label="Email" />
  <Textarea bind:value={formData.message} label="Message" />
</Form>
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let formData = {
    name: '',
    email: '',
    message: ''
  };
  
  function handleNameInput(event: Event) {
    formData.name = (event.target as HTMLInputElement).value;
  }
  
  function handleEmailInput(event: Event) {
    formData.email = (event.target as HTMLInputElement).value;
  }
  
  function handleMessageInput(event: Event) {
    formData.message = (event.target as HTMLTextAreaElement).value;
  }
</script>

<Form on:submit={handleSubmit}>
  <Input 
    value={formData.name} 
    on:input={handleNameInput} 
    label="Name" 
  />
  <Input 
    value={formData.email} 
    on:input={handleEmailInput} 
    label="Email" 
  />
  <Textarea 
    value={formData.message} 
    on:input={handleMessageInput} 
    label="Message" 
  />
</Form>
```

### Dynamic Form Fields

**Before (v2.0.x):**
```svelte
<script lang="ts">
  let fields = [
    { id: 1, value: '' },
    { id: 2, value: '' }
  ];
</script>

{#each fields as field}
  <Input bind:value={field.value} label="Field {field.id}" />
{/each}
```

**After (v2.1.x):**
```svelte
<script lang="ts">
  let fields = [
    { id: 1, value: '' },
    { id: 2, value: '' }
  ];
  
  function handleFieldInput(fieldId: number, event: Event) {
    const field = fields.find(f => f.id === fieldId);
    if (field) {
      field.value = (event.target as HTMLInputElement).value;
    }
  }
</script>

{#each fields as field}
  <Input 
    value={field.value} 
    on:input={(e) => handleFieldInput(field.id, e)} 
    label="Field {field.id}" 
  />
{/each}
```

## 🔧 TypeScript Updates

### Event Handler Types

**Before (v2.0.x):**
```typescript
function handleButtonClick(event: CustomEvent<{ value: boolean; event?: MouseEvent }>) {
  console.log('Button clicked:', event.detail.value);
}
```

**After (v2.1.x):**
```typescript
function handleButtonClick(event: MouseEvent) {
  console.log('Button clicked:', event);
}
```

### Form Event Types

**Before (v2.0.x):**
```typescript
function handleFormSubmit(event: CustomEvent<{ 
  data: Record<string, FormDataEntryValue>; 
  formData: FormData 
}>) {
  console.log('Form data:', event.detail.data);
}
```

**After (v2.1.x):**
```typescript
function handleFormSubmit(event: SubmitEvent) {
  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());
  console.log('Form data:', data);
}
```

## 🚀 Benefits After Migration

### SSR Compatibility
- ✅ No more hydration errors in production builds
- ✅ Components work correctly in SvelteKit SSR
- ✅ Better performance in server-side rendering

### Cross-Framework Support
- ✅ Components work in React applications
- ✅ Compatible with Vue.js projects
- ✅ Works with vanilla JavaScript
- ✅ Maintains full Svelte compatibility

### Standards Compliance
- ✅ Uses native DOM events
- ✅ Follows web standards
- ✅ Better debugging and development experience
- ✅ Reduced bundle size

## 🐛 Troubleshooting

### Common Issues

#### "Cannot read properties of null"
This error was common with `createEventDispatcher` in SSR. It's now fixed with event forwarding.

#### Form data not updating
Make sure you're using the controlled pattern:
```svelte
<!-- ❌ Wrong -->
<Input bind:value={value} />

<!-- ✅ Correct -->
<Input value={value} on:input={(e) => value = e.target.value} />
```

#### Event handlers not working
Ensure you're using native DOM events:
```svelte
<!-- ❌ Wrong -->
<Button on:click={handleClick}>Click</Button>

<!-- ✅ Correct -->
<Button on:click={handleClick}>Click</Button>
```

### Testing Your Migration

1. **Test in SSR environment**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Check for console errors**:
   - Look for hydration errors
   - Check for event handler errors

3. **Test form functionality**:
   - Verify form submission works
   - Check input value updates
   - Test validation

## 📞 Support

If you encounter issues during migration:

1. Check this migration guide
2. Review the updated README.md
3. Open an issue on GitHub with:
   - Your current code
   - Expected behavior
   - Actual behavior
   - Error messages

## 🎉 You're Done!

After completing the migration, you'll have:

- ✅ SSR-safe components
- ✅ Cross-framework compatibility
- ✅ Better performance
- ✅ Standards-compliant event handling
- ✅ Future-proof architecture

Welcome to Zabi Components v2.1.x! 🚀
