#!/bin/bash

# Copyright 2026 Taeyoon Lee. All Rights Reserved.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.


set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

PACKAGE_JSON_FILE="$ROOT_DIR/package.json"
README_FILE="$ROOT_DIR/README.md"
PRESET_README_FILE="$ROOT_DIR/resources/README.preset.md"
PRESET_HERO_FILE="$ROOT_DIR/resources/readme-hero.preset.svg"
HERO_FILE="$ROOT_DIR/resources/readme-hero.svg"

if [ ! -f "$PRESET_README_FILE" ]; then
  echo "Error: README.preset.md file not found at $PRESET_README_FILE"
  exit 1
fi

if [ ! -f "$PRESET_HERO_FILE" ]; then
  echo "Error: readme-hero.preset.svg file not found at $PRESET_HERO_FILE"
  exit 1
fi

PROJECT_NAME="$(basename "$ROOT_DIR")"
VERSION=""
REPOSITORY_URL=""
PACKAGE_MANAGER=""

if [ -f "$PACKAGE_JSON_FILE" ]; then
  PACKAGE_INFO="$(node -e '
const packageJson = require(process.argv[1]);
const repository = packageJson.repository;
const repositoryUrl = typeof repository === "string" ? repository : repository?.url ?? "";
process.stdout.write([
  packageJson.name ?? "",
  packageJson.version ?? "",
  packageJson.packageManager ?? "",
  repositoryUrl,
].join("\n"));
' "$PACKAGE_JSON_FILE")"

  PROJECT_NAME="$(printf "%s" "$PACKAGE_INFO" | sed -n '1p')"
  VERSION="$(printf "%s" "$PACKAGE_INFO" | sed -n '2p')"
  PACKAGE_MANAGER="$(printf "%s" "$PACKAGE_INFO" | sed -n '3p')"
  REPOSITORY_URL="$(printf "%s" "$PACKAGE_INFO" | sed -n '4p')"
fi

if [ -z "$REPOSITORY_URL" ]; then
  REPOSITORY_URL="$(git -C "$ROOT_DIR" config --get remote.origin.url || true)"
fi

if [ -z "$REPOSITORY_URL" ]; then
  REPOSITORY_URL="https://github.com/taeyoon0137/resume"
fi

REPOSITORY_URL="${REPOSITORY_URL#git+}"
REPOSITORY_URL="${REPOSITORY_URL%.git}"
REPOSITORY_URL="${REPOSITORY_URL/git@github.com:/https:\/\/github.com\/}"

VERSION_BADGE_LINES=""
STACK_BADGE_LINES=""

if [ -n "$VERSION" ]; then
  VERSION_BADGE_LINES="$VERSION_BADGE_LINES
  <a href=\"$REPOSITORY_URL\"><img src=\"https://img.shields.io/badge/$VERSION-%23101010?label=$PROJECT_NAME&labelColor=%234D24E2\" /></a>"
else
  VERSION_BADGE_LINES="$VERSION_BADGE_LINES
  <a href=\"https://git-scm.com/\"><img src=\"https://img.shields.io/badge/git-%23F05032?&logo=git&logoColor=%23FFFFFF\" /></a>"
fi

STACK_BADGE_LINES="$STACK_BADGE_LINES
  <a href=\"https://nextjs.org/\"><img src=\"https://img.shields.io/badge/Next.js-%23000000?&logo=nextdotjs&logoColor=%23FFFFFF\" /></a>
  <a href=\"https://react.dev/\"><img src=\"https://img.shields.io/badge/React-%2320232A?&logo=react&logoColor=%2361DAFB\" /></a>
  <a href=\"https://www.typescriptlang.org/\"><img src=\"https://img.shields.io/badge/TypeScript-%233178C6?&logo=typescript&logoColor=%23FFFFFF\" /></a>
  <a href=\"https://stylexjs.com/\"><img src=\"https://img.shields.io/badge/StyleX-%23101010\" /></a>"

