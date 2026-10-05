# Storybook stories

Stories for the components in this library, one file per component, grouped by
layer. Storybook is also published with the site at `/storybook/`.

## Run it

```bash
npm run storybook          # dev server on port 6006
npm run build-storybook    # static build into storybook-static/
npm run build:site         # site build, with Storybook copied into static/storybook
```

## What is here

| Path | Contents |
|---|---|
| `Introduction.mdx` | First page: install, theme import, how to use the toolbar |
| `Colors.mdx` | Ramps and semantic tokens, read from `src/app.css` through `tokens.ts` |
| `atoms/` | ActionPanel, Badge, Button, Card, Checkbox, CodeBlock, ColorPicker, Container, DateField, Divider, FeatureCard, FloatingActionButton, Heading, IconButton, Input, List, ListItem, OptimizedImage, Progress, Rating, Select, Skeleton, Slider, Spinner, Table, Text, Textarea, ThemeToggle, TimeField, Toast, Toggle, Tooltip |
| `molecules/` | Alert, AppBar, BottomSheet, BottomTabBar, Calendar, Collapsible, ConfirmDialog, ContactForm, Drawer, Dropdown, EmptyState, Form, FormField, ImageUpload, MediaGrid, Modal, NavigationMenu, Page, Section, SegmentedControl, SlideUp, SortableList, StickyActionBar, Tabs, Toaster, UnsavedChangesBar |
| `organisms/` | AppShell, SidebarNavigation, SidebarNavigation/Account panel, SidebarPanel, TopNavbar, TopNavbar/Inline nav |

A `.svelte` file beside a story is a wrapper for it, used when a story needs
children, snippets or local state that story args cannot express.

Two components have no file of their own: CollapsibleGroup is shown in the
Collapsible stories (the accordion ones), and DropdownItem in the Dropdown
stories.

## Writing a story

- Title it `Design System/<Layer>/<Component>` so it sorts into the sidebar.
- Add `tags: ['autodocs']` so the component gets a Docs page.
- Give the component a description in `parameters.docs.description.component`.
  Say what it does and when to use it.
- Describe a story in `parameters.docs.description.story` when its name alone
  does not say why it exists.
- Do not hardcode colors in a story. Use token classes (`bg-surface-raised`,
  `text-description`) so the story follows the Theme control.

## Configuration

| File | Purpose |
|---|---|
| `.storybook/zabi-theme.ts` | Storybook's own interface in Zabi's colors, light and dark |
| `.storybook/manager.ts` | Applies that theme to the sidebar and toolbar, and follows the Theme control |
| `.storybook/preview.ts` | Theme control, background surfaces, sidebar order, and the Docs pages' theme, which follows the same control |
| `.storybook/preview-head.html` | Font faces for the stories |
| `.storybook/preview-body.html` | Frame background, from the surface tokens |
