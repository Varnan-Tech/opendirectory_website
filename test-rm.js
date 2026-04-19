const { unified } = require('unified');
const remarkParse = require('remark-parse');
const remarkGfm = require('remark-gfm');
const remarkRehype = require('remark-rehype');
const rehypeStringify = require('rehype-stringify');

const markdown = 'https://github.com/user-attachments/assets/ee98a1b5-ebc4-452f-bbfb-c434f2935067';

unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(markdown)
  .then((file) => console.log(String(file)));