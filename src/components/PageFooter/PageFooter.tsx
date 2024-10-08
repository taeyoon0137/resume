/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/stylex";
import Link from "next/link";

import { content } from "@/contents";
import { Icon, Text } from "@/elements";

import { colors } from "../../styles/variable/colors.stylex";
import { spaces } from "../../styles/variable/spaces.stylex";

/**
 * ### Page Footer
 *
 * 페이지 하단에 위치하는 푸터 컴포넌트입니다.
 *
 * @component
 */
const PageFooter = () => {
  return (
    <footer {...stylex.props(styles.footer)}>
      <Text color={colors.contentGrayA3}>{content.info.copyrights}</Text>
      <ul {...stylex.props(styles.contact)}>
        {content.contacts.map((contactGroup) =>
          contactGroup.map((contact) => (
            <Link key={contact.link} href={contact.link} target="_blank">
              <Icon name={contact.icon} style={styles.contactItem} />
            </Link>
          )),
        )}
      </ul>
    </footer>
  );
};

const MOBILE = "@media (max-width: 640px)";
// const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  footer: {
    flexDirection: {
      default: "row",
      [MOBILE]: "column",
    },
    justifyContent: "space-between",
    alignItems: {
      default: "center",
      [MOBILE]: "flex-start",
    },
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingTop: 12,
    paddingBottom: spaces.paddingVertical,
  },
  contact: {
    flexDirection: "row",
    marginTop: {
      default: 0,
      [MOBILE]: 16,
    },
    gap: 16,
  },
  contactItem: {
    color: {
      default: colors.contentGrayA3,
      ":hover": colors.contentGrayA1,
    },
    transition: {
      default: "color 120ms",
      ":hover": "color 400ms",
    },
  },
});

export default PageFooter;
