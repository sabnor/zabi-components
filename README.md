# Svelte Component Library

This project is a Svelte component library that includes a sample component and is set up for publishing as an npm package. It also features Storybook for showcasing the components.

## Project Structure

```
svelte-component-library
├── src
│   ├── components
│   │   └── ExampleComponent.svelte
│   └── index.ts
├── stories
│   └── ExampleComponent.stories.svelte
├── .storybook
│   ├── main.js
│   ├── preview.js
│   └── manager.js
├── package.json
├── svelte.config.js
├── tsconfig.json
├── rollup.config.js
└── README.md
```

## Getting Started

To get started with the Svelte component library, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd svelte-component-library
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run Storybook:**
   ```bash
   npm run storybook
   ```

4. **Build the library:**
   ```bash
   npm run build
   ```

## Usage

To use the ExampleComponent in your project, import it from the library:

```javascript
import ExampleComponent from 'svelte-component-library';
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.