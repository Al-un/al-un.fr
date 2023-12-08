<template>
  <div>
    <LayoutAppHeader section="articles"></LayoutAppHeader>
    <main class="article-body"><slot></slot></main>
  </div>
</template>

<style>
.article-body {
  background-color: var(--bg-content);
  width: 100%;
  max-width: var(--content-width);
  padding: 16px 24px;
  margin: 24px auto;
  border-radius: 8px;

  line-height: 1.6;
  font-size: 18px;
  padding-bottom: 128px;
}

.article-body p,
.article-body ul {
  margin-bottom: 16px;
}

.article-body hr {
  width: 30%;
  margin: 36px auto;
}

/* ---------- Header ---------- */
.article-body h1,
.article-body h2,
.article-body h3,
.article-body h4 {
  font-weight: bold;
}

.article-body h1 {
  margin: 28px 0;
}

.article-body h2 {
  margin: 24px 0;
}

.article-body h3 {
  margin: 16px 0;
}

/* ---------- Anchor link ---------- */
.article-body h1 > a:hover,
.article-body h2 > a:hover,
.article-body h3 > a:hover,
.article-body h4 > a:hover {
  border-bottom: 1px solid var(--primary);
}

.article-body h1 > a::after,
.article-body h2 > a::after,
.article-body h3 > a::after,
.article-body h4 > a::after {
  content: "#";
  color: var(--primary);
  font-size: 90%;
  font-weight: bold;
  margin-left: 8px;
}

.article-body a:not(h1 > a, h2 > a, h3 > a, h4 > a) {
  color: var(--primary);
  text-decoration: var(--primary) dotted underline;
}

/* ---------- List ---------- */
.article-body li {
  list-style-type: disc;
  margin-left: 24px;
  margin-top: 12px;
}

/* ---------- Others ---------- */
.article-body blockquote {
  font-style: italic;
}
</style>
