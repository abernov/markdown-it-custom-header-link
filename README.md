# [markdown-it-custom-header-link](https://github.com/abernov/markdown-it-custom-header-link/)

[![npm](https://img.shields.io/npm/v/markdown-it-custom-header-link.svg)](https://www.npmjs.com/package/markdown-it-custom-header-link)

`markdown-it-custom-header-link` is a [VuePress](https://vuepress.vuejs.org/) plugin which created custom header links.

## Usage

### Local Installation

```bash
npm install markdown-it-custom-header-link
# OR
yarn add markdown-it-custom-header-link
```

### Add to vuepress `config.js`

```js
module.exports = {
  markdown: {
    plugins: [
      [require('markdown-it-custom-header-link')]
    ]
  }
}
```

### Using

Add a header to the markdown file `page.md` 
```
## my header <!-- link -->
```
This header is available at the url: `localhost:8080/page/#link` 

### Incompatibility

Vuepress `[[toc]]` will give incorrect links. Problem in vuepress plugin [markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents)