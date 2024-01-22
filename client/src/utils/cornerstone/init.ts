import dicomParser from "dicom-parser";
import * as csCore from "@cornerstonejs/core";
import { Types as csTypes, Enums as csEnums } from "@cornerstonejs/core";
import csDcmImageLoader from "@cornerstonejs/dicom-image-loader";
import * as csTools from "@cornerstonejs/tools";

import { appPaths } from "@utils/global.vars";

const { origin } = window.location;
const { basePath } = appPaths;
const wadoBase = `wadouri:${basePath}/dcm/DX-cat`;
const catWadoIds = [
  `${wadoBase}/1.dcm`,
  `${wadoBase}/2.dcm`,
  `${wadoBase}/3.dcm`,
  `${wadoBase}/4.dcm`,
  `${wadoBase}/5.dcm`,
];

const rendererId = "meeting-renderer";
const viewportId = "meeting-stack-viewport";

const initCSLoader = () => {
  const { preferSizeOverAccuracy, useNorm16Texture } =
    csCore.getConfiguration().rendering;
  csDcmImageLoader.external.cornerstone = csCore;
  csDcmImageLoader.external.dicomParser = dicomParser;
  csDcmImageLoader.configure({
    useWebWorkers: true,
    decodeConfig: {
      convertFloatPixelDataToInt: false,
      use16BitDataType: preferSizeOverAccuracy || useNorm16Texture,
    },
  });

  const maxWebWorkers = navigator.hardwareConcurrency
    ? Math.min(navigator.hardwareConcurrency, 7)
    : 1;
  const config = {
    maxWebWorkers,
    startWebWorkersOnDemand: true,
    webWorkerTaskPaths: [
      `${origin}${basePath}/static/csDcmImageLoader/610.min.worker.js`,
      `${origin}${basePath}/static/csDcmImageLoader/945.min.worker.js`,
    ],
    taskConfiguration: {
      decodeTask: { initializeCodecsOnStartup: true, strict: false },
    },
  };
  csDcmImageLoader.webWorkerManager.initialize(config);
};

export const initCornerstone = async () => {
  initCSLoader();
  csTools.init();
  await csCore.init();
};

const getToolGroup = () => {
  const {
    PanTool,
    WindowLevelTool,
    StackScrollMouseWheelTool,
    ZoomTool,
    ToolGroupManager,
  } = csTools;

  csTools.addTool(PanTool);
  csTools.addTool(WindowLevelTool);
  csTools.addTool(StackScrollMouseWheelTool);
  csTools.addTool(ZoomTool);

  const toolGroup = ToolGroupManager.createToolGroup("meeting-tool-group");
  if (!toolGroup) return;

  toolGroup.addTool(WindowLevelTool.toolName);
  toolGroup.addTool(PanTool.toolName);
  toolGroup.addTool(ZoomTool.toolName);
  toolGroup.addTool(StackScrollMouseWheelTool.toolName);

  const { Primary, Auxiliary, Secondary } = csTools.Enums.MouseBindings;
  toolGroup.setToolActive(WindowLevelTool.toolName, {
    bindings: [{ mouseButton: Primary }], // Left Click
  });
  toolGroup.setToolActive(PanTool.toolName, {
    bindings: [{ mouseButton: Auxiliary }], // Middle Click
  });
  toolGroup.setToolActive(ZoomTool.toolName, {
    bindings: [{ mouseButton: Secondary }], // Right Click
  });
  toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

  toolGroup.addViewport(viewportId, rendererId);

  return toolGroup;
};

export const initCSDiv = async (element: HTMLDivElement) => {
  const type = csEnums.ViewportType.STACK;
  const viewportParams = { element, viewportId, type };
  const renderer = new csCore.RenderingEngine(rendererId);
  renderer.enableElement(viewportParams);

  const viewport = renderer.getViewport(viewportId) as csTypes.IStackViewport;
  await viewport.setStack(catWadoIds);
  viewport.render();

  const toolGroup = getToolGroup();
  if (!toolGroup) return;

  // const imageData = viewport.getImageData();
  // console.log(imageData);
};
