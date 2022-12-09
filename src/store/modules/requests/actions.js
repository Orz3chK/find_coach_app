export default {
	async contactCoach(context, payload) {
		const newRequests = {
			userEmail: payload.email,
			message: payload.message,
		};

		const response = await fetch(
			`https://find-coach-app-74a43-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
			{
				method: "POST",
				body: JSON.stringify(newRequests),
			}
		);
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(
				responseData.message || "Failed to send request."
			);
			throw error;
		}

		console.log(responseData);

		newRequests.id = responseData.name;

		context.commit("addRequests", newRequests);
	},
	async fetchRequests(context) {
		const coachId = context.rootGetters.userId;
		const token = context.rootGetters.token;
		const response = await fetch(
			`https://find-coach-app-74a43-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` +
				token
		);
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(
				responseData.message || "Failed to fetch request."
			);
			throw error;
		}

		const requests = [];

		for (const key in responseData) {
			const request = {
				id: key,
				coachId: coachId,
				userEmail: responseData[key].userEmail,
				message: responseData[key].message,
			};
			requests.push(request);
		}

		context.commit("setRequests", requests);
	},
};
