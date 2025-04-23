#!/bin/bash

# 디렉토리 위치 설정
COMPONENTS_DIR="packages/common-ui/src/components/atoms"
STORIES_DIR="apps/docs/stories"

# 아이콘 컴포넌트 파일 생성
touch "$COMPONENTS_DIR/Icon.tsx"
touch "$COMPONENTS_DIR/Icon.module.scss"
touch "$STORIES_DIR/Icon.stories.tsx"

# 아바타 컴포넌트 파일 생성
touch "$COMPONENTS_DIR/Avatar.tsx"
touch "$COMPONENTS_DIR/Avatar.module.scss"
touch "$STORIES_DIR/Avatar.stories.tsx"

# 배지 컴포넌트 파일 생성
touch "$COMPONENTS_DIR/Badge.tsx"
touch "$COMPONENTS_DIR/Badge.module.scss"
touch "$STORIES_DIR/Badge.stories.tsx"

echo "모든 컴포넌트 파일이 생성되었습니다."