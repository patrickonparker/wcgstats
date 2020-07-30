<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar
				:class="$q.dark.isActive ? 'bg-black text-white' : 'text-black'"
			>
				<q-img src="~/assets/logo.png" width="40px" />
				<div
					class="column q-ml-sm"
					@click="$router.push('/')"
					style="cursor: pointer;"
				>
					<span style="margin-bottom: -6px;" class="text-subtitle1 text-bold">
						World Community Grid
					</span>
					<span class="text-caption text-accent text-bold text-uppercase">
						Your Contribution
					</span>
				</div>
				<q-space />
				<q-btn
					color="white"
					flat
					rounded
					icon="message"
					to="/contact"
					class="gt-sm"
					label="Contact"
				/>
				<q-btn
					color="white"
					flat
					round
					icon="message"
					to="/contact"
					class="lt-md"
				/>
				<q-btn
					color="white"
					flat
					rounded
					icon="account_circle"
					to="/account"
					class="gt-sm"
					:label="user"
				/>
				<q-btn
					color="white"
					flat
					round
					icon="account_circle"
					to="/account"
					class="lt-md"
				/>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
	export default {
		name: "MainLayout",
		data: () => ({ user: "" }),
		computed: {
			route() {
				return this.$route.path;
			},
		},
		mounted() {
			this.user = localStorage.user;
		},
		watch: {
			$route(to, from) {
				this.user = localStorage.user;
			},
		},
	};
</script>
