"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/stylex";
import Image from "next/image";

import { Icon, Linkable, Text } from "@/elements";

import { colors } from "../../styles/variable/colors.stylex";
import { spaces } from "../../styles/variable/spaces.stylex";

import type { ReceivedItemProps } from "./ReceivedItem.type";

/**
 * ### ReceivedItem
 *
 * 각 프로젝트 요소를 표현하는 컴포넌트입니다.
 *
 * @param props {@link ReceivedItemProps}
 * @component
 */
const ReceivedItem = ({ title, info, date, thumbnail, link }: ReceivedItemProps) => {
  return (
    <article {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.info)}>
        <h4>
          <Text kind="title-a2-bold" style={[styles.title, !!link && styles.titleLink]}>
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
        <Text color={colors.contentGrayA2} style={styles.info}>
          {info}
        </Text>
        <Text kind="body-a2-regular" color={colors.contentGrayA2} style={styles.date}>
          {date}
        </Text>
      </div>
      {thumbnail && (
        <figure {...stylex.props(styles.thumbnail)}>
          <Image src={thumbnail} alt={title} fill />
        </figure>
      )}
    </article>
  );
};

const MOBILE = "@media (max-width: 640px)";
const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  container: {
    flexDirection: {
      default: "row",
      [MOBILE]: "column-reverse",
    },
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingTop: 12,
    paddingBottom: 32,
    columnGap: 40,
    rowGap: 16,
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
  info: {
    marginTop: 2,
  },
  orgLink: {
    display: "inline",
  },
  orgLinkable: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: colors.contentGrayA3,
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  summary: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  summaryItem: {
    "::before": {
      content: "'•'",
      display: "flex",
      marginLeft: 6,
      marginRight: 6,
      color: colors.contentGrayA2,

      // "body-a2-regular"
      fontSize: 15,
      fontWeight: 400,
      letterSpacing: 0.02,
      lineHeight: "160%",
    },

    flexDirection: "row",
  },
  date: {
    marginTop: 8,
  },
  durationSeparator: {
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    width: 1,
    height: 10,
    backgroundColor: colors.lineSeparatorStroke,
  },
  thumbnail: {
    position: "relative",
    width: {
      default: 240,
      [TABLET]: 200,
      [MOBILE]: "auto",
    },
    alignSelf: {
      default: "flex-start",
      [MOBILE]: "auto",
    },
    aspectRatio: "16 / 9",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.lineOutline,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default ReceivedItem;
