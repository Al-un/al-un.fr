<template>
  <div class="pouet">
    <super-button @click="onClick">{{ msg }}</super-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pouet",
  props: {
    msg: String,
  },
  setup(){
    return {
      onClick(){
        console.log("CLICK! CLICK!")
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
