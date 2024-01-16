<template>
  <div>
    <LayoutAppHeader></LayoutAppHeader>
    <main class="home-body"><slot></slot></main>
  </div>
</template>

<style>
.home-body {
  width: min(calc(100% - 16px), var(--page-width));
  background-color: var(--bg-content);
  border-radius: 8px;
  padding: 16px 16px 36px;
  margin: 16px auto;
}
</style>
