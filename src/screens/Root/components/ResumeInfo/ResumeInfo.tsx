/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Fragment } from "react";

import stylex from "@stylexjs/stylex";
import Link from "next/link";

import { content } from "@/contents";
import { Icon, Text } from "@/elements";

import { colors } from "../../../../styles/variable/colors.stylex";
import { spaces } from "../../../../styles/variable/spaces.stylex";

import type { ResumeInfoProps } from "./ResumeInfo.type";
import type { StyleXVar } from "@stylexjs/stylex/lib/StyleXTypes";

/**
 * ### 이력서 정보
 *
 * 이력서 상단에 표시할 이름, 최근 회사, 연락처 등의 정보를 표시합니다.
 */
const ResumeInfo = ({ style }: ResumeInfoProps) => {
  return (
    <section {...stylex.props(styles.container, style)}>
      <ResumeName />
      <ResumeJob />
      <ResumeContact />
    </section>
  );
};

/**
 * ### 이름
 *
 * 이력서 상단에 표시할 이름입니다.
 */
const ResumeName = () => {
  return (
    <h2>
      <Text kind="display-a1-bold" style={styles.name}>
        {content.info.name}
      </Text>
    </h2>
  );
};

/**
 * ### 최근 회사
 *
 * 이름 하단에 표시할 최근 회사 정보입니다.
 */
const ResumeJob = () => {
  return (
    <div {...stylex.props(styles.jobContainer)}>
      <Text kind="body-a1-medium">
        {content.job.roles.map((role, i) => {
          if (i === 0)
            return (
              <Text key={role} style={styles.jobTitle}>
                {role}
              </Text>
            );
          return (
            <Fragment key={role}>
              {/* 구분자 */}
              <Text kind="body-a1-regular" color={colors.contentGrayA2} style={styles.jobTitleSeparator}>
                &
              </Text>
              <Text style={styles.jobTitle}>{role}</Text>
            </Fragment>
          );
        })}
        <Link href={content.job.link} {...stylex.props(styles.link(colors.contentTintBlueA2), styles.jobCompany)}>
          <Text kind="body-a1-medium" color={colors.contentTintBlueA1}>
            @{content.job.handle}
          </Text>
        </Link>
      </Text>
      <Text kind="body-a1-regular" color={colors.contentGrayA2}>
        {content.job.period}
        <div {...stylex.props(styles.workDateSeparator)}></div>
        <Text style={styles.period}>{content.job.duration}차</Text>
        {content.info.memo && (
          <>
            <div {...stylex.props(styles.workDateSeparator)}></div>
            <Text style={styles.period}>{content.info.memo}</Text>
          </>
        )}
      </Text>
    </div>
  );
};

/**
 * ### 연락처
 *
 * 이력서에 표시할 연락처 목록입니다.
 */
const ResumeContact = () => {
  return (
    <nav {...stylex.props(styles.linkListContainer)}>
      <ul {...stylex.props(styles.linkList)}>
        {content.contacts.map((contactGroup) => (
          <div key={contactGroup[0].type + contactGroup[0].value} {...stylex.props(styles.linkGroup)}>
            {contactGroup.map((contact) => (
              <li key={contact.type + contact.value}>
                <Link href={contact.link} {...stylex.props(styles.link(colors.contentGrayA2), styles.linkContainer)}>
                  <Icon name={contact.icon} size={20} style={styles.linkIcon} />
                  <Text kind="body-a1-regular">{contact.value}</Text>
                </Link>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </nav>
  );
};

const MOBILE = "@media (max-width: 640px)";
// const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  container: {
    paddingTop: 32,
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingBottom: 24,
  },
  name: {
    fontSize: {
      default: 56, // display-a1
      [MOBILE]: 40, // display-a2
    },
  },
  link: (underlineColor?: StyleXVar<string>) => ({
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: underlineColor,
  }),
  jobContainer: {
    marginTop: 16,
  },
  jobTitleSeparator: {
    marginLeft: 6,
    marginRight: 6,
  },
  jobTitle: {
    display: "inline-block",
  },
  jobCompany: {
    marginLeft: 4,
  },
  workDateSeparator: {
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    marginTop: "auto",
    marginBottom: "auto",
    width: 1,
    height: 12,
    backgroundColor: colors.lineSeparatorStroke,
  },
  linkListContainer: {
    marginTop: 20,
  },
  linkList: {
    gap: 8,
  },
  linkGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 8,
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  linkIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  period: {
    display: "inline-block",
  },
});

export default ResumeInfo;
