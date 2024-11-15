<script>
    import "../app.css";
    import Header from "../lib/header.svelte";

</script>

<div class='layout'>
  <Header />

  <main>
    <slot />
  </main>
</div>

<style>
  .layout {
    display: flex;
    min-height: 100vh; /* Ensure full viewport height */
  }

  main {
    flex: 1; /* Allow main content to take remaining space */
    padding: 1rem;
    margin-left: 200px; /* Adjust margin to account for side navigation width */
  }
</style>
