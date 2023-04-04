<template>
    <b-link :to="link">
      <b-card
        class="button"
        border-variant="primary"
      >
        <div class="button-title">
          <h5>{{ title }}</h5>
        </div>
        <b-icon
          :icon="icon"
          font-scale="2.5"
          class="button-icon"
        />
      </b-card>
    </b-link>
   </template>
      
  <script>
    export default {
      props: {
        title: {
          type: String,
          required: true
        },
        link: {
          type: Object,
          required: true
        },
        icon: {
          type: String,
          required: true
        }
      }
    };
  </script>
    
  <style scoped>
  .button-icon {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
    
  .button-title {
    position: relative;
    width: 100%;
    height: 100%;
  }
    
  .button-title h5 {
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 0px;
    text-align: end;
  }
    
  .card {
    box-shadow: 2px 2px 4px rgba(0, 0, 139, 0.4);
    height: 200px;
    width: 100%;
    margin: auto;
  }
    
  .card:hover {
    background-color: lightseagreen;
    color: white;
  }
  </style>
    