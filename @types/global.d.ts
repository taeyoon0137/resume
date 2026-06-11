/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { FC, SVGProps, SVGSVGElement } from "react";

declare global {
  module "*.svg" {
    const component: FC<SVGProps<SVGSVGElement>>;
    export default component;
  }
}
