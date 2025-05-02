import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InfiniteScroll, Card, Button, Text, Badge } from "@doo/common-ui";

const meta: Meta<typeof InfiniteScroll> = {
  title: "Components/Molecules/InfiniteScroll",
  component: InfiniteScroll,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onIntersect: { action: "intersected" },
    rootMargin: {
      control: { type: "text" },
      description: "IntersectionObserver의 rootMargin 설정",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "20px" },
      },
    },
    threshold: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "IntersectionObserver의 threshold 설정 (0-1)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1.0" },
      },
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
    showLoadingIndicator: {
      control: "boolean",
      description: "로딩 인디케이터 표시 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    loadingClassName: {
      control: "text",
      description: "로딩 인디케이터 CSS 클래스명",
    },
    isLoading: {
      control: "boolean",
      description: "외부에서 제어하는 로딩 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfiniteScroll>;

// 더미 데이터 생성 함수
const generateQuizData = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `퀴즈 #${start + i}: ${["MBTI 성격 유형", "심리 테스트", "직업 적성", "연애 스타일"][i % 4]} 테스트`,
    date: new Date(Date.now() - (start + i) * 86400000).toLocaleDateString(),
    views: Math.floor(Math.random() * 10000),
    participants: Math.floor(Math.random() * 5000),
    tags: [
      ["MBTI", "성격", "심리학"][i % 3],
      ["인기", "추천", "신규", "베스트"][i % 4],
    ],
  }));
};

// 더미 블로그 데이터 생성 함수
const generateBlogData = (start: number, count: number) => {
  const topics = [
    "MBTI 성격 분석",
    "퀴즈 제작 가이드",
    "심리학 기초",
    "자기 계발",
    "대인 관계 팁",
  ];
  const authors = ["김도움", "이성격", "박테스트", "최분석", "정심리"];

  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `${topics[i % topics.length]}: ${i + start}번째 인사이트`,
    excerpt: `${topics[i % topics.length]}에 관한 ${i + start}번째 블로그 포스트입니다. 이 글에서는 심층적인 분석과 실용적인 팁을 제공합니다.`,
    author: authors[i % authors.length],
    date: new Date(Date.now() - (start + i) * 86400000).toLocaleDateString(),
    readTime: Math.floor(Math.random() * 10) + 5,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    category: ["심리학", "자기계발", "대인관계", "MBTI", "퀴즈"][i % 5],
  }));
};

// 기본 예제 - 로딩 상태 컨트롤
export const Default: Story = {
  render: (args) => {
    const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMoreItems = async () => {
      // 실제 API 호출을 시뮬레이트
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: 5 }, (_, i) => prev.length + i + 1),
      ]);
      setIsLoading(false);
    };

    return (
      <div style={{ maxWidth: "500px" }}>
        <h3>기본 무한 스크롤 예제</h3>
        <p>아래로 스크롤하면 더 많은 항목이 로드됩니다.</p>

        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #eee",
            padding: "10px",
          }}
        >
          {items.map((item) => (
            <div
              key={item}
              style={{
                padding: "20px",
                marginBottom: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            >
              항목 {item}
            </div>
          ))}

          <InfiniteScroll
            {...args}
            onIntersect={fetchMoreItems}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  },
};

