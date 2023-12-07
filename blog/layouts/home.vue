<template>
  <div>
    <LayoutAppHeader></LayoutAppHeader>
    <main class="home-body"><slot></slot></main>
  </div>
</template>

<style>
.home-body {
  max-width: 960px;
  padding: 16px 24px;
  margin: 24px auto;
}
</style>
