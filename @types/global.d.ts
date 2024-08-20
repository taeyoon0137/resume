/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { FC, SVGProps, SVGSVGElement } from "react";

declare global {
  module "*.svg" {
    const component: FC<SVGProps<SVGSVGElement>>;
    export default component;
  }
}
