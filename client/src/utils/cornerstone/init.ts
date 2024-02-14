import dicomParser from "dicom-parser";
import * as csCore from "@cornerstonejs/core";
import { Types as csTypes, Enums as csEnums } from "@cornerstonejs/core";
import csDcmImageLoader from "@cornerstonejs/dicom-image-loader";
import * as csTools from "@cornerstonejs/tools";

import {
  appPaths,
  catWadoIds,
  RENDERER_ID,
  VIEWPORT_ID,
} from "@utils/global.vars";
import { IImage } from "@src/types/cornerstone";

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
  const { origin } = window.location;
  const { basePath } = appPaths;
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
  const result = await csCore.init();
  if (!result) throw new Error("Initialize cornerstone core failed");
};

export const initCSDiv = async (csDiv: HTMLDivElement) => {
  const enabled = csCore.getEnabledElement(csDiv);
  if (enabled) return;

  const type = csEnums.ViewportType.STACK;
  const viewportParams = { element: csDiv, viewportId: VIEWPORT_ID, type };
  const renderer = new csCore.RenderingEngine(RENDERER_ID);
  renderer.enableElement(viewportParams);

  const viewport = renderer.getViewport(VIEWPORT_ID) as csTypes.IStackViewport;
  await viewport.setStack(catWadoIds);
  viewport.render();

  csDiv.addEventListener(csEnums.Events.IMAGE_RENDERED, onRenderedTest);
};

const onRenderedTest = (ev: Event) => {
  const { detail } = ev as csTypes.EventTypes.ImageRenderedEvent;
  const { renderingEngineId, viewportId } = detail;
  const renderer = csCore.getRenderingEngine(renderingEngineId);
  if (!renderer) return;
  const viewport = renderer.getViewport(viewportId) as csTypes.IStackViewport;
  if (!viewport || !viewport.getCornerstoneImage) return;
  const image = viewport.getCornerstoneImage() as IImage;
  const dataset = image.data;
  const transferSyntax = dataset.string("x00020010");
  console.log(detail, viewport, transferSyntax);
};
