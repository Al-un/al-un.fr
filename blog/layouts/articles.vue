<template>
  <div>
    <LayoutAppHeader></LayoutAppHeader>
    <!-- <LayoutAppHeader section="articles"></LayoutAppHeader> -->
    <main class="article-body"><slot></slot></main>
  </div>
</template>

<style>
.article-body {
  background-color: var(--bg-content);
  width: min(100%, var(--page-width));
  padding: 16px;
  margin: auto;

  line-height: 1.6;
  font-size: 18px;
  padding-block-end: 128px;
}

.article-body p,
.article-body ul {
  margin-block-end: 16px;
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

/* ---------- List ---------- */
.article-body li {
  list-style-type: disc;
  margin-left: 24px;
  margin-top: 12px;
}

/* ---------- Others ---------- */
.article-body blockquote {
  font-style: italic;
  border-left: 2px solid var(--divider);
  /* Override browser default */
  margin-block-start: 0;
  margin-block-end: 16px;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-block-start: 8px;
  padding-block-end: 8px;
  padding-inline-start: 16px;
}

.article-body blockquote p {
  margin: auto;
}
</style>