// 퀴즈 목록 무한 스크롤
export const QuizList: Story = {
  render: (args) => {
    const [quizzes, setQuizzes] = useState(() => generateQuizData(1, 5));
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreQuizzes = async () => {
      if (!hasMore) return;

      setIsLoading(true);
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const nextPage = page + 1;
      const newQuizzes = generateQuizData(nextPage * 5 - 4, 5);

      setQuizzes((prev) => [...prev, ...newQuizzes]);
      setPage(nextPage);

      // 20개 이상이면 더 이상 불러오지 않음 (데모용)
      if (nextPage >= 4) {
        setHasMore(false);
      }

      setIsLoading(false);
    };

    return (
      <div style={{ maxWidth: "650px" }}>
        <h2>퀴즈 관리자 대시보드</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Text>총 {hasMore ? "20+" : quizzes.length}개의 퀴즈</Text>
          <Button variant="primary">+ 새 퀴즈 만들기</Button>
        </div>

        <div
          style={{ maxHeight: "500px", overflowY: "auto", padding: "10px 0" }}
        >
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              style={{ marginBottom: "16px", padding: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <Text
                    weight="semibold"
                    size="lg"
                    style={{ display: "block", marginBottom: "8px" }}
                  >
                    {quiz.title}
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    {quiz.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant={idx === 0 ? "primary" : "secondary"}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Text size="sm" color="muted">
                    작성일: {quiz.date}
                  </Text>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Text size="sm">조회수: {quiz.views.toLocaleString()}</Text>
                  <Text size="sm">
                    참여자: {quiz.participants.toLocaleString()}
                  </Text>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                  marginTop: "12px",
                }}
              >
                <Button variant="outline" size="sm">
                  통계
                </Button>
                <Button variant="outline" size="sm">
                  편집
                </Button>
                <Button variant="primary" size="sm">
                  보기
                </Button>
              </div>
            </Card>
          ))}

          <InfiniteScroll
            {...args}
            onIntersect={fetchMoreQuizzes}
            isLoading={isLoading}
          />

          {!hasMore && (
            <div
              style={{ textAlign: "center", padding: "20px 0", color: "#888" }}
            >
              모든 퀴즈를 불러왔습니다.
            </div>
          )}
        </div>
      </div>
    );
  },
};

// 블로그 포스트 무한 스크롤
export const BlogPostList: Story = {
  render: (args) => {
    const [posts, setPosts] = useState(() => generateBlogData(1, 4));
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMorePosts = async () => {
      if (!hasMore) return;

      setIsLoading(true);
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const nextPage = page + 1;
      const newPosts = generateBlogData(nextPage * 4 - 3, 4);

      setPosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);

      // 16개 이상이면 더 이상 불러오지 않음 (데모용)
      if (nextPage >= 4) {
        setHasMore(false);
      }

      setIsLoading(false);
    };

    return (
      <div style={{ maxWidth: "750px" }}>
        <h2>블로그 관리</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <Text>총 {hasMore ? "16+" : posts.length}개의 포스트</Text>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="outline">초안 관리</Button>
            <Button variant="primary">+ 새 글 작성</Button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <Button variant="outline" size="sm">
            전체
          </Button>
          <Button variant="outline" size="sm">
            심리학
          </Button>
          <Button variant="outline" size="sm">
            MBTI
          </Button>
          <Button variant="outline" size="sm">
            자기계발
          </Button>
          <Button variant="outline" size="sm">
            대인관계
          </Button>
        </div>

        <div
          style={{ maxHeight: "600px", overflowY: "auto", padding: "10px 0" }}
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              style={{ marginBottom: "16px", padding: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <Badge variant="primary">{post.category}</Badge>
                    <Text size="sm" color="muted">
                      {post.date} • {post.readTime}분 읽기
                    </Text>
                  </div>
                  <Text
                    weight="bold"
                    size="lg"
                    style={{ marginBottom: "8px", display: "block" }}
                  >
                    {post.title}
                  </Text>
                  <Text
                    color="secondary"
                    style={{ marginBottom: "12px", display: "block" }}
                  >
                    {post.excerpt}
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <Text size="sm">작성자: {post.author}</Text>
                    <Text size="sm">좋아요: {post.likes}</Text>
                    <Text size="sm">댓글: {post.comments}</Text>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                  marginTop: "16px",
                }}
              >
                <Button variant="outline" size="sm">
                  통계
                </Button>
                <Button variant="outline" size="sm">
                  편집
                </Button>
                <Button variant="primary" size="sm">
                  보기
                </Button>
              </div>
            </Card>
          ))}

          <InfiniteScroll
            {...args}
            onIntersect={fetchMorePosts}
            isLoading={isLoading}
            rootMargin="100px"
          />

          {!hasMore && (
            <div
              style={{ textAlign: "center", padding: "20px 0", color: "#888" }}
            >
              모든 블로그 포스트를 불러왔습니다.
            </div>
          )}
        </div>
      </div>
    );
  },
};

