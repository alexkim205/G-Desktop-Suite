#!/bin/bash

## Borrowed from https://github.com/rhysd/tweet-app/blob/master/Casks/update.sh

set -e

if [ ! -d '.git' ]; then
    echo 'This script must be run at root of the repository' 2>&1
    exit 1
fi

if [[ "$1" == "" ]]; then
    echo 'Usage: update.sh {version}' 2>&1
    exit 1
fi

cd ./Casks

VERSION="$1"

echo "Update formula to version ${VERSION}"

DMG="../dist/G Desktop Suite-${VERSION}.dmg"
if [ ! -f "$DMG" ]; then
    echo "dist/G Desktop Suite-${VERSION}.dmg does not exist" 2>&1
    exit 1
fi

SHA="$(shasum -a 256 "$DMG" | cut -f 1 -d ' ')"
echo "Mac sha256: ${SHA}"
sed -i '' -E "s/  sha256 '[0-9a-f]*'/  sha256 '${SHA}'/" gsuite.rb
echo "Version: ${VERSION}"
sed -i '' -E "s/  version '[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*'/  version '${VERSION}'/" gsuite.rb

echo 'Done.'