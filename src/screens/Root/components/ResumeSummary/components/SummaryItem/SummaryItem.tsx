/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/stylex";

import { Icon, Linkable, Text } from "@/elements";

import { colors } from "../../../../../../styles/variable/colors.stylex";

import type { SummaryItemProps } from "./SummaryItem.type";

const SummaryItem = ({ title, info, caption, link, style, ...props }: SummaryItemProps) => {
  return (
    <article {...stylex.props(styles.container, style)} {...props}>
      {title && (
        <h4>
          <Text kind="heading-a1-bold" style={[styles.title, !!link && styles.titleLink]}>
            <Linkable href={link} target="_blank">
              {title}
              {link && (
                <span {...stylex.props(styles.titleLink)}>
                  &nbsp;
                  <Icon name="link" size={20} fill={colors.contentGrayA3} />
                </span>
              )}
            </Linkable>
          </Text>
        </h4>
      )}
      <Text kind="body-a3-regular" color={colors.contentGrayA2}>
        {info}
      </Text>
      <Text kind="body-a3-medium" color={colors.contentGrayA2} style={styles.date}>
        {caption}
      </Text>
    </article>
  );
};

const styles = stylex.create({
  container: {
    paddingBottom: 16,
  },
  title: {
    marginBottom: 6,
  },
  titleLink: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: colors.contentGrayA3,
  },
  date: {
    marginTop: 6,
    textDecoration: "none",
  },
  dateSeparator: {
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    width: 1,
    height: 10,
    backgroundColor: colors.lineSeparatorStroke,
  },
});

export default SummaryItem;