// 퀴즈 결과 댓글 무한 스크롤
export const QuizResultComments: Story = {
  render: (args) => {
    const [comments, setComments] = useState([
      {
        id: 1,
        user: "이도움",
        mbti: "ENFJ",
        content: "결과가 정확해요! 저랑 완전 딱 맞아요.",
        likes: 24,
        time: "3시간 전",
      },
      {
        id: 2,
        user: "김테스트",
        mbti: "INFP",
        content: "재미있는 퀴즈였어요. 다른 테스트도 해보고 싶네요!",
        likes: 15,
        time: "5시간 전",
      },
      {
        id: 3,
        user: "박성격",
        mbti: "ISTP",
        content: "MBTI는 항상 재밌는 것 같아요. 친구들도 많이 추천할게요.",
        likes: 8,
        time: "6시간 전",
      },
    ]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreComments = async () => {
      if (!hasMore) return;

      setIsLoading(true);
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const newComments = [
        {
          id: comments.length + 1,
          user: "최분석",
          mbti: "ENTJ",
          content: "처음에는 반신반의했는데 결과를 보고 놀랐어요!",
          likes: 7,
          time: "8시간 전",
        },
        {
          id: comments.length + 2,
          user: "정심리",
          mbti: "ISFJ",
          content: "정확도가 높은 것 같아요. 다른 ISFJ분들은 어떤가요?",
          likes: 5,
          time: "12시간 전",
        },
        {
          id: comments.length + 3,
          user: "강퀴즈",
          mbti: "ENTP",
          content:
            "흥미로운 결과네요. 다음에는 어떤 테스트가 나올지 기대됩니다.",
          likes: 3,
          time: "1일 전",
        },
      ];

      setComments((prev) => [...prev, ...newComments]);
      setPage((prev) => prev + 1);

      // 3페이지 이상이면 더 이상 불러오지 않음 (데모용)
      if (page >= 2) {
        setHasMore(false);
      }

      setIsLoading(false);
    };

    return (
      <div style={{ maxWidth: "600px" }}>
        <div
          style={{
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <Text
            weight="bold"
            size="xl"
            style={{
              textAlign: "center",
              display: "block",
              marginBottom: "8px",
            }}
          >
            MBTI 성격 유형 테스트
          </Text>
          <Text
            style={{
              textAlign: "center",
              display: "block",
              marginBottom: "16px",
            }}
          >
            총 참여자: 15,872명 • 평균 정확도: 85%
          </Text>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "8px" }}
          >
            <Button variant="outline" size="sm">
              결과 분석
            </Button>
            <Button variant="primary" size="sm">
              테스트 다시하기
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Text weight="semibold">
            댓글 ({comments.length}
            {hasMore ? "+" : ""})
          </Text>
          <Button variant="outline" size="sm">
            댓글 작성
          </Button>
        </div>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{ padding: "16px", borderBottom: "1px solid #eee" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Text weight="semibold">{comment.user}</Text>
                  <Badge variant="primary">{comment.mbti}</Badge>
                </div>
                <Text size="sm" color="muted">
                  {comment.time}
                </Text>
              </div>
              <Text style={{ marginBottom: "12px" }}>{comment.content}</Text>
              <div style={{ display: "flex", gap: "16px" }}>
                <Text size="sm" color="secondary">
                  좋아요 {comment.likes}
                </Text>
                <Text size="sm" color="secondary">
                  답글
                </Text>
              </div>
            </div>
          ))}

          <InfiniteScroll
            {...args}
            onIntersect={fetchMoreComments}
            isLoading={isLoading}
            rootMargin="50px"
          />

          {!hasMore && (
            <div
              style={{ textAlign: "center", padding: "16px", color: "#888" }}
            >
              모든 댓글을 불러왔습니다.
            </div>
          )}
        </div>
      </div>
    );
  },
};

