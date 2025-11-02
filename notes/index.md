---
outline: [2, 4]

footer: true
lastUpdated: true
next: false
prev: false
index: true
---


<script setup>
    import { data as posts } from "./data/notes.data.js";
</script>


# My Notes
<ul>
    <li v-for="post of posts">
        <a :href="post.url">{{ post.frontmatter.title }}</a>
    </li>
</ul>