if [ -n "$PACKAGE_MANAGER" ]; then
  PACKAGE_MANAGER_NAME="${PACKAGE_MANAGER%@*}"

  case "$PACKAGE_MANAGER_NAME" in
    pnpm)
      STACK_BADGE_LINES="$STACK_BADGE_LINES
  <a href=\"https://pnpm.io/\"><img src=\"https://img.shields.io/badge/pnpm-%23F69220?&logo=pnpm&logoColor=%23FFFFFF\" /></a>"
      ;;
    npm)
      STACK_BADGE_LINES="$STACK_BADGE_LINES
  <a href=\"https://www.npmjs.com/\"><img src=\"https://img.shields.io/badge/npm-%23CB3837?&logo=npm&logoColor=%23FFFFFF\" /></a>"
      ;;
    yarn)
      STACK_BADGE_LINES="$STACK_BADGE_LINES
  <a href=\"https://yarnpkg.com/\"><img src=\"https://img.shields.io/badge/Yarn-%232C8EBB?&logo=yarn&logoColor=%23FFFFFF\" /></a>"
      ;;
    *)
      STACK_BADGE_LINES="$STACK_BADGE_LINES
  <img src=\"https://img.shields.io/badge/$PACKAGE_MANAGER_NAME-%23101010\" />"
      ;;
  esac
fi

BADGE_BLOCK="<p align=\"center\">$VERSION_BADGE_LINES
</p>
<p align=\"center\">$STACK_BADGE_LINES
</p>"

perl -MMIME::Base64=encode_base64 -0pe '
  BEGIN {
    ($root_dir, $project_name) = @ARGV;
    @ARGV = @ARGV[2..$#ARGV];

    %mime_by_ext = (
      jpg => "image/jpeg",
      jpeg => "image/jpeg",
      png => "image/png",
    );
  }

  sub escape_xml {
    my ($text) = @_;
    $text =~ s/&/&amp;/g;
    $text =~ s/</&lt;/g;
    $text =~ s/>/&gt;/g;
    return $text;
  }

  sub embed_image {
    my ($tag, $file_name) = @_;
    my $path = "$root_dir/resources/$file_name";
    return "" unless -f $path;

    my ($ext) = $file_name =~ /\.([^.]+)$/;
    $ext = lc($ext // "");
    my $mime = $mime_by_ext{$ext};
    return "" unless $mime;

    open my $image, "<:raw", $path or die "Error: failed to read $path: $!";
    local $/;
    my $bytes = <$image>;
    close $image;

    my $data_uri = "data:$mime;base64," . encode_base64($bytes, "");
    $tag =~ s|href="\./\Q$file_name\E"|href="$data_uri"|;
    return $tag;
  }

  s|(<text class="r"[^>]*>)(.*?)(</text>)|$1 . escape_xml($project_name) . $3|e;
  s|<image\b(?=[^>]*\bhref="\./([^"]+)")[^>]*/>|embed_image($&, $1)|ge;
' "$ROOT_DIR" "$PROJECT_NAME" "$PRESET_HERO_FILE" > "$HERO_FILE"

perl -0pe '
  BEGIN {
    ($project_name, $repository_url, $badge_block) = @ARGV;
    @ARGV = @ARGV[3..$#ARGV];
  }

  s/\$\{projectName\}/$project_name/g;
  s/\$\{repositoryUrl\}/$repository_url/g;
  s/\$\{badgeBlock\}/$badge_block/g;
  s|\.\./resources|./resources|g;
  s|\.\./docs|./docs|g;
  s|\.\./AGENTS\.md|./AGENTS.md|g;
  s|\.\./CLAUDE\.md|./CLAUDE.md|g;
  s|\.\./LICENSE|./LICENSE|g;
' "$PROJECT_NAME" "$REPOSITORY_URL" "$BADGE_BLOCK" "$PRESET_README_FILE" > "$README_FILE"

echo "README.md and readme-hero.svg updated successfully"
