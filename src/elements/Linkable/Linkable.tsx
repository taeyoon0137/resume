/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
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
  if (!href) {
    return <div {...stylex.props(style)}>{children}</div>;
  }

  const linkRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;

  return (
    <Link href={href} target={target} rel={linkRel} {...stylex.props(style)} {...props}>
      {children}
    </Link>
  );
};

export default Linkable;
