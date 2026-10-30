#!/bin/bash
# Vercel Ignored Build Step script for Saturday.
# Configured under Project Settings > Build and Deployment > Ignored Build Step.
#
# Exit 0 = skip build (proceed without deploying)
# Exit 1 = proceed with build
#
# This script skips builds when only documentation files have changed.

set -e

# Compare the current commit against its parent. If only .md files or anything
# under docs/ differs, skip the build.
if git diff --quiet HEAD^ HEAD -- ':!*.md' ':!docs/*'; then
  echo "Only docs changed. Skipping build."
  exit 0
fi

echo "Code changes detected. Proceeding with build."
exit 1
