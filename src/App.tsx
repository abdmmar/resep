import { StrictMode } from "react";
import { createStore } from "tinybase";
import { Provider, useCreateStore } from "tinybase/ui-react";
import { Inspector } from "tinybase/ui-react-inspector";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import type { RecipeSchema } from "./types";
import { RecipeForm } from "./RecipeForm";

export const App = () => {
	function onSubmit(values: RecipeSchema) {
		console.log(values);
	}

	const store = useCreateStore(() => {
		// Create the TinyBase Store and initialize the Store's data
		return createStore()
			.setValue("counter", 0)
			.setRow("pets", "0", { name: "fido", species: "dog" })
			.setTable("species", {
				dog: { price: 5 },
				cat: { price: 4 },
				fish: { price: 2 },
				worm: { price: 1 },
				parrot: { price: 3 },
			});
	});

	return (
		<StrictMode>
			<MantineProvider>
				<Provider store={store}>
					<div className="p-4">
						<RecipeForm onSubmit={onSubmit} />
					</div>
					<Inspector />
				</Provider>
			</MantineProvider>
		</StrictMode>
	);
};
