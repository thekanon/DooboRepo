## Form 컴포넌트 설계

### 기능 명세

| Sidebar 요소       | 바로 쓸 수 있는 컴포넌트                           | 비고 & 추가 아이디어                  |
| ------------------ | -------------------------------------------------- | ------------------------------------- |
| 로고 영역          | **Icon** + **Heading** (atoms)                     | 상단 고정                             |
| 기본 네비 항목     | **Icon** + **Text** or **Paragraph**               | `NavItem` 작은 molecule로 추출        |
| 네비 섹션 구분     | **Heading** (atom) + CSS 경계선                    | 예: _“콘텐츠 관리”_                   |
| 접기/펼치기 토글   | **IconButton** (atom)                              | 사이드바 폭 축소                      |
| 뱃지/카운트        | **Badge** (atom)                                   | “3”건 알림 등                         |
| 서브 메뉴 드롭다운 | **DropdownMenu** (molecule)                        | 다단 메뉴 필요 시                     |
| 빠른 정보 박스     | **InfoBox** (molecule)                             | 업그레이드 배너, 공지 등              |
| 사용자 프로필      | **Avatar** (atom) + **Text**                       | 하단 고정 프로필 카드                 |
| 설정/로그아웃 메뉴 | **DropdownMenu** or **Modal**                      | 프로필 클릭 시 옵션                   |
| 현재 위치 표시     | **Breadcrumb** (molecule, 사실 TopBar와 더 어울림) | 선택적으로 Sidebar 상단에도 배치 가능 |

[leedo@localhost DooboRepo]$ tree ./packages/common-ui/src/components/organisms/Form/
./packages/common-ui/src/components/organisms/Form/
├── Form.module.scss
├── Form.tsx
├── FormFooter.tsx
├── FormSection.tsx
├── hooks.ts
├── index.ts
└── types.ts

### 참고할 컴포넌트

cat packages/common-ui/src/token/typography.ts
cat packages/common-ui/src/scss/\_variables.scss
cat packages/common-ui/src/components/atoms/IconButton.tsx
cat packages/common-ui/src/components/atoms/IconButton.module.scss
cat packages/common-ui/src/components/molecules/DropdownMenu.tsx
cat packages/common-ui/src/components/molecules/DropdownMenu.module.scss
cat packages/common-ui/src/components/molecules/InfoBox.tsx
cat packages/common-ui/src/components/molecules/InfoBox.module.scss
cat packages/common-ui/src/components/organisms/Form/Form.tsx
cat packages/common-ui/src/index.ts

## 재질문

1. 아이콘 시스템은 어떻게 구현되어 있나요? lib/icon.tsx에 iconPaths가 있는 것 같은데, 사이드바에 사용할 아이콘들이 이미 정의되어 있는지 확인하고 싶습니다.

- 아래와 같이 되어있어. 아이콘은 SVG로 되어있고, `iconPaths`에 정의되지 않아도 이런방식으로 사용할 수 있기 때문에 iconPaths에 정의된 것만 사용하지 않아도 돼.

```
export const iconPaths = {
  /** i */
  "info-circle": (
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  ),
  ...
  <Icon size={size === "sm" ? "sm" : "md"} className={styles.icon}>
    {iconPaths[getDefaultIcon()]}
  </Icon>
```

2. 사이드바 컴포넌트의 정확한 파일 구조는 어떻게 되어야 하나요? DataTable처럼 하위 컴포넌트들을 폴더 구조로 분리해야 할지, 아니면 Form처럼 여러 파일로 구성해야 할지 궁금합니다.

- 사이드바는 Form처럼 여러 파일로 구성하는게 좋을 것 같아.

## 스토리북

# 테스트를 위해 블로그나 퀴즈 관리 시스템과 관련된 창의적인 예시가 포함된 stories도 만들어줘

# 아래에 현재 프로젝트에서 Tree 및, 컴포넌트 작성 시 유의점을 확인하고, 만약 더 필요한 정보나 참고해야 할 정보가 있다면 코드 작성 전에 내게 필요한 정보를 물어봐줘
