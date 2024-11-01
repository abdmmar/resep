import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { type RecipeSchema, recipeSchema } from "./types";
import {
	Button,
	Fieldset,
	Input,
	NativeSelect,
	NumberInput,
	TextInput,
} from "@mantine/core";
import { UNITS } from "./constants";
import React from "react";

const DEFAULT_INGREDIENTS_FORM_VALUE = {
	name: "",
	quantity: 1,
	unit: "g",
	price: 1000,
};

export const RecipeForm = ({
	onSubmit,
}: { onSubmit: (data: RecipeSchema) => void }) => {
	const form = useForm<RecipeSchema>({
		resolver: zodResolver(recipeSchema),
		defaultValues: {
			title: "",
			portions: 4,
			ingredients: [DEFAULT_INGREDIENTS_FORM_VALUE],
		},
	});
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
		{
			control: form.control, // control props comes from useForm (optional: if you are using FormContext)
			name: "ingredients", // unique name for your Field Array
		},
	);

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit, (errors) => {
				console.error(errors);
			})}
			className="space-y-4"
		>
			<Controller
				name="title"
				control={form.control}
				rules={{ required: true }}
				render={({ field }) => <TextInput label="Title" {...field} />}
			/>
			<Controller
				name="portions"
				control={form.control}
				rules={{ required: true }}
				render={({ field }) => <NumberInput label="Portion" {...field} />}
			/>
			<Fieldset
				legend={
					<div className="flex flex-row justify-between w-full items-center">
						<Input.Label htmlFor="ingredients.0.name">Ingredients</Input.Label>
						<Input.Description>
							{fields.length} {fields.length > 1 ? "ingredients" : "ingredient"}
						</Input.Description>
					</div>
				}
				variant="unstyled"
				className="flex flex-col gap-y-2 [&_legend]:w-full"
			>
				{fields.map((field, index) => (
					<React.Fragment key={field.id}>
						<div className="flex flex-col gap-y-2 p-2 border rounded-md bg-gray-50">
							<Controller
								name={`ingredients.${index}.name`}
								control={form.control}
								render={({ field }) => (
									<TextInput
										id={field.name}
										placeholder="Ingredient Name"
										{...field}
									/>
								)}
							/>
							<div className="grid grid-cols-2 gap-x-2">
								<div className="grid grid-cols-2">
									<Controller
										name={`ingredients.${index}.quantity`}
										control={form.control}
										render={({ field }) => (
											<TextInput
												className="[&_input]:rounded-r-none [&_input]:rounded-e-none"
												placeholder="Quantity"
												{...field}
											/>
										)}
									/>
									<Controller
										name={`ingredients.${index}.unit`}
										control={form.control}
										render={({ field }) => (
											<NativeSelect
												className="[&_select]:rounded-l-none [&_select]:rounded-s-none border-l-0"
												data={UNITS}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="flex flex-row gap-x-2">
									<Controller
										name={`ingredients.${index}.price`}
										control={form.control}
										render={({ field }) => (
											<NumberInput
												hideControls
												thousandSeparator="."
												decimalSeparator=","
												leftSection={<small>Rp</small>}
												{...field}
											/>
										)}
									/>
									<Button
										variant="default"
										disabled={fields.length === 1}
										onClick={() => remove(index)}
									>
										<Trash />
									</Button>
								</div>
							</div>
						</div>
					</React.Fragment>
				))}
				<Button
					variant="outline"
					onClick={() => append(DEFAULT_INGREDIENTS_FORM_VALUE)}
				>
					<Plus />
					Add More
				</Button>
			</Fieldset>
			<Button type="submit">Save</Button>
		</form>
	);
};
