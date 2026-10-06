# Keyboard Navigation Guide

This guide documents keyboard navigation patterns and standards for zabi-components.

## Standard Keyboard Patterns

### Basic Navigation

- **Tab**: Move forward through interactive elements
- **Shift + Tab**: Move backward through interactive elements
- **Enter**: Activate buttons, links, and menu items
- **Space**: Activate buttons and checkboxes (when focused)
- **Escape**: Close modals, drawers, sheets, menus and tooltips; only the topmost one

### Arrow Key Navigation

Arrow keys are used for navigation within components that contain multiple related items:

- **Arrow Right / Arrow Down**: Move to next item
- **Arrow Left / Arrow Up**: Move to previous item
- **Home**: Move to first item
- **End**: Move to last item

## Component-Specific Patterns

One section per component, in alphabetical order. Each has the same parts:
the keys, what happens to focus, a usage example and best practices. Every key
listed is implemented; there is no "planned" behaviour in this file.

- [Alert](#alert)
- [AppShell, AppBar and BottomTabBar](#appshell-appbar-and-bottomtabbar)
- [BottomSheet](#bottomsheet)
- [Button](#button)
- [Calendar](#calendar)
- [Card](#card)
- [Collapsible and CollapsibleGroup](#collapsible-and-collapsiblegroup)
- [ConfirmDialog](#confirmdialog)
- [DateField and TimeField](#datefield-and-timefield)
- [Drawer](#drawer)
- [Dropdown](#dropdown)
- [FloatingActionButton](#floatingactionbutton)
- [Input](#input)
- [MediaGrid](#mediagrid)
- [Modal](#modal)
- [Rating](#rating)
- [SegmentedControl](#segmentedcontrol)
- [Select](#select)
- [Slider](#slider)
- [SortableList](#sortablelist)
- [StickyActionBar](#stickyactionbar)
- [Tabs](#tabs)
- [Tooltip](#tooltip)
- [TopNavbar and NavigationMenu](#topnavbar-and-navigationmenu)
- [UnsavedChangesBar](#unsavedchangesbar)

### Alert

**Keyboard support:**
- ✅ **Tab**: Focus the close button (with `closable`)
- ✅ **Enter / Space**: Close the alert (with `closable`)

An alert is not an overlay: Escape does nothing, and it never takes focus
when it appears.

**Usage:**
```svelte
<Alert
    variant="success"
    title="Success"
    message="Operation completed"
    closable={true}
/>
```

**Best Practices:**
- The role follows the variant: `status` for `success` and `info`, `alert` for the others. Both are live regions, so the text is announced when the alert appears
- Use `bind:open` to know when the user has closed it
- Name the close button in the app's language with `closeLabel` (default "Dismiss alert")

---

### AppShell, AppBar and BottomTabBar

**Keyboard support:**
- ✅ **Tab**: Through the AppBar (back, then the actions), then the content, then the tabs, in that order
- ✅ **Enter**: Follow a tab or the back link
- ✅ **Enter / Space**: Activate the back button (when it is `onback` without `backHref`) or an action

The tabs are links in a `<nav>`, not a tablist: there are no arrow keys, and
each tab is a Tab stop. The tab for the current page has `aria-current="page"`.
Following the active tab again is an ordinary navigation to the page you are
on; nothing is deselected.

With `collapseOnScroll` the AppBar slides away while the page scrolls down. It
stays in the tab order while it is away: when focus moves into it, it comes
back, and it never hides while keyboard focus is inside it. Focus left on an
action by a tap or a click does not hold the bar: it hides as the page scrolls
on, the control keeps focus, and the next key press brings the bar back. Under
`prefers-reduced-motion` it changes position without animation.

A count on a tab is part of the name of its link ("Inbox, 3 new"); the wording
comes from `badgeLabel`.

**Usage:**
```svelte
<AppShell>
    {#snippet header()}
        <AppBar title="Quiz" backHref="/" collapseOnScroll />
    {/snippet}
    <div class="p-4">…</div>
    {#snippet footer()}
        <BottomTabBar {items} active={page.url.pathname} />
    {/snippet}
</AppShell>
```

**Best Practices:**
- Use `IconButton` at `size="lg"` for the AppBar's actions, so each is a 48px target, and keep to two
- Keep to three to five tabs with one-word labels. A label is one line: it grows with the text size up to 1.3 times, is cut with an ellipsis when it does not fit its tab, and is not drawn at all where a tab is narrower than 52px (the link keeps its name). The bars keep their height when the text is enlarged
- In SvelteKit pass `active={page.url.pathname}`, so the server renders `aria-current` too. Without `active` the bar reads the address once it runs in the browser
- AppShell scrolls its own middle area, not the window: `scroll-padding-top` there keeps a focused field from landing under the AppBar
- The safe-area insets the shell and its bars keep clear of are zero until the app's viewport meta tag has `viewport-fit=cover` (`<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`). A `Page` inside the shell adds no safe-area padding of its own
- Without AppShell nothing reserves room for the bars. A BottomTabBar on its own is fixed over the page: give the page `padding-bottom` and `scroll-padding-bottom` of the bar's height (`calc(65px + env(safe-area-inset-bottom))` by default), and `scroll-padding-top` for a sticky AppBar, so focus is never hidden under a bar

---

### BottomSheet

**Keyboard support:**
- ✅ **Tab / Shift + Tab**: Move through the controls in the sheet; focus wraps and never reaches the page behind
- ✅ **Escape**: Close the sheet (not when `dismissible` is false)
- ✅ **Enter / Space** on the grip: Move the sheet to its other height
- ✅ **Enter / Space**: Activate the focused control, including the close button

The grip at the top is a real button, named by what it will do: "Expand" while
the sheet is at half height, "Collapse" at full (`expandLabel`,
`collapseLabel`). Dragging it does the same with a pointer, and a drag or flick
down past the lowest height closes the sheet; nothing is only reachable by
dragging. With a single snap point there is nowhere to switch to, so the grip
is not a control and the close button is the first one.

When the sheet opens, focus moves to the control `initialFocus` selects, or to
the first control (the grip, or the close button). When it closes, focus
returns to the element that opened it. The page behind does not scroll while
it is open. It shares the overlay stack and the scroll lock with Modal, SlideUp
and Drawer, so they nest in any order.

A swipe on the content scrolls the content. It moves the sheet only when the
content is at its top and the swipe goes down.

The grip works with a mouse as with a finger: a click steps the sheet, a drag
moves it. A press only becomes a drag once the pointer has moved 6px, so a
click on the grip is a click. How fast a flick was is read from the events'
own time, not from when the page got round to handling them, so a flick on a
busy page is still a flick.

**Usage:**
```svelte
<BottomSheet bind:isOpen={open} bind:snap title="Filters">
    …
    {#snippet footer()}
        <Button size="lg" onclick={apply}>Show results</Button>
    {/snippet}
</BottomSheet>
```

**Best Practices:**
- Give the sheet a `footer` for its main button: it stays in view at half height, clear of the home indicator
- Keep `dismissible` true unless the sheet holds a step that must be finished; the grip still works when it is false
- Use buttons of `size="lg"` inside it on a phone, so each is a 48px target
- SlideUp with `swipeToClose` is the simpler sheet: one height, a decorative grip, swipe down to close. It takes a `footer` too: the content then scrolls and the buttons stay, above the on-screen keyboard and clear of a toast

---

### Button

**Keyboard support:**
- ✅ **Enter**: Activates the button
- ✅ **Space**: Activates the button (when focused)
- ✅ **Tab**: Receives focus
- ✅ **Shift + Tab**: Loses focus

With `href` a Button or an IconButton is a real link (`<a>`), so the keys are a
link's: **Enter** follows it, and Space does not. While `disabled` or `loading`
such a link has no `href`: it is read as an unavailable link (`aria-disabled`)
and does nothing when pressed. A `disabled` one is not a Tab stop, as a
disabled button is not.

A `loading` Button or IconButton, link or not, stays a Tab stop and keeps
focus: it is `aria-disabled="true"` and `aria-busy="true"` instead of
`disabled`, and Enter, Space and a click do nothing until it has loaded. A
loading submit button does not submit its form, also not through Enter in one
of the form's fields.
`variant="link"` with `href` is a text link inside its sentence.

**Usage:**
```svelte
<Button onclick={handleClick}>Click me</Button>
<Button href="/login">Log in</Button>
```

**Best Practices:**
- Buttons should always be keyboard accessible
- Focus styles must be visible
- Disabled buttons should not receive focus
- For navigation pass `href`: a button with an `onclick` that navigates cannot be opened in a new tab

---

### Calendar

**Keyboard support:**
- ✅ **Tab**: To the previous and next buttons, then to one day in the grid, then on: the grid is one Tab stop
- ✅ **Arrow Left / Right**: The day before / after (swapped in a right-to-left page)
- ✅ **Arrow Up / Down**: The same weekday a week before / after
- ✅ **Home / End**: The first / last day of the week
- ✅ **Page Up / Page Down**: The same day a month before / after
- ✅ **Shift + Page Up / Page Down**: The same day a year before / after
- ✅ **Enter / Space**: Select the focused day

Moving past the first or last day of the month changes the month and keeps
focus on the day arrived at. A day the target month does not have becomes its
last one (31 October, Page Down: 30 November). The keys stop at `min` and
`max`. Moving does not select.

The day that takes Tab is the one the keyboard was last on; before that, the
selected day, else today, else the first day that can be selected.

It is an ARIA grid (`role="grid"` on a table) named by the month title. The
title is a polite live region, so a change of month is announced whether it
comes from a button or from the keys. Each day is a button in a grid cell. Its
name is the full date, then what is true of it, then its events: "Tuesday, 6
October 2026, today, selected, 2 events: Quiz at The Crown, Music quiz". The
selected cell also has `aria-selected`, and today `aria-current="date"`. A day
that cannot be selected is `aria-disabled` and says "unavailable": it can
still be focused and read. The same goes for a month button with nowhere to
go, so focus is never dropped. All of these words come from `strings`.

Pressing the selected day again does nothing: the selection is never cleared.

**Usage:**
```svelte
<Calendar bind:month bind:selected {events} locale="sv" strings={swedish} />
```

**Best Practices:**
- List the selected day's events under the grid; the dots only say that there are some
- Pass `locale`, and translate `strings` with it: the date names come from the locale, the added words from `strings`
- Do not rely on a dot's colour: a tone is decoration, and the event's label is what is read out

---

### Card

**Keyboard support** (a card with `onclick`):
- ✅ **Tab**: Focus the card
- ✅ **Enter / Space**: Call `onclick`

A card with `onclick` gets `role="button"`, `tabindex="0"` and the key handler
by itself. A card without `onclick` is a plain container and takes no focus.

**Usage:**
```svelte
<Card onclick={openProject} ariaLabel="Open Northwind">
    …
</Card>
```

**Best Practices:**
- Give an interactive card a name with `ariaLabel` when its content does not say what it does
- Do not put a button or a link inside an interactive card: a control inside a `role="button"` cannot be reached reliably. Make the card a plain container and put the action on a control in it

---

### Collapsible and CollapsibleGroup

**Keyboard support** (on the trigger, a `<button>`):
- ✅ **Tab**: Move to the trigger, then into the panel when it is open
- ✅ **Enter / Space**: Open or close the panel

Inside a `CollapsibleGroup`, on a header button:
- ✅ **Arrow Down**: Move focus to the next header (wraps to the first)
- ✅ **Arrow Up**: Move focus to the previous header (wraps to the last)
- ✅ **Home**: Move focus to the first header
- ✅ **End**: Move focus to the last header

The arrow keys only move focus; they open nothing. Every header stays in the
tab order, so the group works without them, and a disabled header is skipped.
A closed panel is `hidden`: nothing in it takes focus or is read out. If a
panel closes while focus is inside it (a Save button in the panel closes it, or
the group closes it because another panel was opened), focus moves to that
panel's trigger; focus is not moved in any other case.

A disabled panel keeps its state. In a single-open group it is not closed when
another panel opens, so a disabled panel that is open stays open beside the
one the user opened. If several panels are marked open at the start of a
single-open group, only the first is rendered open, on the server too. Arrow
keys with Shift, Alt, Ctrl or Meta are left to the browser, and so are the keys
on a Collapsible nested inside a panel, which is not part of the group.

**Usage:**
```svelte
<Collapsible bind:open title="Billing details" headingLevel={3}>
    <BillingForm />
</Collapsible>

<!-- Your own header: spread the props on a <button> -->
<Collapsible bind:open>
    {#snippet trigger(props, state)}
        <div class="flex items-center gap-2">
            <h3 class="flex-1">Billing details</h3>
            <button {...props}>{state.open ? "Hide" : "Show"}</button>
        </div>
    {/snippet}
    <BillingForm />
</Collapsible>

<CollapsibleGroup>
    <Collapsible title="General" headingLevel={3}>…</Collapsible>
    <Collapsible title="Members" headingLevel={3}>…</Collapsible>
</CollapsibleGroup>
```

**Best Practices:**
- Spread the `trigger` props on a real `<button>`: Enter and Space come from the element, and the props carry `type="button"`, `aria-expanded`, `aria-controls`, `disabled` and the click handler
- Give a custom trigger a name that says what it shows, not only "Toggle"; the panel is labelled by it
- Set `headingLevel` on accordion headers so they appear in the document outline
- Keep the default closed behaviour for forms (the content stays mounted and keeps its values); use `unmountOnClose` for heavy or read-only content
- Leave `region` alone unless the panel deserves a landmark: it is on by default only in a single-open group, where one panel is exposed at a time

---

### ColorPicker

**Keyboard support:**
- ✅ **Tab**: The hex field, the swatch that opens the picker, and in the open picker the colour map and the hue slider: one stop each
- ✅ **Enter / Space** on the swatch: Open or close the picker
- ✅ **Arrow Left / Right** on the map: Less or more saturation
- ✅ **Arrow Up / Down** on the map: Lighter or darker
- ✅ **Shift + an arrow**: Ten steps instead of one
- ✅ **Home / End, Page Up / Page Down**: The slider's own, on the value that has focus
- ✅ **Arrow keys** on the hue slider: Change the hue

The map is two sliders on one surface, "Saturation" and "Lightness", in a
group named "Saturation and lightness". Tab reaches the first; an arrow key
moves the value it belongs to and puts focus on that slider, so its new value
is what is read out, with the colour the two make ("50%, #bf4040"). The
sliders are not drawn: the surface they share shows the focus ring, and the
round mark on it is where the two values are. The hue slider is a native
range drawn by its track, which shows the ring for it. A hex value can always
be typed in the field instead.

With a pointer, press or drag anywhere on the map: a mouse, a finger or a pen.

---

### ConfirmDialog

**Keyboard support:**
- ✅ **Tab / Shift + Tab**: Move between Cancel and the confirm button; focus stays in the dialog
- ✅ **Enter / Space**: Activate the focused button
- ✅ **Escape**: Cancel and close (not while loading)

Focus starts on **Cancel** for every variant, so a stray Enter backs out
instead of confirming. There is no Enter shortcut for the confirm button: Enter
only activates the button that has focus. When the dialog closes, focus returns
to the element that opened it.

While a confirm is loading neither button can be used (Cancel is disabled, the
confirm button is `aria-disabled` and busy) and Escape and the backdrop do
nothing. Focus stays on the confirm button, which is still a Tab stop while it
loads. If focus was on Cancel when loading started, it is held on the dialog
itself instead of falling to the page (without a focus outline around the
whole dialog, since the dialog is not a control), and goes to the confirm
button if the request fails and the dialog stays open. `loadingLabel` ("Working…" by default) is announced once,
politely, when loading starts.

**Usage:**
```svelte
<ConfirmDialog
    bind:open
    variant="danger"
    title="Delete this project?"
    message="The project and its files are removed for everyone."
    confirmLabel="Delete"
    onconfirm={() => api.deleteProject(id)}
    onerror={(error) => (failure = error.message)}
/>
```

**Best Practices:**
- Write the title as the question and put the consequence in `message`: the title is the dialog's name and the message its description
- Name the action on the confirm button ("Delete", "Publish"), not "OK" or "Yes"
- Return the request's promise from `onconfirm` and let the dialog run the loading state; return `false` to keep it open
- Show a failed request inside the dialog through `children`, and handle it in `onerror`
- The dialog uses `role="alertdialog"` with `aria-modal`: it interrupts to ask for a response, and is named by the title and described by the message

---

### DateField and TimeField

**Keyboard support:**
- ✅ **Tab**: Reach the field; in a desktop browser, Tab also steps through its parts (day, month, year; hours, minutes)
- ✅ **Arrow Up / Down**: Change the focused part
- ✅ **Digits**: Type into the focused part
- ✅ **Space / Enter / Alt + Arrow Down**: Open the browser's picker, where it has one

These are native `<input type="date">` and `<input type="time">`: the keys,
the picker and how the value is read out are the browser's and the device's.
On a phone, a tap opens the system picker. The library adds the label, the
hint and the error, wired to the field as in Input, and nothing in between the
user and the native control.

The value is always `YYYY-MM-DD` or 24-hour `HH:mm` (an empty string while
empty), whatever the field shows. The field shows the browser's or the
device's own format, not the page's, and cannot be told otherwise. Use
`formatDate` and `formatTime` to show a value as text in the page's language.

**Usage:**
```svelte
<DateField label="Quiz date" bind:value={date} min="2026-10-01" />
<TimeField label="Starts" bind:value={time} step={300} />
<p>{formatDate(date, "sv")} {formatTime(time, "sv")}</p>
```

**Best Practices:**
- Give every field a `label`, or put it in a FormField with `hideLabel` and the props FormField hands over
- Say what `min` and `max` are in the `hint`: the browser enforces them, but only tells the user after the fact
- Use `size="lg"` in a phone-first form

---

### Drawer

**Keyboard support:**
- ✅ **Tab / Shift + Tab**: Move through the controls in the drawer; focus wraps and never reaches the page behind
- ✅ **Escape**: Close the drawer (not when `dismissible` is false)
- ✅ **Enter / Space**: Activate the focused control, including the close button

When the drawer opens, focus moves to the control `initialFocus` selects, or to
the first control (the close button) when it is not set. When the drawer
closes, focus returns to the element that opened it. The page behind does not
scroll while the drawer is open.

With other overlays: a Drawer can open over a Modal and a Modal can open from a
Drawer. Escape closes only the topmost one, Tab stays inside it, and focus goes
back one step at a time. If the focused control is disabled or removed and focus
falls to the page, the next Tab brings it back into the drawer.

Content with nothing to focus: when the content is taller than the drawer and
holds no control, the scrolling area becomes a Tab stop, named by the title, so
the arrow keys, Page Up/Down and Space can scroll it. With any control in the
content there is no extra Tab stop.

`onkeydown` hears every keydown inside the drawer, after the drawer has handled
Escape; it does not replace the Tab cycle. On a touch screen the close button's
hit area is 44px around the same 32px button.

**Usage:**
```svelte
<Drawer
    bind:isOpen={open}
    title="Choose a project"
    side="right"
    initialFocus="#project-search"
>
    <Input id="project-search" label="Search projects" />
    <ProjectList />
    {#snippet footer()}
        <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
    {/snippet}
</Drawer>
```

**Best Practices:**
- Point `initialFocus` at the control the user came for (a search field); otherwise focus starts on the close button
- Use `start` or `end` for a drawer that should mirror in a right-to-left page; `left` and `right` stay where they are
- Translate the close button through `closeLabel`
- With `dismissible={false}`, give the drawer its own way out: the close button stays focusable but does nothing

---

### Dropdown

**Keyboard support:**
- ✅ **Enter / Space / Arrow Down** on the trigger: Open the menu; focus moves to the first item
- ✅ **Arrow Down / Arrow Up**: The next / previous item
- ✅ **Home / End**: The first / last item
- ✅ **Enter / Space**: Activate the focused item
- ✅ **Escape**: Close the menu; focus returns to the trigger
- ✅ **Tab**: Close the menu and move on

Focus moves between the items themselves, so `aria-activedescendant` is not
used. The items are one Tab stop between them (a roving `tabindex`); a letter
typed on an item moves focus to the next item that starts with it. The trigger carries `aria-expanded`, `aria-haspopup` and `aria-controls`;
the popup is `role="menu"`, or `role="listbox"` with `menuRole="listbox"`.
Items with `role="menuitem"`, `menuitemradio`, `menuitemcheckbox` or `option`
are all in the arrow-key order. A disabled item is `aria-disabled`: it keeps
its place in that order, is announced as unavailable, and does nothing when
activated.

When the menu closes with focus inside it (Escape, or an item was chosen),
focus returns to the trigger. A click elsewhere closes it and leaves focus
where the click put it. Opened with the mouse, the menu does not move focus
until a key is pressed.

**In a sheet** (`presentation="sheet"`, or `"auto"` on a touch screen narrower
than 640px; this is the action sheet) the menu is the same element with the
same items, in a BottomSheet:
- ✅ Focus moves into the sheet when it opens, however it was opened: to the chosen item, or the first
- ✅ **Arrow Down / Arrow Up / Home / End / Enter / Space**: As above
- ✅ **Tab / Shift + Tab**: Through the grip, the close button and the item that has focus; focus stays in the sheet and the menu stays open
- ✅ **Escape**, the close button, the backdrop or a swipe down: Close; focus returns to the trigger

The menu opens on the side `placement` asks for when it fits there, and is
flipped or limited in size near an edge of the screen. That changes where it
is drawn only: the arrow keys keep the order of the items, and in a menu that
scrolls the focused item is brought into view.

**Best Practices:**
- Spread the props the `trigger` snippet receives on a real `<button>`
- Name the menu with `ariaLabel`
- Give radio-like items `role="menuitemradio"` and `aria-checked`

---

### FloatingActionButton

**Keyboard support:**
- ✅ **Tab**: Reach the button where it stands in the document, not where it floats
- ✅ **Enter / Space**: Activate it (Enter only, when it is a link with `href`)

`label` is required and is the accessible name; with `extended` it is also the
visible text. Place the button in the markup after the content it acts on: in
an AppShell that puts it between the content and the tabs in the tab order.

**Usage:**
```svelte
<FloatingActionButton label="New quiz" onclick={create} />
```

**Best Practices:**
- One per screen, for the one main action
- Give the scrolling content padding at the end (`pb-24`), so its last row and a focused control can scroll clear of the button
- While it is mounted it reserves `scroll-padding-bottom` on what scrolls under it (the AppShell's content, or the page), so a row that takes keyboard focus is scrolled clear of the button, not left partly under it. The room is given back when the button goes
- A `Toaster` on the same screen would cover it: set `--toaster-bottom-offset: 72px` (56px of button and 16px under it)

---

### Input

**Keyboard support:**
- ✅ **Tab**: Move to input field
- ✅ **Shift + Tab**: Move away from input field
- ✅ Standard text input keys (typing, backspace, etc.)

The field adds no keys of its own: Escape does not clear it.

What stands inside the field (`leading`, `trailing`, the `revealable` toggle)
is in the Tab order after the field, in the order it is drawn, when it is a
control; an icon or a unit is not a stop.

- ✅ **Tab** from a `revealable` password field: to the "Show password" toggle
- ✅ **Enter / Space** on the toggle: show the password as text, or hide it again

The toggle has one name in both states and says which it is in through
`aria-pressed`. From the keyboard it keeps focus. A press with a mouse or a
finger leaves focus and the caret in the field, so the on-screen keyboard
stays up while a password is being typed. Nothing is announced beyond the
toggle's own state, and `autocomplete` is never changed.

`hint` and `error` are tied to the field with `aria-describedby`, hint first.
The hint is read with the field; the error is announced when it appears:

```svelte
<Input label="Password" type="password" autocomplete="current-password" revealable hint="At least 8 characters." />
```

**Usage:**
```svelte
<Input 
    label="Name" 
    placeholder="Enter your name"
    oninput={handleInput}
/>
```

**Best Practices:**
- Labels must be associated with inputs (`for` attribute)
- Error messages should be announced to screen readers
- Focus styles must be visible

---

### MediaGrid

**Keyboard support:**
- ✅ **Tab**: Into the grid (the selected item, else the first), then to that item's delete button, then out
- ✅ **Arrow Left / Arrow Right**: Previous / next item (mirrored in a right-to-left layout)
- ✅ **Arrow Up / Arrow Down**: The item above / below, by the number of columns on screen
- ✅ **Home / End**: First / last item in the row
- ✅ **Ctrl + Home / Ctrl + End**: First / last item in the grid
- ✅ **Enter / Space**: Select the item. With `multiple`, pressing a selected item clears it; a single selection is only moved, never cleared, by a press
- ✅ **Delete**: Ask to delete the focused item (the same as its delete button)

Each item is a toggle button (`aria-pressed`) in a list, with its delete button
beside it, not inside it. A `listbox` was not used because an option cannot
contain a button, and a `grid` role needs rows in the DOM, which a layout that
picks its column count from the available width does not have. Only one
item's buttons are in the Tab order at a time (a roving tabindex), so a library
of two hundred files is one Tab stop; the arrow keys move between items and do
not select. A screen reader's own button and list navigation reaches every
item whatever the Tab order.

Nothing about a list of buttons says that the arrow keys work, so the grid
says it: "Use the arrow keys to move between items." is the description of the
item focus arrives on (read once per visit, not at every arrow press), and the
same sentence is shown below the grid while it has keyboard focus. Translate it
through `strings.keyboardHint`.

**Usage:**
```svelte
<MediaGrid
    {items}
    getKey={(item) => item.id}
    getLabel={(item) => item.name}
    getUrl={(item) => item.url}
    bind:selected
    ondelete={askToDelete}
    aria-label="Media library"
/>
```

**Best Practices:**
- Give the list a name with `aria-label` or `aria-labelledby`
- Return the file name or a title from `getLabel`; it names the item and its delete button ("Delete hero.jpg")
- Confirm a delete before removing the item (`ConfirmDialog`); the grid only reports it
- When the item is removed, focus moves to the item that took its place, also when a confirmation dialog closes after the removal; with nothing left it moves to the grid itself
- Inside a `Modal`, the arrow keys move between items instead of scrolling the dialog
- The built-in empty state's title is an `<h3>`, to sit under a Modal or section title; set `emptyHeadingLevel` when the heading above the grid is at another level

---

### Modal

**Keyboard support:**
- ✅ **Tab / Shift + Tab**: Move through the controls in the modal; focus wraps and never reaches the page behind
- ✅ **Escape**: Close the modal (not when `dismissible` is false)
- ✅ **Enter / Space**: Activate the focused control, including the close button

When the modal opens, focus moves to the control `initialFocus` selects (a CSS
selector, looked up inside the panel), or to the first control when it is not
set or matches nothing; with no control at all, the panel itself takes focus.
When the modal closes, focus returns to the element that had it before. The
page behind does not scroll while the modal is open.

A click on the backdrop closes it too. `onclose` reports what the user did:
`escape`, `backdrop` or `close-button`.

With `dismissible={false}`, Escape, the backdrop and the close button do
nothing. The close button stays in the Tab order, marked `aria-disabled`, so
focus is not dropped; focus stays trapped, and setting `isOpen` yourself still
closes the modal.

It is `role="dialog"` with `aria-modal`, named by `title` and described by
`description`. Set `role="alertdialog"` for a dialog that interrupts to ask
for a response; focus handling is the same. ConfirmDialog is that, with the
buttons and the loading state done.

With other overlays: Modal, SlideUp, Drawer and BottomSheet share one stack. A
modal can open from another and from a drawer; the one opened last is on top
whatever the order in the markup, Escape closes only that one, Tab stays inside
it, and focus goes back one step at a time. If the focused control is disabled
or removed and focus falls to the page, the next Tab brings it back into the
modal and Escape still closes it.

**Full screen** (`fullScreen`, or `fullScreen="mobile"` below 768px): the same
dialog, the same keys. The header and the footer stay in place and the content
between them scrolls. Tab moves through the fields and the browser scrolls each
into view; when the content holds nothing that takes focus (a long text), the
scrolling area is a Tab stop itself, so the arrow keys, Page Up/Down, Home and
End can scroll it. Escape, the close button and focus return are unchanged.
The content keeps 120px at least. When the header and the footer leave less
(very large text on a small screen, or the on-screen keyboard on a phone held
sideways, where a 200px strip is all that is left), the panel scrolls as a
whole instead: the footer is then reached by scrolling, or by Tab, and is not
pinned.

**Toasts** (Toaster): a toast is announced when it appears (`role="status"`,
or `alert` for an error) with what it was pushed with: its title and its
message, both of which are also its visible text. How long it stays is said
in words: `duration: "short"` (3 seconds), `"medium"` (7), `"long"` (14) or
`"persistent"` (until it is dismissed); a number is milliseconds. Short is
for a few words that need no reading time ("Sparat"). Anything a person has
to read is medium or long. Anything they have to act on, and an error, should
stay: persistent. With no `duration`, an error and a toast with an action stay
until dismissed, and the rest go by their title and message together: up to
120 characters gets medium (or the Toaster's `defaultDuration`), 121 to 240
gets long, and more than 240 stays. A mouse over a timed toast, keyboard focus
inside it and a finger held on it each stop its timer for as long as they
last, which is what keeps a timed toast within WCAG 2.2.1; a finger that lifts
leaves it at least three seconds, so holding a short toast starts it again.
The time left is shown by
the bar along its bottom edge, and is in the toast as a sentence for a screen
reader, outside the live region: it is found when the toast is read and is not
spoken every second. `showCountdown` on the Toaster shows that sentence to
everyone, with a button that stops the timer. Details that open and close are
the `detail` of a toast; a toast without one has only its dismiss button.
Every word the toaster says by itself is in `strings`, and the region's name
is `aria-label` or `strings.regionLabel`. `data-paused` on a toast and
`onpausechange` on the Toaster say when its timer is held.

**SwipeableListItem:** Tab reaches the button at the end of the row (named
"Actions", `aria-expanded`). Enter or Space opens the row and moves focus to
its first action; the actions are buttons, reached with Tab. Enter or Space on
one runs it and closes the row. Escape closes the row and returns focus to the
button. Opening a row closes any other open row of the same list.

**PullToRefresh:** Tab reaches a Refresh button at the top of the region; it
is drawn only while it has keyboard focus. Enter or Space refreshes. The button
keeps focus while the refresh runs, and "Refreshing" and "Updated" are
announced.

**Toasts while a modal is open:** a toast is drawn over a modal overlay
(Modal, BottomSheet, SlideUp, Drawer, ConfirmDialog) and its controls are part
of that overlay's Tab cycle: Tab from the overlay's last control goes to the
first toast control, and from the last toast control back to the overlay's
first; Shift+Tab goes the other way. `focusToasts()` works with an overlay
open. Escape in a toast returns focus to where it came from and leaves both
the toast and the overlay as they are; dismissing the toast returns focus the
same way. The overlays set no `aria-hidden` or `inert` on the page behind, so
a toast raised while one is open is still in a live region. The stack never
lies on the overlay's header, so the close button always takes a press, nor on
a pinned footer: it sits above the panel where there is more room, otherwise
between the header and the footer, and scrolls when it holds more than fits.

**The on-screen keyboard:** where it covers the page instead of shrinking it
(iOS Safari, Chrome on Android), an open Modal, BottomSheet, SlideUp or Drawer
keeps to the part of the screen above it: a footer stays above the keyboard, a
BottomSheet's half and full heights are shares of what is left, and the
focused field is scrolled into view.

**Usage:**
```svelte
<Modal
    bind:isOpen={open}
    title="Rename project"
    initialFocus="#project-name"
    onclose={({ reason }) => console.log(reason)}
>
    <Input id="project-name" label="Name" bind:value={name} />
    {#snippet footer()}
        <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
        <Button onclick={save}>Save</Button>
    {/snippet}
</Modal>
```

**Best Practices:**
- Give the modal a `title`: it is the dialog's name, and without it the close button is the only thing that says what this is
- Point `initialFocus` at the field the user came for, or at the safe choice in a confirmation; otherwise focus starts on the first control, usually the close button
- With `dismissible={false}`, give the modal its own way out
- Translate the close button through `closeLabel`
- Use `portal` when an ancestor has a transform, a filter or clipped overflow; the theme class then has to be on `<html>` or `<body>`

---

### PhotoGrid

**Keyboard support:**
- ✅ **Tab**: Into the grid, onto one tile, and out again: the grid is one Tab stop
- ✅ **Arrow keys**: Move between tiles (Left and Right swapped in a right-to-left page); nothing wraps
- ✅ **Home / End**: The first / last tile of the row
- ✅ **Ctrl + Home / End**: The first / last tile of the grid
- ✅ **Enter / Space**: Open the photo, or select it in a selectable grid

The tile that takes Tab is the one the keyboard was last on; before that, the
selected tile in a `single` grid, else the first. A short hint ("Use the arrow
keys to move between photos.") is read out when focus enters the grid, and
shown under it while the keyboard is in it.

Each tile is a button named by the photo's `alt`; a photo without one is named
"Photo 3 of 12" and a development build warns. The "Add photo" tile is first
and has its label written on it. The last tile under `max` is named by its
photo and "6 more photos".

With `selectable`, tiles are toggle buttons (`aria-pressed`). In `single` the
selected photo is never cleared by pressing it again; in `multiple` a press
toggles, like a checkbox. Each tile then has a second button, "Open (photo)",
reached with Tab from the tile.

**Usage:**
```svelte
<PhotoGrid {photos} max={8} aria-label="Quiz night photos" onopen={show} onadd={pick} />
```

**Best Practices:**
- Give the grid an `aria-label` or `aria-labelledby`, and every photo real `alt` text
- Open a PhotoViewer from `onopen`: focus comes back to the right tile by itself when it closes
- `onadd` only reports the press: open your own file picker or an ImageUpload from it

---

### PhotoViewer

**Keyboard support:**
- ✅ **Tab / Shift + Tab**: Move through the controls; focus wraps and never reaches the page behind
- ✅ **Arrow Left / Right**: Previous / next photo (swapped in a right-to-left page). While zoomed in, they pan instead
- ✅ **Arrow Up / Down**: Pan, while zoomed in
- ✅ **Page Up / Page Down**: Previous / next photo, zoomed in or not
- ✅ **Home / End**: First / last photo
- ✅ **+ / −**: Zoom in / out, up to four times
- ✅ **0**: Back to the fitted photo
- ✅ **Escape**: Leave the zoom if zoomed in; otherwise close

Everything a finger can do has a key or a button: the previous, next and close
buttons are always shown, never hidden after a while. At the first and last
photo the button that has nowhere to go stays, dimmed and `aria-disabled`, so
focus is never dropped. A tap on the black beside the photo does not close the
viewer: it is the first half of a double tap, and a near miss of the photo.

It is a modal dialog. Focus moves to the close button when it opens. When it
closes, focus goes to the tile of the photo that was showing, if the PhotoGrid
it was opened from shows that photo; otherwise to whatever opened it. The
photo is an image with its `alt`; when the photo changes, its `alt` and place
("The bar, 3 of 12") are read out politely. A photo that takes more than about
0.4 seconds to load says "Loading photo"; one that fails says so and offers
"Try again".

While a menu of extra actions is open the keys belong to the menu: Escape
closes the menu, not the viewer.

**Usage:**
```svelte
<PhotoViewer {photos} bind:index bind:isOpen={open} actions={[share, remove]} />
```

**Best Practices:**
- Confirm a destructive action yourself (a ConfirmDialog opens over the viewer); the viewer moves to the photo that takes the deleted one's place
- Translate `strings` and `label` together with the action labels
- Keep captions short: two lines show, and the rest is behind a "More" button

---

### Rating

**Keyboard support** (native `<input type="radio">`, one per star):
- ✅ **Tab**: Into the stars (the selected star, else the first), then to the clear button when `clearable` and there is a rating, then out
- ✅ **Arrow Right / Arrow Down**: The next star, selected as focus moves; wraps from the last to the first (left and right swap in a right-to-left layout)
- ✅ **Arrow Left / Arrow Up**: The previous star; wraps from the first to the last
- ✅ **Home / End**: The first / last star
- ✅ **Space**: Select the focused star. On the selected star it does nothing: a single selection is never cleared by a repeat press
- ✅ **Delete / Backspace**: Clear the rating, only with `clearable`

The arrow keys move from the star that has focus, which need not be the
selected one: a screen reader's cursor can put focus on any radio. While the
rating is empty, a forward key selects the focused star itself, so Right on an
empty rating gives one star, not two.

It is a radio group named by `label`, and each star is named "4 of 5 stars", so
it reads "Quiz, 4 of 5 stars". With `readonly` there is nothing to operate: it
is one image named "Quiz, 3.5 of 5 stars" and takes no focus.

**Usage:**
```svelte
<Rating label="Quiz" bind:value={quiz} clearable />
```

**Best Practices:**
- Give it a `label`, or `aria-label` / `aria-labelledby` when the row has its own heading (`hideLabel` keeps `label` as the name only)
- Set `clearable` when a rating may be withdrawn; without it a rating can be changed but not removed by the user
- After the clear button is used it hides, and focus moves to the first star
- Translate the names through `strings` (`starLabel`, `clearLabel`, `noRating`) and the number through `formatValue`
- The focus ring is drawn around the star's 44px target

---

### SegmentedControl

**Keyboard support** (native `<input type="radio">`, one per segment):
- ✅ **Tab**: Into the control (the selected segment, else the first that can be chosen), then out
- ✅ **Arrow Right / Arrow Down**: The next segment, selected as focus moves; wraps (left and right swap in a right-to-left layout)
- ✅ **Arrow Left / Arrow Up**: The previous segment; wraps
- ✅ **Home / End**: The first / last segment
- ✅ **Space**: Select the focused segment. On the selected segment it does nothing: a single selection is never cleared by a repeat press

The arrow keys move from the segment that has focus, which need not be the
selected one, and skip a disabled segment. While nothing is selected, a
forward key selects the focused segment itself.

It is a radio group, not a tab list: it sets a value and has no panels. Use
Tabs when each choice shows a panel of its own.

**Usage:**
```svelte
<SegmentedControl
    label="View"
    options={[
        { value: "list", label: "List" },
        { value: "month", label: "Month" },
    ]}
    bind:value={view}
/>
```

**Best Practices:**
- Give the group a name with `label`, or `aria-labelledby` when a visible heading already says it
- Keep to two to four options with short labels; an icon is decorative and the label names the segment
- Leave `value` undefined for a question that starts unanswered; the first segment still takes Tab

---

### Select

**Keyboard support** (Select is built on Dropdown, as a listbox):
- ✅ **Enter / Space / Arrow Down** on the field: Open the list
- ✅ **Arrow Down / Arrow Up**: The next / previous option
- ✅ **Home / End**: The first / last option (in the search field they move the caret instead)
- ✅ **Enter / Space**: Choose the focused option and close
- ✅ **Escape**: Close without choosing; focus returns to the field
- ✅ **Tab**: Close and move on

With `searchable` (the default) a search field sits above the options, outside
the listbox. Typing in it filters the options, and Space types a space there
instead of choosing.

The list is one Tab stop:
- ✅ **Shift + Tab** on an option: To the search field, in one step
- ✅ **Tab** in the search field: To the list, on the option it was last on
- ✅ **A letter or digit** on an option, searchable: Focus moves to the search field and the character is typed there
- ✅ **A letter or digit** on an option, not searchable: Focus moves to the next option that starts with what was typed; letters typed within 0.6 seconds are one word

On a phone (`presentation="auto"`, the default: a touch screen narrower than
640px) the list opens in a BottomSheet titled by the field's label, with the
keys above and the sheet's own (see Dropdown, "In a sheet"). Focus starts on
the chosen option, not on the search field, so the on-screen keyboard does not
cover the list before it has been seen; choosing an option, the chosen one
included, closes the sheet and returns focus to the field.

The field is a select-only combobox: a button with `role="combobox"`,
`aria-expanded`, `aria-haspopup="listbox"` and `aria-controls`, and with
`aria-invalid`, `aria-required` and `aria-busy` when they apply; each choice is
`role="option"` with `aria-selected`. A disabled option is `aria-disabled` and
stays in the arrow-key order. The message below the field is `role="alert"`
for an error and `role="status"` otherwise.

**Best Practices:**
- Give the field a `label`
- Set `searchable={false}` for a short list, so the options are the first thing Tab and the arrow keys reach

---

### Slider

**Keyboard support** (native `<input type="range">`):
- ✅ **Tab**: Move to the slider
- ✅ **Arrow Right / Arrow Up**: Increase by one step
- ✅ **Arrow Left / Arrow Down**: Decrease by one step (left and right swap in a right-to-left layout)
- ✅ **Home**: Go to the minimum
- ✅ **End**: Go to the maximum
- ✅ **Page Up / Page Down**: Larger step, as the browser defines it

**Usage:**
```svelte
<Slider
    label="Image quality"
    bind:value={quality}
    min={10}
    max={100}
    step={10}
    showValue
    formatValue={(value) => `${value} %`}
/>
```

**Best Practices:**
- Give it a `label`, or an `aria-label` when there is no visible one
- Pass `formatValue` whenever the number has a unit; it sets `aria-valuetext`, so "80 %" is read instead of "80"
- Choose a `step` that gets across the range in a reasonable number of key presses
- The focus ring is drawn on the thumb

---

### SortableList

**Keyboard support** (on the drag handle, a `<button>`):
- ✅ **Tab**: Move to the handle, then to the row's move up / move down buttons
- ✅ **Arrow Up**: Move the item up one place
- ✅ **Arrow Down**: Move the item down one place
- ✅ **Home**: Move the item to the start
- ✅ **End**: Move the item to the end
- ✅ **Escape**: Cancel a pointer drag and restore the original order
- ✅ **Enter / Space**: Activate a move up / move down button

The model is immediate: each arrow press moves the item and is announced
("Hero section, moved to position 2 of 5") in a polite live region. There is no
grab mode to enter or leave, so there is no state to get stuck in, and a move
is undone with the opposite arrow. A key that cannot move the item any further
says so ("Hero section, already first"). Arrow keys with Alt, Ctrl or Meta are
left to the browser.

Focus stays on the handle, but not always without a blur: reordering moves DOM
nodes, a moved node loses focus, and the list puts it back. This happens on a
move down, Home and End; a screen reader may then read the handle's name and
description again before the announcement. The description is one short
sentence for that reason; keep a translated one short too.

**Usage:**
```svelte
<SortableList
    bind:items={sections}
    getKey={(section) => section.id}
    getLabel={(section) => section.title}
    aria-label="Page sections"
>
    {#snippet item(section)}
        <SectionCard {section} />
    {/snippet}
</SortableList>
```

**Best Practices:**
- Give the list a name with `aria-label` or `aria-labelledby`
- Return a short, unique name from `getLabel`; it is in every button name and announcement
- Keep the move buttons unless space is tight: a screen reader in browse mode does not pass arrow keys to a button, and the move buttons work there
- Focus stays on the control that was used; when a move button reaches an end and becomes disabled, focus moves to the row's other move button
- Translate the button names, the handle description and the announcements through `strings`
- With `controls="manual"`, put `row.handle` and `row.moveButtons` beside a header toggle, never inside another `<button>` or link: a button inside a button is invalid markup and cannot be reached by keyboard
- A click on the handle or a move button does not bubble (Enter and Space produce a click too), so a card header with its own click handler is not toggled by them; use `onreorder` to observe a move

---

### Stepper

**Keyboard support:**
- ✅ **Nothing to operate by default**: it shows progress, and has no Tab stop
- ✅ **Tab / Shift + Tab** (with `interactive`): Through the completed steps, in order
- ✅ **Enter / Space** (with `interactive`): Go back to that step

It is a navigation landmark ("Progress") holding one ordered list. Each step
is read as its number, label and state: "Step 1 of 3: Details, completed",
"Step 2 of 3: Ratings, current", "Step 3 of 3: Result + notes, upcoming". The
current step has `aria-current="step"`. The compact and the full layout are
the same list, so they read the same.

With `interactive`, only completed steps are buttons. The current step and the
ones after it are not, so a press never lands on the current step and nothing
can be skipped. A pressed step becomes the current one and keeps focus, as
plain text that is not a Tab stop.

When the step changes it is read out once, politely ("Step 2 of 3: Ratings"),
and focus is not moved. Moving focus to the new step's heading is the app's
job:

**Usage:**
```svelte
<script lang="ts">
    import { tick } from "svelte";

    const steps = ["Details", "Ratings", "Result + notes"];
    let current = $state(0);
    let heading: HTMLElement | undefined = $state();

    async function go(to: number) {
        current = to;
        await tick();
        heading?.focus();
    }
</script>

<Stepper {steps} {current} />
<h2 bind:this={heading} tabindex="-1">{steps[current]}</h2>

<StickyActionBar label="Log visit">
    {#if current > 0}
        <Button variant="ghost" size="lg" onclick={() => go(current - 1)}>Back</Button>
    {/if}
    <Button size="lg" onclick={() => go(current + 1)}>Next</Button>
</StickyActionBar>
```

**Best Practices:**
- Keep your own Back and Next buttons: the Stepper is not the way through the form
- Translate `label` and all three `strings`; the state word is part of `stepLabel`
- Give the heading `tabindex="-1"` and focus it after each change of step

---

### StickyActionBar

**Keyboard support:**
- ✅ **Tab**: Reach the bar's buttons in document order, after the form's last field
- ✅ **Enter / Space**: Activate a button; Enter in a field submits the form as usual

The bar never takes focus and never moves it. It lies over the bottom of what
scrolls, so while it is mounted it sets `scroll-padding-bottom` on its scrolling
ancestor (or the page) to its own height: a field that takes focus is brought
into view above the bar, not under it. With the on-screen keyboard up, the bar
rises by the part of its scrolling box that the keyboard covers, never out of
that box, and the reserved room grows by the same amount.

It differs from UnsavedChangesBar: that one appears only while the form is
dirty, announces itself and holds focus while saving; this one is always there
and holds whatever buttons you give it.

**Usage:**
```svelte
<form class="flex min-h-full flex-col" onsubmit={save}>
    <div class="space-y-4 p-4">…</div>
    <StickyActionBar>
        <Button type="submit" size="lg" fullWidth>Save visit</Button>
    </StickyActionBar>
</form>
```

**Best Practices:**
- Put the bar after the last field, inside the form, so the order on screen is the order of focus
- Give it a `label` when it holds more than one button, so a screen reader says what they belong to
- On a form screen in AppShell, leave the tab bar out and let this bar be the bottom of the screen
- Use one bar per scrolling box: two would stick to the same edge, one on top of the other

---

### Tabs

**Keyboard support:**
- ✅ **Tab**: Into the tab list (the selected tab), then on to the panel's content; the list is one Tab stop
- ✅ **Arrow Right**: Select the next tab; wraps from the last to the first
- ✅ **Arrow Left**: Select the previous tab; wraps from the first to the last
- ✅ **Home**: Select the first tab
- ✅ **End**: Select the last tab
- ✅ **Enter / Space**: Activate tab. On the selected tab it does nothing: a single selection is never cleared by a repeat press

When the tabs do not fit their row, the list scrolls sideways. The tab that
takes focus from a key is scrolled into view, with room to spare for its focus
ring, and so is the selected tab when the list first appears; only the list
moves, never the page, and it moves at once under `prefers-reduced-motion`.
The tablist is still one Tab stop: the box that scrolls is not focusable.

**Usage:**
```svelte
<Tabs 
    tabs={[
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' }
    ]}
    activeTab="tab1"
/>
```

**Best Practices:**
- The component sets the roles (`tablist`, `tab`, `tabpanel`), `aria-selected`, `aria-controls` and the roving `tabindex` itself
- Selection follows focus: an arrow key selects the tab it lands on, and a disabled tab is skipped
- Tabs are horizontal only; there is no vertical orientation

---

### Tooltip

**Keyboard support:**
- ✅ **Tab** to the trigger: the tooltip opens, and the trigger is described by it (`aria-describedby`)
- ✅ **Escape**: closes the tooltip and leaves focus on the trigger; inside a Modal or a menu the first Escape closes only the tooltip
- ✅ **Tab** away: the tooltip closes

**Pointer and touch:**
- A mouse opens it on hover and closes it on leaving, after `delay` if one is set. The bubble can be pointed at: the pointer can move from the trigger onto it, across the gap, and it stays open for as long as the pointer is on either (WCAG 1.4.13). The way need not be straight: from a small trigger to the far end of a wide bubble the pointer leaves through the side, and the tooltip waits for as long as the pointer keeps to the triangle between where it left and the near edge of the bubble, and for 300ms if it stops there. Anywhere else, it closes at once. Escape closes it without moving the pointer or focus
- One tooltip is open at a time: opening one closes any other. A mouse resting on one trigger while Tab moves focus to another shows the one that has focus
- A finger or a pen opens it with a tap on the trigger, and the trigger still does what it does: a tooltip never takes a button's click, and no long press is needed. It opens when the finger comes up where it went down; a finger that goes down to scroll the page opens nothing
- After a tap it stays until a second tap, a tap elsewhere, Escape, scrolling or focus leaving. The tap leaves focus on the trigger, and a tooltip that went by itself while its trigger still had focus could be gone before it was read. `touchDuration={2500}` also closes it by itself after that many milliseconds, for a button whose tooltip is in the way of what the tap did

**Best Practices:**
- Never put information the user needs only in a tooltip. On a touch screen nothing shows that it exists: say it in the page, in a label or in a description
- A tooltip is text only and cannot be focused; for content with links or controls use a Dropdown or a Modal
- An open bubble takes presses (that is what lets it be pointed at). One that lies over another control takes a click meant for that control, and a tooltip opened by keyboard focus stays open while a mouse clicks elsewhere under it. Choose a `placement` where the bubble covers no control; near the edges it flips and moves by itself, so check there too
- For an info icon whose only job is the tooltip, use a real button with an accessible name
- To say why a control is unavailable, use `aria-disabled="true"` on a button that stays focusable, not `disabled`. A tooltip does describe a natively disabled button (`aria-describedby` is set on it while the tooltip is open), but that button takes no focus, so the keyboard never opens the tooltip, and some browsers send a disabled control no pointer events at all (it opens on hover and tap in Chromium; elsewhere it may not)
- The bubble opens on the other side when there is no room on the one asked for, moves along its side to stay on screen, and at 640px and below is always above or below its trigger

---

### TopNavbar and NavigationMenu

**Keyboard support** (TopNavbar):
- ✅ **Tab**: Through the brand link, the links and the controls in the bar, in order; each link is a Tab stop
- ✅ **Enter**: Follow the focused link

The links are a list in a `<nav>`, not a menubar: there are no arrow keys. The
link for the current page has `aria-current="page"`.

**TopNavbar's phone menu** is a disclosure, not a dialog: the menu button has
`aria-expanded`, and `aria-controls` while the menu is open; focus is not
trapped and the page behind is not locked.
- ✅ **Enter / Space** on the menu button: Open or close the menu
- ✅ **Tab**: Through the links and controls in the menu, then on into the page; the menu closes when focus leaves the bar
- ✅ **Escape**: Close the menu. If focus was in it, focus returns to the menu button
- ✅ **Enter** on a link: Follow it; the menu closes

It also closes on a press outside the bar, when `currentPath` changes, and
when the screen becomes wide enough for the row (`collapseAt`, `md` by default).

**NavigationMenu** (a list of links and of triggers, each with a panel of links;
the disclosure pattern, not a menu bar, so there are no arrow keys between the items):
- ✅ **Tab**: Through the triggers, and through the links of an open panel
- ✅ **Enter / Space** on a trigger: Open or close its panel
- ✅ **Arrow Down** on a closed trigger: Open its panel
- ✅ **Escape**: Close the panel; from inside it, focus returns to its trigger

See [NAVIGATION_MENU.md](./NAVIGATION_MENU.md).

**Usage:**
```svelte
<TopNavbar
    brand="Acme"
    brandHref="/"
    ariaLabel="Main navigation"
    items={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
    ]}
    currentPath={page.url.pathname}
    collapseAt="lg"
/>
```

**Best Practices:**
- Give each `<nav>` on a page its own `ariaLabel`
- Pass `currentPath` so the current page is marked
- Set `collapseAt` to the first width at which every link fits in the row

---

### UnsavedChangesBar

**Keyboard support:**
- ✅ **Tab**: Reach the bar in document order: after the form's last field (`position="bottom"`) or before its first (`position="top"`)
- ✅ **Enter / Space**: Activate Discard, Save or an extra action

The bar never takes focus when it appears; its message is announced politely
instead. While a save is in progress neither button can be used (Discard is
disabled, Save is `aria-disabled` and busy). Focus stays on Save; if it was on
Discard when saving started, it is held on the bar, not dropped on the page. When the bar goes (after Save or
Discard), focus returns to the element it came from, usually the field that was
being edited; if that is gone, it stays on the bar's empty host, at the same
place in the page.

**Usage:**
```svelte
<form>
    <Input label="Name" bind:value={draft.name} />
    <UnsavedChangesBar {dirty} onsave={save} ondiscard={reset} />
</form>
```

**Best Practices:**
- Put the bar in the form, after the last field: it is sticky, so it keeps its place in the flow and the last field can always be scrolled clear of it
- If you make it fixed instead (`class="fixed inset-x-0 bottom-0"`), set `scroll-padding-bottom` on the scroll container, or a focused field can end up underneath it
- Clear `dirty` yourself when the save has gone through; the bar does not hide on its own
- Return the promise from `onsave` so the saving state covers the whole request
- Warning before the page is closed or left (`beforeunload`, a navigation guard) is your app's decision and is not part of the bar

---

## Focus Management

### Focus Styles

Every interactive element in the library carries the `focus-ring` class: a 2px
gap and a 2px ring, drawn for keyboard focus only (`:focus-visible`). Use the
same class on your own controls so they match.

```svelte
<a href="/reports" class="focus-ring rounded-sm">Reports</a>
```

The ring colour is `--color-focus-ring` and the gap `--color-focus-ring-offset`;
`scripts/check-contrast.js` holds the ring to 3:1 against the page and a card
in both themes. In forced-colours mode the ring is restated as an outline. Do
not put `outline-none` on a control without giving it `focus-ring`.

### Focus Order

Tab order follows the order of the markup. Keep that the same as the order on
screen:
1. Header navigation
2. Main content
3. Sidebar (if present)
4. Footer

The library cannot check this; test it in each app.

### Skip Links

The library has no skip-link component. Add one in the app's layout:
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus-ring">
    Skip to main content
</a>
```

## Testing Keyboard Navigation

### Manual Testing Checklist

- [ ] All interactive elements are reachable via Tab
- [ ] Focus order is logical and follows visual order
- [ ] Focus styles are visible on all elements
- [ ] All components respond to appropriate keyboard shortcuts
- [ ] Modals trap focus correctly
- [ ] Focus returns to trigger after closing modals
- [ ] Dropdowns can be navigated with arrow keys
- [ ] Tabs can be navigated with arrow keys
- [ ] Escape closes all overlays
- [ ] No keyboard traps (can always navigate away)

### Automated Testing

Consider using tools like:
- [axe-core](https://github.com/dequelabs/axe-core) for accessibility testing
- [Pa11y](https://pa11y.org/) for automated accessibility testing
- [WAVE](https://wave.webaim.org/) browser extension

## Common Patterns

### Focus trap and focus return

Modal, SlideUp, Drawer, BottomSheet and ConfirmDialog trap Tab, move focus in
when they open and return it when they close; there is nothing to write. The
helpers they share live in `src/components/util/focus-utils.ts` and
`src/components/util/overlay.ts`. They are internal and are not exported from
the package: build an overlay of your own on Modal or Drawer rather than on
them.

### A single selection is never cleared

Pressing the selected item again does nothing in Tabs, SegmentedControl,
Rating, Calendar and a single-select MediaGrid. Only checkbox-like controls
toggle off. Where a choice may be withdrawn there is a control for it, such as
Rating's `clearable`.

### Disabled items stay reachable

A disabled Dropdown item or Select option is `aria-disabled`, not `disabled`:
it keeps its place in the arrow-key order and is announced as unavailable.

## Resources

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN: Keyboard Navigation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)
- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/)

