import dicomParser from "dicom-parser";
import * as csCore from "@cornerstonejs/core";
import { Types as csTypes, Enums as csEnums } from "@cornerstonejs/core";
import csDcmImageLoader from "@cornerstonejs/dicom-image-loader";
// import * as csTools from "@cornerstonejs/tools";

import { appPaths } from "@utils/global.vars";

const { preferSizeOverAccuracy, useNorm16Texture } =
  csCore.getConfiguration().rendering;
// const {
//   PanTool,
//   WindowLevelTool,
//   StackScrollMouseWheelTool,
//   ZoomTool,
//   ToolGroupManager,
// } = csTools;
// const { MouseBindings } = csTools.Enums;

const initCSLoader = () => {
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
    startWebWorkersOnDemand: false,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        strict: false,
      },
    },
  };
  csDcmImageLoader.webWorkerManager.initialize(config);
};

// const initVolumeLoader = () => {
//   csCore.volumeLoader.registerUnknownVolumeLoader(
//     cornerstoneStreamingImageVolumeLoader
//   );
//   csCore.volumeLoader.registerVolumeLoader(
//     "cornerstoneStreamingImageVolume",
//     cornerstoneStreamingImageVolumeLoader
//   );
//   csCore.volumeLoader.registerVolumeLoader(
//     "cornerstoneStreamingDynamicImageVolume",
//     cornerstoneStreamingDynamicImageVolumeLoader
//   );
// };

export const initCornerstone = async () => {
  initCSLoader();
  await csCore.init();
};

const wadoBase = `wadouri:${appPaths.basePath}/dcm/DX-cat`;
const catWadoIds = [
  `${wadoBase}/1.dcm`,
  `${wadoBase}/2.dcm`,
  `${wadoBase}/3.dcm`,
  `${wadoBase}/4.dcm`,
  `${wadoBase}/5.dcm`,
];

export const rendererId = "meeting-renderer";
export const initCSDiv = async (element: HTMLDivElement) => {
  const viewportId = "STACK";
  const type = csEnums.ViewportType.STACK;
  const viewportParams = { element, viewportId, type };
  const renderer = new csCore.RenderingEngine(rendererId);
  renderer.enableElement(viewportParams);

  const viewport = renderer.getViewport(viewportId) as csTypes.IStackViewport;
  await viewport.setStack(catWadoIds);

  // Set the VOI of the stack
  // viewport.setProperties({ voiRange: ctVoiRange });

  viewport.render();

  // toolGroup.addViewport(viewportId, renderingEngineId);
};

// TODO: tools
// const addTools = () => {
//   csTools.addTool(PanTool);
//   csTools.addTool(WindowLevelTool);
//   csTools.addTool(StackScrollMouseWheelTool);
//   csTools.addTool(ZoomTool);

//   // Define a tool group, which defines how mouse events map to tool commands for
//   // Any viewport using the group
//   const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

//   // Add tools to the tool group
//   toolGroup.addTool(WindowLevelTool.toolName);
//   toolGroup.addTool(PanTool.toolName);
//   toolGroup.addTool(ZoomTool.toolName);
//   toolGroup.addTool(StackScrollMouseWheelTool.toolName);

//   // Set the initial state of the tools, here all tools are active and bound to
//   // Different mouse inputs
//   toolGroup.setToolActive(WindowLevelTool.toolName, {
//     bindings: [
//       {
//         mouseButton: MouseBindings.Primary, // Left Click
//       },
//     ],
//   });
//   toolGroup.setToolActive(PanTool.toolName, {
//     bindings: [
//       {
//         mouseButton: MouseBindings.Auxiliary, // Middle Click
//       },
//     ],
//   });
//   toolGroup.setToolActive(ZoomTool.toolName, {
//     bindings: [
//       {
//         mouseButton: MouseBindings.Secondary, // Right Click
//       },
//     ],
//   });
//   // As the Stack Scroll mouse wheel is a tool using the `mouseWheelCallback`
//   // hook instead of mouse buttons, it does not need to assign any mouse button.
//   toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);
// };
