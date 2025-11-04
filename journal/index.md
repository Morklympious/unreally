---
outline: [2, 4]

footer: true
lastUpdated: true
next: false
prev: false
---

<script setup>
    import { data as posts } from "./data/posts.data.js";
</script>

<h1>All Blog Posts</h1>
<ul>
    <li v-for="post of posts">
        <div class="box">
        <a :href="post.url">{{ post.frontmatter.title }}</a>
        </div>
    </li>
</ul>
