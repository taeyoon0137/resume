/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

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
      <div {...stylex.props(styles.column, styles.group)}>
        <section>
          <SummaryTitle title="경력" />
          <ul>{renderCompanies()}</ul>
        </section>
        <section>
          <SummaryTitle title="학력" />
          <ul>{renderSchools()}</ul>
        </section>
      </div>
      <section {...stylex.props(styles.column)}>
        <SummaryTitle title="수상 내역" />
        <ul>{renderAwards()}</ul>
        <SummaryMore label={`수상 내역 ${content.awards.length}개 모두 보기`} href="/awards" />
      </section>
      <section {...stylex.props(styles.column)}>
        <SummaryTitle title="자격증" />
        <ul>{renderLicenses()}</ul>
        <SummaryMore label={`자격증 ${content.licenses.length}개 모두 보기`} href="/licenses" />
      </section>
    </section>
  );
};

/**
 * 회사 경력을 렌더링합니다.
 */
function renderCompanies() {
  return content.companies.map((company) => (
    <li key={company.company + company.role}>
      <SummaryItem
        title={company.company}
        info={company.role}
        caption={
          <>
            {company.period}
            <div {...stylex.props(styles.itemDateSeparator)}></div>
            {company.duration}
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

const styles = stylex.create({
  container: {
    flexDirection: "row",
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 24,
  },
  group: {
    gap: 16,
  },
  column: {
    flexGrow: 1,
    flexBasis: 0,
  },
  award: {
    display: "inline-block",
    textDecoration: "inherit",
    textDecorationColor: colors.contentGrayA3,
  },

  itemContainer: {
    paddingBottom: 16,
  },
  itemTitle: {
    marginBottom: 6,
  },
  itemTitleLink: {
    marginLeft: 4,
  },
  itemInfo: {},
  itemDate: {
    marginTop: 6,
  },
  itemDateSeparator: {
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    width: 1,
    height: 10,
    backgroundColor: colors.lineSeparatorStroke,
  },
  moreButton: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: colors.contentGrayA3,
  },
});

export default ResumeSummary;
