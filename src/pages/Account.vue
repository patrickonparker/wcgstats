<template>
	<q-page padding class="column items-center justify-center login-page">
		<q-card style="width: 400px; max-width: 90vw;" class="q-pb-sm">
			<q-card-section>
				<div class="text-h4 q-mb-sm" v-if="loggedIn">
					Your Account
				</div>
				<div class="text-h4 q-mb-sm" v-else>
					Login
				</div>
				<p v-if="loggedIn">
					You are logged in as {{ user }}. To log in with a different account,
					simply enter new credentials below.
				</p>
				<p v-else>
					Your WCG account information is stored securely in your browser and is
					not stored in any database or shared with any third party.
				</p>
				<p>
					You can copy your verification code from your
					<a
						href="https://www.worldcommunitygrid.org/ms/viewMyProfile.do"
						class="text-accent"
						target="_blank"
					>
						profile page
					</a>
					<span>.</span>
				</p>
				<q-input
					filled
					v-model="user"
					label="Username"
					class="q-mb-sm"
					color="accent"
					@keydown.enter="goToResults"
				/>
				<q-input
					filled
					v-model="auth"
					label="Verification Code"
					color="accent"
					@keydown.enter="goToResults"
				/>
			</q-card-section>
			<q-card-actions>
				<q-btn
					color="accent"
					class="q-ml-sm q-px-sm"
					rounded
					@click="goToResults"
					v-if="loggedIn"
				>
					Save Credentials
				</q-btn>
				<q-btn
					color="accent"
					class="q-ml-sm q-px-sm"
					@click="goToResults"
					v-else
				>
					Login
				</q-btn>
				<q-space />
				<q-btn color="accent" to="/" v-if="loggedIn" flat>Go Back</q-btn>
			</q-card-actions>
		</q-card>
	</q-page>
</template>

<script>
	export default {
		name: "Account",
		data: () => ({ user: "", auth: "", loggedIn: false }),
		mounted() {
			if (localStorage.user && localStorage.auth) {
				this.loggedIn = true;
			}
			if (localStorage.user) {
				this.user = localStorage.user;
			}
			if (localStorage.auth) {
				this.auth = localStorage.auth;
			}
		},
		methods: {
			goToResults() {
				localStorage.user = this.user;
				localStorage.auth = this.auth;
				this.$router.push("/");
			},
		},
	};
</script>

<style>
	.login-page {
		background: url("~assets/earth.jpg") no-repeat center center/cover;
	}

	.login-page .q-card {
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(5px);
		box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.66);
	}
</style>