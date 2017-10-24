<template>
  <div class="jumbotron jumbotron-fluid home-page">
    <div class="container text-center">
      <h1 class="display-3">Touist <span class="version">{{ config.version }}</span></h1>
      <!-- <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p> -->
      <router-link to="/editor" class="btn btn-primary btn-lg">Commencer</router-link>
    </div>
  </div>
</template>

<script>
import config from '@/config';

export default {
  name: 'HelloWorld',
  data: () => ({
    config,
  }),
};
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  margin-bottom: 0;

  .version {
    font-size: 40px;
  }
}

</style>
