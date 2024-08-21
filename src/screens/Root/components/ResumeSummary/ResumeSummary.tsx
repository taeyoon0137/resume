/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Fragment } from "react";

import stylex from "@stylexjs/stylex";

import { content } from "@/contents";
import { Text } from "@/elements";

import { SummaryItem, SummaryMore, SummaryTitle } from "./components";

import { colors } from "../../../../styles/variable/colors.stylex";
import { spaces } from "../../../../styles/variable/spaces.stylex";

import type { ResumeSummaryProps } from "./ResumeSummary.type";

/**
 * ### 경력 요약
 *
 * 학력, 경력, 수상 내역 등 이력서 요약 정보를 보여주는 컴포넌트입니다.
 *
 * @component
 */
const ResumeSummary = ({ style }: ResumeSummaryProps) => {
  return (
    <section {...stylex.props(styles.container, style)}>
      <div {...stylex.props(styles.workGroup)}>
        <section {...stylex.props(styles.workColumn)}>
          <SummaryTitle title="경력" />
          <ul>{renderCompanies()}</ul>
        </section>
        <section {...stylex.props(styles.workColumn)}>
          <SummaryTitle title="학력" />
          <ul>{renderSchools()}</ul>
        </section>
      </div>
      <div {...stylex.props(styles.activityGroup)}>
        <section {...stylex.props(styles.activityColumn)}>
          <SummaryTitle title="수상 내역" />
          <ul>{renderAwards()}</ul>
          <SummaryMore label={`수상 내역 ${content.awards.length}개 모두 보기`} href="/awards" />
        </section>
        <section {...stylex.props(styles.activityColumn)}>
          <SummaryTitle title="자격증" />
          <ul>{renderLicenses()}</ul>
          <SummaryMore label={`자격증 ${content.licenses.length}개 모두 보기`} href="/licenses" />
        </section>
      </div>
    </section>
  );
};

/**
 * 회사 경력을 렌더링합니다.
 */
function renderCompanies() {
  return content.companies.map((company) => (
    <li key={company.company + company.roles.join()}>
      <SummaryItem
        title={company.company}
        info={company.roles.map((role, i) => {
          if (i === 0) return role;
          return (
            <Fragment key={role}>
              <br />
              {role}
            </Fragment>
          );
        })}
        caption={
          <>
            {company.period}
            <div {...stylex.props(styles.rowSeparator)}></div>
            <Text style={styles.duration}>{company.duration}</Text>
          </>
        }
        link={company.link}
      />
    </li>
  ));
}

/**
 * 학력을 렌더링합니다.
 */
function renderSchools() {
  return content.schools.map((school) => (
    <li key={school.school + school.major}>
      <SummaryItem title={school.school} info={school.major} caption={school.period} />
    </li>
  ));
}

/**
 * 수상 내역을 렌더링합니다.
 */
function renderAwards() {
  return content.awards.map((award) => {
    if (!award.pin) return null;

    return (
      <li key={award.award}>
        <SummaryItem
          title={
            <>
              <Text style={styles.award}>{award.award}&nbsp;</Text>
              <Text style={styles.award}>{award.prize}</Text>
            </>
          }
          info={award.organization}
          caption={award.issueDate}
          link={award.link}
        />
      </li>
    );
  });
}

/**
 * 자격증을 렌더링합니다.
 */
function renderLicenses() {
  return content.licenses.map((licenses) => {
    if (!licenses.pin) return null;
    return (
      <li key={licenses.license}>
        <SummaryItem title={licenses.license} info={licenses.organization} caption={licenses.issueDate} />
      </li>
    );
  });
}

const MOBILE = "@media (max-width: 640px)";
const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  container: {
    flexDirection: {
      default: "row",
      [TABLET]: "column",
      [MOBILE]: "column",
    },
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingTop: 12,
    paddingBottom: 12,
    gap: {
      default: 24,
      [MOBILE]: 20,
    },
  },
  workGroup: {
    flexDirection: {
      default: "column",
      [TABLET]: "row",
      [MOBILE]: "column",
    },
    flexGrow: 1,
    flexBasis: 0,
    columnGap: 16,
    rowGap: {
      default: "unset",
      [MOBILE]: 20,
    },
  },
  workColumn: {
    flexGrow: {
      default: "unset",
      [TABLET]: 1,
      [MOBILE]: "unset",
    },
    flexBasis: 0,
  },
  activityGroup: {
    flexDirection: {
      default: "row",
      [TABLET]: "row",
      [MOBILE]: "column",
    },
    flexGrow: 2,
    flexBasis: 0,
    columnGap: 16,
    rowGap: {
      default: "unset",
      [MOBILE]: 20,
    },
  },
  activityColumn: {
    flexGrow: 1,
    flexBasis: 0,
  },
  award: {
    display: "inline-block",
    textDecoration: "inherit",
    textDecorationColor: colors.contentGrayA3,
  },
  rowSeparator: {
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    width: 1,
    height: 10,
    backgroundColor: colors.lineSeparatorStroke,
  },
  duration: {
    whiteSpace: "nowrap",
  },
});

export default ResumeSummary;
