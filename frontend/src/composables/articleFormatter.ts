import { Ref, computed } from 'vue';
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import Hljs from 'highlight.js';

function formatPublished(published: string): string {
  const date = new Date(published);
  return date.toDateString();
}

function formatContent(content: string): string {
  const mdRenderer = MarkdownIt('default', {
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {
      if (lang && Hljs.getLanguage(lang)) {
        try {
          return Hljs.highlight(lang, str, true).value;
        } catch (e) { console.error(e); }
      }
      return '';
    },
  }).use(MarkdownItAnchor, {});
  return mdRenderer.render(content);
}

export default function useArticleFormatter(
  published: Ref<string>,
  content: Ref<string> | undefined = undefined,
) {
  return {
    publishedFormatted: computed(() => formatPublished(published.value)),
    contentFormatted: computed(() => (content ? formatContent(content.value) : undefined)),
  };
}
