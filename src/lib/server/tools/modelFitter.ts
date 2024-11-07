import type { ConfigTool } from "$lib/types/Tool";
import { ObjectId } from "mongodb";
import vm from "node:vm";

const modelFitter: ConfigTool = {
	_id: new ObjectId("00000000000000000000000D"),
	type: "config",
	description: "Find the best rheology model that fits the user data",
	color: "blue",
	icon: "code",
	displayName: "Model Fitter",
	name: "modelFitter",
	endpoint: null,
	inputs: [
		{
			name: "equation",
			type: "str",
			description:
				"A mathematical expression to be evaluated. The result of the expression will be returned.",
			paramType: "required",
		},
	],
	outputComponent: null,
	outputComponentIdx: null,
	showOutput: false,
	async *call({ equation }) {
		try {
			const blocks = String(equation).split("\n");
			const query = blocks[blocks.length - 1].replace(/[^-()\d/*+.]/g, "");

			return {
				outputs: [{ calculator: `${query} = ${vm.runInNewContext(query)}` }],
			};
		} catch (cause) {
			throw new Error("Invalid expression", { cause });
		}
	},
};

export default modelFitter;
