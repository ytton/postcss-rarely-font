# PostCSS Rarely Font Plugin

A **PostCSS plugin** designed to add a fallback font family (`rarelyFont`) to handle rare Chinese characters (生僻字) automatically. This package also provides static assets, including a pre-defined CSS file and a font file (`SourceHanSerifSC-Regular.otf`), to make it easy to use in your projects.

---

## Features

- Automatically appends `rarelyFont` as a fallback font family in all CSS `font-family` and `font` declarations.
- Ensures `body` has a default font-family that includes `rarelyFont`.
- Includes a pre-defined global CSS file (`rarelyFont.css`) to make adding rare character font support simple.
- Provides the `SourceHanSerifSC-Regular.otf` file for easy deployment.

---

## Installation

Install the package via NPM or Yarn:

```bash
npm install postcss-rarely-font
```

or

```bash
yarn add postcss-rarely-font
```

---

## Usage

### 1. PostCSS Plugin

To use the plugin in your PostCSS workflow, add it to your PostCSS configuration file (e.g., `postcss.config.js`):

```javascript
const postcssRarelyFont = require('postcss-rarely-font');

module.exports = {
    plugins: [
        postcssRarelyFont({
            fontName: 'rarelyFont', // The fallback font family name
            defaultFont: 'Arial, sans-serif', // The default fallback font
        }),
    ],
};
```

### 2. Global CSS Import

Include the pre-defined `rarelyFont.css` file in your global styles to automatically load the font and define the fallback font family:

#### CSS Import:

```css
@import "postcss-rarely-font/css/rarelyFont.css";
```

#### HTML `<link>`:

```html
<link rel="stylesheet" href="postcss-rarely-font/css/rarelyFont.css">
```

---

## Static Assets

This package includes the following static files:

1. **CSS file**: `css/rarelyFont.css`  
   This file defines the `rarelyFont` font-family and sets it as the fallback font for the `body` element.

2. **Font file**: `fonts/SourceHanSerifSC-Regular.otf`  
   The font file supports rare Chinese characters (生僻字) and should be served with the CSS file.

---

## Example

### Input CSS:

```css
body {
    margin: 0;
}

h1 {
    font-family: 'Roboto', sans-serif;
}

p {
    font: italic 16px/1.5 'Times New Roman', serif;
}
```

### Output CSS (after using the plugin):

```css
body {
    margin: 0;
    font-family: Arial, sans-serif, rarelyFont;
}

h1 {
    font-family: 'Roboto', sans-serif, rarelyFont;
}

p {
    font: italic 16px/1.5 'Times New Roman', serif, rarelyFont;
}
```

---

## Font Usage

The `rarelyFont` family is included in this package to support rare Chinese characters. If you want to customize the font file, replace the `fonts/SourceHanSerifSC-Regular.otf` with your desired font file and update the `css/rarelyFont.css` file accordingly.

---

## Contributing

Contributions are welcome! If you encounter issues or have suggestions for improvements, feel free to open an issue or submit a pull request on [GitHub](https://github.com/your-repo/postcss-rarely-font).

---

## License

This project is licensed under the **MIT License**.

---

## Acknowledgments

- Font files are sourced from free and open-source font libraries such as [Source Han Sans](https://github.com/adobe-fonts/source-han-sans) or [Noto Sans CJK](https://fonts.google.com/noto/specimen/Noto+Sans+SC).
- Powered by [PostCSS](https://postcss.org/).