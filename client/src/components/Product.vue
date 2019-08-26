<template>  
<div class="container">
  <div class="row">
    <div class="col s12 m6 l3">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="https://images-na.ssl-images-amazon.com/images/I/411Fnbu%2BG2L._SX425_.jpg">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
          <p><a href="#">This is a link</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
          <p>Here is some more information about this product that is only revealed once clicked on.</p>
          <router-link :to="`/product/abc`" class="waves-effect waves-light btn-small">Detail</router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'Product'
}
</script>

<style>
.container {
  margin-top: 5rem;
}
</style>