// 커스텀 로딩 인디케이터
export const CustomLoadingIndicator: Story = {
  render: (args) => {
    const [items, setItems] = useState<string[]>([
      "항목 1",
      "항목 2",
      "항목 3",
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreItems = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setItems((prev) => [
        ...prev,
        `항목 ${prev.length + 1}`,
        `항목 ${prev.length + 2}`,
      ]);
      setIsLoading(false);
    };

    return (
      <div style={{ maxWidth: "400px" }}>
        <h3>커스텀 로딩 인디케이터</h3>

        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #eee",
            padding: "16px",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "16px",
                marginBottom: "8px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            >
              {item}
            </div>
          ))}

          <InfiniteScroll
            {...args}
            onIntersect={loadMoreItems}
            isLoading={isLoading}
            loadingClassName="custom-loading"
            showLoadingIndicator={true}
          />
        </div>

        <div style={{ marginTop: "16px" }}>
          <Text size="sm" color="muted">
            스크롤하여 더 많은 항목을 불러옵니다. 커스텀 로딩 인디케이터가
            표시됩니다.
          </Text>
        </div>
      </div>
    );
  },
};

// 퀴즈 서드파티 통합
export const ThirdPartyIntegration: Story = {
  render: (args) => {
    const platforms = [
      {
        id: 1,
        name: "Facebook",
        connected: true,
        followers: 12500,
        lastSync: "2시간 전",
      },
      {
        id: 2,
        name: "Instagram",
        connected: true,
        followers: 8700,
        lastSync: "1일 전",
      },
      { id: 3, name: "Twitter", connected: false, followers: 0, lastSync: "-" },
    ];

    const [integrations, setIntegrations] = useState(platforms);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMorePlatforms = async () => {
      if (!hasMore) return;

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newPlatforms = [
        {
          id: integrations.length + 1,
          name: "YouTube",
          connected: true,
          followers: 5200,
          lastSync: "3일 전",
        },
        {
          id: integrations.length + 2,
          name: "TikTok",
          connected: false,
          followers: 0,
          lastSync: "-",
        },
        {
          id: integrations.length + 3,
          name: "Pinterest",
          connected: false,
          followers: 0,
          lastSync: "-",
        },
      ];

      setIntegrations((prev) => [...prev, ...newPlatforms]);
      setPage((prev) => prev + 1);

      if (page >= 1) {
        setHasMore(false);
      }

      setIsLoading(false);
    };

    return (
      <div style={{ maxWidth: "700px" }}>
        <h2>퀴즈 소셜 미디어 통합</h2>
        <Text style={{ marginBottom: "20px" }}>
          소셜 미디어 플랫폼에 퀴즈를 공유하고 통계를 확인하세요.
        </Text>

        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          {integrations.map((platform) => (
            <Card
              key={platform.id}
              style={{ marginBottom: "16px", padding: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#e6f7ff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1890ff",
                    }}
                  >
                    {platform.name.charAt(0)}
                  </div>
                  <div>
                    <Text weight="semibold" style={{ display: "block" }}>
                      {platform.name}
                    </Text>
                    <Text
                      size="sm"
                      color={platform.connected ? "primary" : "muted"}
                    >
                      {platform.connected ? "연결됨" : "연결 안됨"}
                    </Text>
                  </div>
                </div>

                {platform.connected ? (
                  <div style={{ textAlign: "right" }}>
                    <Text size="sm">
                      팔로워: {platform.followers.toLocaleString()}
                    </Text>
                    <Text size="sm" color="muted">
                      마지막 동기화: {platform.lastSync}
                    </Text>
                  </div>
                ) : (
                  <Button variant="outline" size="sm">
                    연결하기
                  </Button>
                )}
              </div>

              {platform.connected && (
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    gap: "8px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button variant="outline" size="sm">
                    통계
                  </Button>
                  <Button variant="outline" size="sm">
                    퀴즈 공유
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ color: "#ff4d4f" }}
                  >
                    연결 해제
                  </Button>
                </div>
              )}
            </Card>
          ))}

          <InfiniteScroll
            {...args}
            onIntersect={loadMorePlatforms}
            isLoading={isLoading}
          />

          {!hasMore && (
            <div
              style={{ textAlign: "center", padding: "20px", color: "#888" }}
            >
              모든 플랫폼이 로드되었습니다.
              <div style={{ marginTop: "10px" }}>
                <Button variant="outline" size="sm">
                  더 많은 플랫폼 찾기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};
