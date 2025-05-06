[leedo@localhost src]$ tree
.
├── components
│ ├── atoms
│ │ ├── Avatar.module.scss
│ │ ├── Avatar.tsx
│ │ ├── Badge.module.scss
│ │ ├── Badge.tsx
│ │ ├── Button.module.scss
│ │ ├── Button.tsx
│ │ ├── Card.module.scss
│ │ ├── Card.tsx
│ │ ├── Checkbox.module.scss
│ │ ├── Checkbox.tsx
│ │ ├── Heading.module.scss
│ │ ├── Heading.tsx
│ │ ├── Icon.module.scss
│ │ ├── Icon.tsx
│ │ ├── IconButton.module.scss
│ │ ├── IconButton.tsx
│ │ ├── Input.module.scss
│ │ ├── Input.tsx
│ │ ├── Paragraph.module.scss
│ │ ├── Paragraph.tsx
│ │ ├── Radio.module.scss
│ │ ├── Radio.tsx
│ │ ├── Select.module.scss
│ │ ├── Select.tsx
│ │ ├── Spinner.module.scss
│ │ ├── Spinner.tsx
│ │ ├── Text.module.scss
│ │ └── Text.tsx
│ ├── molecules
│ │ ├── Alert.module.scss
│ │ ├── Alert.tsx
│ │ ├── Breadcrumb.module.scss
│ │ ├── Breadcrumb.tsx
│ │ ├── DropdownMenu.module.scss
│ │ ├── DropdownMenu.tsx
│ │ ├── FormField.module.scss
│ │ ├── FormField.tsx
│ │ ├── InfiniteScroll.module.scss
│ │ ├── InfiniteScroll.tsx
│ │ ├── InfoBox.module.scss
│ │ ├── InfoBox.tsx
│ │ ├── InputGroup.module.scss
│ │ ├── InputGroup.tsx
│ │ ├── Modal.module.scss
│ │ ├── Modal.tsx
│ │ ├── Pagination.module.scss
│ │ ├── Pagination.tsx
│ │ ├── Toast.module.scss
│ │ └── Toast.tsx
│ └── organisms
│ ├── DataTable
│ │ ├── DataTable.module.scss
│ │ ├── DataTable.tsx
│ │ ├── components
│ │ │ ├── BulkActions.tsx
│ │ │ ├── Cell.tsx
│ │ │ ├── ColumnToggle.module.scss
│ │ │ ├── ColumnToggle.tsx
│ │ │ ├── HeaderCell.tsx
│ │ │ ├── Row.tsx
│ │ │ ├── TableHeader.tsx
│ │ │ └── index.ts
│ │ ├── hooks
│ │ │ ├── index.ts
│ │ │ ├── useFilter.ts
│ │ │ ├── usePagination.ts
│ │ │ ├── useSelection.ts
│ │ │ └── useSort.ts
│ │ └── types.ts
│ ├── Form
│ │ ├── Form.module.scss
│ │ ├── Form.tsx
│ │ ├── FormFooter.tsx
│ │ ├── FormSection.tsx
│ │ ├── hooks.ts
│ │ ├── index.ts
│ │ └── types.ts
│ └── Sidebar
│ ├── Sidebar.module.scss
│ ├── Sidebar.tsx
│ ├── SidebarFooter.tsx
│ ├── SidebarHeader.tsx
│ ├── SidebarNavItem.tsx
│ ├── SidebarSection.tsx
│ ├── index.ts
│ └── types.ts
├── hooks
│ ├── useDirectInfiniteScroll.ts
│ └── useSmartPosition.ts
├── index.ts
├── layouts
│ ├── base
│ │ ├── DashboardLayout.module.scss
│ │ └── DashboardLayout.tsx
│ └── page
│ ├── DataTableLayout.module.scss
│ └── DataTableLayout.tsx
├── lib
│ └── icon.tsx
├── scss
│ ├── \_mixins.scss
│ └── \_variables.scss
├── tailwind
│ ├── theme.d.ts
│ └── theme.js
└── token
├── borders.ts
├── breakpoints.ts
├── colors.ts
├── index.ts
├── shadows.ts
├── spacing.ts
├── types.ts
├── typography.ts
└── z-index.ts

17 directories, 100 files
[leedo@localhost src]$

위 정보를 기반으로 아래 작업에 필요할 수 있는 코드들을 cat으로 추출하여 보여줘
예시 :

```bash
cat /home/leedo/바탕화면/source/side/DooboRepo/packages/common-ui/src/components/atoms/Button.tsx
```

현재 경로 :
/home/leedo/바탕화면/source/side/DooboRepo/packages/common-ui/src

- [ ] 인증 관련 임시 UI 구현 (로그인 페이지)

touch packages/common-ui/src/layouts/base/AuthLayout/AuthLayout.tsx
