#!/bin/bash

# 파일명: ai-session.sh

# 1. ai-session/guide.md 를 읽어서 상단에 출력 후 하위 작업과 구분
echo "--- ai-session/guide.md 내용 ---"
if [ -f "../ai-session/guide.md" ]; then
  cat "../ai-session/guide.md"
else
  echo "ai-session/guide.md 파일이 존재하지 않습니다."
fi
echo ""
echo "-----------------------------------"
echo ""

# 2. tree -a -I '...' 의 결과를 출력
echo "--- 디렉토리 구조 ---"
tree -a -I 'node_modules|.next|dist|coverage|*.log|.git|.turbo|.github|.changeset|.github|storybook-static'
echo ""

# 3. ai-session/* 의 기타 md 파일을 모두 읽어들여서 파일 제목으로 시각적으로 구분하여 출력
echo "--- 기타 ai-session/*.md 파일 내용 ---"
for file in ../ai-session/*.md; do
  if [ "$file" != "ai-session/guide.md" ]; then
    echo ""
    echo "### $file 내용 ###"
    cat "$file"
  fi
done

echo ""