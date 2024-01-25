import * as csCore from "@cornerstonejs/core";
import { MemoryRouter } from "react-router-dom";

import * as testUtils from "@utils/utils-for-tests";
import Routing from "@routes/Routing";
import { initCornerstone } from "../init";

// * fixing csWadoImageLoader and canvas issue, see https://github.com/cornerstonejs/cornerstoneWADOImageLoader/issues/441#issuecomment-1156214186
const script = global.document.createElement("script");
script.setAttribute("src", "/");
Object.defineProperty(global.document, "currentScript", { value: script });

describe("init corenerstone tests", () => {
  test('cornerstone core should be initialized after "initCornerstone" called', async () => {
    // * uses CPU for test to prevent GPU init failed
    csCore.setUseCPURendering(true);

    await initCornerstone();
    expect(csCore.isCornerstoneInitialized()).toBe(true);
  });
});
