<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user';
	import { login } from '$lib/services/user';

	let username = '';
	let password = '';
	let id = '';

	let unsubscribe;

	onMount(() => {
		unsubscribe = user.subscribe(($user) => {
			if ($user) {
				goto('/home');
			}
		});
	});

	const submit = async (event) => {
		event.preventDefault();
		try {
			const data = await login(id);
			user.update(() => ({ username: data.username, token: data.id }));
			localStorage.setItem('id', data.id);
			localStorage.setItem('isAdmin', data.isAdmin);
		} catch (error) {}
	};

	// Remember to unsubscribe when the component is destroyed
	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<main>
	<form>
		<label for="username">Username</label>
		<input type="text" name="username" id="username" bind:value={username} />

		<label for="password">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			autocomplete="current-password"
			bind:value={password}
		/>
		<label for="id">Id</label>
		<input type="text" name="id" id="id" bind:value={id} />
		<button type="submit" on:click={submit}>Submit</button>
	</form>
</main>
