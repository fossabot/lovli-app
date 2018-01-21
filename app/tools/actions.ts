import { createAction } from 'redux-actions';

import { Tool } from './model';

import {
  ADD_TOOL,
  DELETE_TOOL,
  TOOLS_UPDATE_STATE,
  TOOLS_ENABLE_TOOL,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from './constants/ActionTypes';

const addTool = createAction<Tool, string>(
  ADD_TOOL,
  (text: string) => ({ text, enabled: false, state: 0, command: '' })
);

const deleteTool = createAction<Tool, Tool>(
  DELETE_TOOL,
  (tool: Tool) => tool
);

const updateToolState = createAction<Tool, Tool, number>(
  TOOLS_UPDATE_STATE,
  (tool: Tool, newState: number) => ({ ...tool, state: newState })
);

const enableTool = createAction<Tool, Tool>(
  TOOLS_ENABLE_TOOL,
  (tool: Tool) => tool
)

const completeAll = createAction<void>(
  COMPLETE_ALL,
  () => { }
)

const clearEnabled = createAction<void>(
  CLEAR_COMPLETED,
  () => { }
);

export {
  addTool,
  deleteTool,
  updateToolState,
  enableTool,
  completeAll,
  clearEnabled
}
