export default {
	async login(context, payload) {
		context.dispatch("auth", {
			...payload,
			mode: "login",
		});
	},
	async signup(context, payload) {
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlPue7HOFsWw6hZbExZ0u-EqcyQRqkU1I",
			{
				method: "POST",
				body: JSON.stringify({
					email: payload.email,
					password: payload.password,
					returnSecureToken: true,
				}),
			}
		);
		const responseData = await response.json();

		if (!response.ok) {
			console.log(responseData);
			const error = new Error(
				responseData.message || "Failed to authetticate. Check your login data"
			);
			throw error;
		}
		context.commit("setUser", {
			token: responseData.idToken,
			userId: responseData.localId,
			tokenExpiration: responseData.expiresIn,
		});
	},
	async auth(context, payload) {
		const mode = payload.mode;
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlPue7HOFsWw6hZbExZ0u-EqcyQRqkU1I";

		if (mode === "signup") {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlPue7HOFsWw6hZbExZ0u-EqcyQRqkU1I";
		}
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			}),
		});
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(
				responseData.message || "Failed to authetticate. Check your login data"
			);
			throw error;
		}
		context.commit("setUser", {
			token: responseData.idToken,
			userId: responseData.localId,
			tokenExpiration: responseData.expiresIn,
		});
	},
	logout(context) {
		context.commit("setUser", {
			token: null,
			userId: null,
			tokenExpiration: null,
		});
	},
};
