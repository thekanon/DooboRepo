#!/usr/bin/env bash
# readFileList.sh
# 사용법: ./readFileList.sh <탐색할_경로>

set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <directory-path>"
  exit 1
fi

ROOT="$1"

if [ ! -d "$ROOT" ]; then
  echo "Error: '$ROOT' is not a directory."
  exit 1
fi

# 파일 리스트를 배열에 저장 (디렉토리 제외, 숨김파일 포함)
mapfile -t files < <(find "$ROOT" -type f | sort)

counter=1
for file in "${files[@]}"; do
  echo "===== File #${counter} ====="
  echo "Path: ${file}"
  echo "----- Content Start -----"
  # 내용 출력 (탐색 중 읽기 에러 방지를 위해 cat -n 없이 도 그냥 출력)
  cat "$file"
  echo "----- Content End   -----"
  echo
  ((counter++))
done
