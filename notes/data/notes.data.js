import { createContentLoader } from "vitepress";

export default createContentLoader("notes/unreal/**/*.md", {
    transform : (raw) => raw.filter(({ frontmatter }) => !frontmatter.exclude && !frontmatter.draft),
});
