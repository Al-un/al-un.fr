<template>
  <div>
    <LayoutAppHeader section="articles"></LayoutAppHeader>
    <h2>Articles</h2>
    <NuxtLink to="/articles">All articles</NuxtLink>

    <main class="article-body"><slot></slot></main>
  </div>
</template>

<style>
.article-body {
  width: 100%;
  max-width: 720px;
  margin: auto;

  line-height: 1.6;
  font-size: 18px;
  padding-bottom: 128px;
}

p,
ul {
  margin-bottom: 16px;
}

hr{
  width: 30%;
  margin: 36px auto;
}

/* ---------- Header ---------- */
h1,
h2,
h3,
h4 {
  margin: initial;
  font-weight: bold;
}

/* ---------- Anchor link ---------- */
h1 > a::after,
h2 > a::after,
h3 > a::after,
h4 > a::after {
  content: "#";
  color: var(--primary);
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
}

a:not(h1 > a, h2 > a, h3 > a, h4 > a) {
  color: var(--primary);
}

/* ---------- List ---------- */
li {
  list-style-type: disc;
  margin-left: 24px;
  margin-top: 12px;
}

/* ---------- Code blocks ---------- */

/* For all code blocks */
code {
  font-size: 12px;
  background-color: #f4f4f4;
}

/* Multi-line code blocks are wrapped with a <pre> */
pre {
  background-color: #f4f4f4;
  border: 1px solid var(--divider);
  border-radius: 4px;
  overflow-x: auto;
  padding: 16px;
}

/* 
Inline codes are not wrapped
See https://stackoverflow.com/a/76197588/4906586 
*/
code:not(pre code) {
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
