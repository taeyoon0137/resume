"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from "react";

/**
 * ### ModalContext
 *
 * layout 상단에 Modal이 렌더링 중인지 여부를 수신하는 컨텍스트입니다.
 */
export const ModalContext = createContext<React.Dispatch<React.SetStateAction<string[]>>>(() => {});

/**
 * ### IsModalOpenContext
 *
 * layout 상단에 Modal이 렌더링 중인지 여부를 전달하는 컨텍스트입니다.
 */
export const IsModalOpenContext = createContext<boolean>(false);
