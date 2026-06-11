/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stylex from "@stylexjs/stylex";
import Link from "next/link";

import type { LinkableProps } from "./Linkable.type";

/**
 * ### Linkable
 *
 * 링크를 연결 가능한 컴포넌트입니다.
 * 링크를 제공하지 않으면 일반 컴포넌트로 동작합니다.
 *
 * @param props {@link LinkableProps}
 * @component
 */
const Linkable = ({ href, style, children, target, rel, ...props }: LinkableProps) => {
  // 인라인 문맥(span, 제목)에서도 유효한 마크업이 되도록 span으로 렌더링합니다.
  if (!href) {
    return <span {...stylex.props(style)}>{children}</span>;
  }

  const linkRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;

  return (
    <Link href={href} target={target} rel={linkRel} {...stylex.props(style)} {...props}>
      {children}
    </Link>
  );
};

export default Linkable;
