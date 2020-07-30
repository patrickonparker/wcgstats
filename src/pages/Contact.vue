<template>
	<q-page padding>
		<q-form
			@submit="onSubmit"
			@reset="onReset"
			class="q-gutter-md"
			action="https://formsubmit.co/info@patrickonparker.com"
			method="POST"
		>
			<q-card class="q-pb-sm" style="max-width: 600px; margin: 2rem auto;">
				<q-card-section>
					<h1 class="text-h4 q-mt-none">Contact</h1>
					<q-input
						filled
						name="Name"
						label="Name *"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please enter your name.',
						]"
						v-model="name"
						class="q-mb-md"
					/>
					<q-input
						filled
						type="email"
						name="Email"
						label="Email Address *"
						lazy-rules
						:rules="[(val) => !!val || 'Email is missing', isValidEmail]"
						v-model="email"
						class="q-mb-md"
					/>
					<q-input
						filled
						name="Message"
						label="Message *"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please enter a message.',
						]"
						v-model="message"
						type="textarea"
					/>
					<input type="text" name="_honey" style="display: none;" />
					<input
						type="hidden"
						name="_next"
						value="https://wcgstats.netlify.app/"
					/>
				</q-card-section>
				<q-card-actions>
					<q-btn
						label="Submit"
						type="submit"
						color="accent"
						rounded
						class="q-ml-sm q-px-md"
					/>
					<q-space />
					<q-btn
						label="Reset"
						type="reset"
						color="primary"
						flat
						class="q-ml-sm"
					/>
				</q-card-actions>
			</q-card>
		</q-form>
	</q-page>
</template>

<script>
	export default {
		name: "Contact",
		data: () => ({ name: "", email: "", message: "" }),
		methods: {
			isValidEmail() {
				const emailRegex = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
				return (
					emailRegex.test(this.email) || "Please enter a valid email address"
				);
			},
		},
	};
</script>