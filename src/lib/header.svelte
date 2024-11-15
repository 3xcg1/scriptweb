<script>
	import { logOut, isLogged } from '../utilities/authentication.js';
	import { goto } from '$app/navigation';
	// import { themeChange } from 'theme-change'
	import { onMount } from 'svelte';
	import { darktheme } from '../lib/theme.js';

	// onMount(() => {
	//   themeChange(false)
	// })

	function signOut() {
		logOut();
		goto('/');
	}

	function logIn() {
		goto('/login');
	}

	//  let darkMode;

	//     onMount(async () => {
	//         if (
	//             localStorage.theme === 'dracula' ||
	//             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	//         ) {
	//             localStorage.setItem('theme', 'dracula');
	//             darkMode = true;
	//         } else if (
	//             localStorage.theme === 'cmyk' ||
	//             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)
	//         ) {
	//             localStorage.setItem('theme', 'cmyk');
	//             darkMode = false;
	//         }
	//         themeChange(false);
	//     });

	// let isChecked = false;

	// function toggleCheckboxes() {
	// 	isChecked = !isChecked;
	// }
	// toggleCheckboxes();
</script>

<div class="header">
	<div class="left-section">
		<div class="flex-container">
			<button class="btn btn-ghost">
				<a href="/" >
					<img src="/src/lib/img/logo.png" alt="Home" style="width: 80%; height: auto">
				</a>
			</button>
		</div>
	</div>

	<div class="right-section">
		<div class="flex-container">
			<button class="btn btn-ghost">
				<a href="/about">
					About 
				</a>
			</button>


			<button class="btn btn-ghost">
				<a href="/gitpreview">
					Preview
				</a>
			</button>

			<button class="btn btn-ghost">
				<a href="/overview">
					Overview
				</a>
			</button>

			<button class="btn btn-ghost">
				<a href="/dashboard">
					Dashboard
				</a>
			</button>

			{#if $isLogged === false}
				<button class="btn btn-ghost">
					<a href="/users/new"> 
						Create User 
					</a>
				</button>
			{/if}

			{#if $isLogged === true}
				<button class="btn btn-ghost" on:click={signOut}> 
					Log Out 
				</button>
			{:else}
				<button class="btn btn-ghost" on:click={logIn}> 
					Login 
				</button>
			{/if}
		</div>
	</div>

	<style scoped>
		.header {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			height: auto;
			min-width: 100px; /* Minimum width to prevent content overlap */
      		width: 100px; /* Adjust width as needed */
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0; /* Extend to bottom of viewport */
      		background-color: #f8f9fa; /* Adjust background color as needed */
      		padding: 1rem;
      		overflow-y: auto; /* Enable vertical scrolling if content overflows */
		}

		.flex-container {
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		.header .btn {
			width: 100%;
      		padding: 0; /* Optional: Remove padding to fit content snugly */
      		margin-bottom: 0.5rem; /* Optional: Adjust margin between buttons */
		}

		.header img {
     		/* Set both width and height */
      		width: 30%; /* Adjust size as needed */
      		height: auto; /* Maintain aspect ratio */
      		margin-bottom: 1rem; /* Optional: Add space below the logo */
    	}

	</style>
</div>
