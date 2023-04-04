<template>
    <b-btn class="button" @click="onClick" size="sm" variant="light"
      ><b-icon-arrow-left
    /></b-btn>
  </template>
  
  <script>
  export default {
    methods: {
      onClick() {
        this.$router.back();
      },
    },
  };
  </script>
  
  <style>
  .button {
    border: 1px solid black;
    width: 50px;
    height: 50px;
    font-size: 25px;
  }
  </style>
  