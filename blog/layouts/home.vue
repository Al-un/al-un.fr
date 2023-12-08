<template>
  <div>
    <LayoutAppHeader></LayoutAppHeader>
    <main class="home-body"><slot></slot></main>
  </div>
</template>

<style>
.home-body {
  max-width: var(--page-width);
  padding: 16px 24px;
  margin: 24px auto;
}
</style>
