import * as csTools from "@cornerstonejs/tools";
import { ToolOptionsType } from "@cornerstonejs/tools/dist/types/types";

import { RENDERER_ID, VIEWPORT_ID, TOOL_GROUP_ID } from "@utils/global.vars";

const { addTool, state, ToolGroupManager, StackScrollMouseWheelTool } = csTools;

const addToCSTool = (
  tool: { toolName: string },
  group: csTools.Types.IToolGroup
) => {
  // * add tool to csTools
  const { toolName } = tool;
  if (!state.tools[toolName]) addTool(tool);
  // * add tool to toolGroup
  const toolOption = group.getToolOptions(toolName);
  if (!toolOption) group.addTool(toolName);
};

const activeOtherTool = (group: csTools.Types.IToolGroup) => {
  const ssmwName = "StackScrollMouseWheel";
  const ssmwTool = group.getToolOptions(ssmwName);
  if (!ssmwTool || ssmwTool.mode !== "Active") {
    addToCSTool(StackScrollMouseWheelTool, group);
    group.setToolActive(ssmwName);
  }
};

// * init toolGroup and add "StackScrollMouseWheelTool"
const getToolGroup = () => {
  const group =
    ToolGroupManager.getToolGroup(TOOL_GROUP_ID) ||
    ToolGroupManager.createToolGroup(TOOL_GROUP_ID);
  if (!group) {
    console.warn(`Failed to create tool group`);
    return;
  }
  group.addViewport(VIEWPORT_ID, RENDERER_ID);
  activeOtherTool(group);
  return group;
};

type MouseBindings = typeof csTools.Enums.MouseBindings;
const passiveOtherTools = (
  group: csTools.Types.IToolGroup,
  mouseBinding: MouseBindings[keyof MouseBindings],
  toolToActive: string
) =>
  Object.entries(group.toolOptions).forEach(([name, opt]) => {
    const option = opt as ToolOptionsType;
    const { bindings, mode } = option;
    const hasBinding = bindings.find((b) => b.mouseButton === mouseBinding);
    if (!hasBinding || mode !== "Active" || name === toolToActive) return;
    group.setToolPassive(name);
  });

export const activeTool = (toolName: string) => {
  // TODO: might have other way to get tools from csTool?
  const tool = (csTools as any)[`${toolName}Tool`];
  if (!tool) {
    console.warn(`Can't find tool: ${toolName}`);
    return;
  }

  const group = getToolGroup();
  if (!group) {
    console.warn(`Failed to create tool group`);
    return;
  }
  addToCSTool(tool, group);

  // Left Click
  const { Primary } = csTools.Enums.MouseBindings;
  passiveOtherTools(group, Primary, toolName);
  group.setToolActive(toolName, { bindings: [{ mouseButton: Primary }] });
};
