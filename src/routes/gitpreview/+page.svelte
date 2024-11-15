<script>
    import { onMount } from 'svelte';
    let repoData = {};
  
    // Fetch repository data from GitHub API
    onMount(async () => {
      const response = await fetch('https://api.github.com/repos/username/repo-name');
      repoData = await response.json();
    });
</script>
  
  <main class="p-4">
    <h1 class="text-2xl font-bold">{repoData.name}</h1>
    <p>{repoData.description}</p>
    <div class="mt-4">
      <a href="{repoData.html_url}" target="_blank" class="btn btn-primary">View on GitHub</a>
    </div>
  
    <section class="mt-8">
      <h2 class="text-xl font-semibold">Preview</h2>
      <!-- Embed demo or screenshots here -->
      <iframe src="/path-to-your-demo" class="w-full h-96 border"></iframe>
    </section>
  </main>