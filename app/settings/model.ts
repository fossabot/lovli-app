
export type ToolSettings = {
	runToolChecks: boolean;
	restartingChecks: boolean;
	running: number[];
};

export type Settings = {
	tools: ToolSettings;
};

export type IState = Settings;

export enum TypeKeys {
	RESTART_CHECKS = "App/RESTART_CHECKS",
	TOOLS_ENABLE_TOOL = "TOOLS_ENABLE_TOOL",
	OTHER_ACTION = "__any_other_action_type__"
}
