/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextResponse, type NextRequest } from "next/server";

import { shortlinks } from "@/configs";

import { trackShortlinkEvent } from "@/api/amplitudeServer";

const deviceIdCookie = "shortlink-device-id";
const permanentRedirectStatus = 301;

interface ShortlinkRouteProps {
  params: Promise<{ shortlink?: string[] }>;
}

/**
 * ### Shortlink 리다이렉트
 *
 * 등록된 Shortlink 이동을 기록한 뒤 대상 URL로 리다이렉트합니다.
 * 등록되지 않은 프로퍼티는 루트 경로로 리다이렉트합니다.
 *
 * @param request 요청 객체입니다.
 * @param props Shortlink 라우트 프로퍼티입니다.
 * @returns 리다이렉트 응답입니다.
 */
export async function GET(request: NextRequest, props: ShortlinkRouteProps): Promise<Response> {
  const { shortlink: shortlinkSegments = [] } = await props.params;
  const shortlink = shortlinkSegments.join("/");
  const destination = getLinkValue(shortlinks, shortlink);

  if (!destination) return NextResponse.redirect(new URL("/", request.url), permanentRedirectStatus);

  const storedDeviceId = request.cookies.get(deviceIdCookie)?.value;
  const deviceId = storedDeviceId ?? crypto.randomUUID();

  await trackShortlinkEvent(deviceId, shortlink, destination, request.headers.get("referer"));

  const response = NextResponse.redirect(destination, permanentRedirectStatus);

  if (!storedDeviceId) {
    response.cookies.set(deviceIdCookie, deviceId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

/**
 * ### 링크 값 반환
 *
 * Shortlink 목록에 요청 프로퍼티가 존재하면 대상 URL을 반환합니다.
 *
 * @param links Shortlink 목록입니다.
 * @param property 요청 프로퍼티입니다.
 * @returns 리다이렉트 대상 URL입니다.
 */
function getLinkValue<T>(links: Record<string, T>, property: string): T | undefined {
  return Object.hasOwn(links, property) ? links[property] : undefined;
}
