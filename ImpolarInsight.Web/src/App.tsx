import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./i18n";
import { ApiProvider } from "./components/ApiProvider";
import { AuthGuard, AuthProvider } from "./components/AuthProvider";
import pageUrlsArray from "./RoutesAndUrls";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
	return (
		<AuthProvider>
			<AuthGuard>
				<ApiProvider>
					<ThemeProvider>
						<div className="h-full">
							<div className="relative flex">
								<Router>
									<Routes>
										{pageUrlsArray.map((route) => (
											<Route key={route.urlPath} path={route.urlPath} element={route.component} />
										))}
									</Routes>
								</Router>
							</div>
						</div>
					</ThemeProvider>
				</ApiProvider>
			</AuthGuard>
		</AuthProvider>
	);
};

export default App;