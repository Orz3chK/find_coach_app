import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCouch from "./pages/requests/ContactCouch.vue";
import RequestsReceive from "./pages/requests/RequestsReceive.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/coaches" },
		{ path: "/coaches", component: CoachesList },
		{
			path: "/coaches/:id",
			props: true,
			component: CoachDetail,
			children: [{ path: "contact", component: ContactCouch }],
		}, // /coaches/c1/contact
		{ path: "/register", component: CoachRegistration },
		{ path: "/requests", component: RequestsReceive },
		{ path: "/:notFound(.*)", component: NotFound },
	],
});

export default router;
