import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./i18n";
import { ApiProvider } from "./components/ApiProvider";
import { AuthGuard, AuthProvider } from "./components/AuthProvider";
import { MantineProvider } from "@mantine/core";
import pageUrlsArray from "./RoutesAndUrls";

const App = () => {
	return (
		<AuthProvider>
			<AuthGuard>
		<div className="h-full">
			<div className="relative flex ">
				<Router>
					<Routes>
						{pageUrlsArray.map((route) => (
							<Route key={route.urlPath} path={route.urlPath} element={route.component} />
						))}
					</Routes>
				</Router>
			</div>
		</div>
		</AuthGuard>
		</AuthProvider>
	);
};

export default App;
