<template>  
  <nav>
    <div class="nav-wrapper">
      <a class="brand-logo">Logo</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Cart</a></li>
        <li><a href="collapsible.html">Login</a></li>
        <li><a href="badges.html">Register</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style scoped>
.brand-logo {
    margin-left: 2rem;
}

#nav-mobile li {
    margin-right: 1rem;
}

</style>