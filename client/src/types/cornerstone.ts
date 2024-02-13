import { Types as csTypes } from "@cornerstonejs/core";
import { DataSet } from "dicom-parser";

export type IImage = { data: DataSet } & csTypes.IImage;
