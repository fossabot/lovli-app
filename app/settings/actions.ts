import {
	TypeKeys
} from './model';
import { Tool } from '../tools/model';

export interface RestartChecksAction {
	type: TypeKeys.RESTART_CHECKS;
	restart: boolean;
}

export interface UpdateToolSettings {
	type: TypeKeys.TOOLS_ENABLE_TOOL;
	tool: Tool;
}
export interface OtherAction {
    type: TypeKeys.OTHER_ACTION;
  }



export const restartToolChecks = (shouldRestart: boolean): RestartChecksAction => ({
  type: TypeKeys.RESTART_CHECKS,
  restart: shouldRestart
})
