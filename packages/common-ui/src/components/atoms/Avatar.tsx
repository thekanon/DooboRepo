"use client";
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Avatar.module.scss";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";
export type AvatarShape = "circle" | "square";

export interface AvatarProps {
  /**
   * 아바타 이미지 URL
   */
  src?: string;

  /**
   * 이미지가 없을 경우 표시할 이니셜 텍스트
   */
  initials?: string;

  /**
   * 아바타 크기
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * 아바타 형태
   * @default 'circle'
   */
  shape?: AvatarShape;

  /**
   * 아바타의 상태 표시
   * @default 'none'
   */
  status?: AvatarStatus;

  /**
   * 이미지가 없을 경우 표시할 배경색 (CSS 색상값)
   */
  bgColor?: string;

  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * 아바타에 표시할 alt 텍스트
   */
  alt?: string;

  /**
   * 클릭 핸들러
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  initials,
  size = "md",
  shape = "circle",
  status = "none",
  bgColor,
  className,
  alt = "사용자 아바타",
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // 이니셜 생성 로직 - 입력이 없거나 이미지가 성공적으로 로드된 경우 사용하지 않음
  const getInitials = () => {
    if (!initials) return "";

    // 최대 2글자까지만 표시 (첫 번째 문자와 공백 이후 첫 번째 문자)
    const parts = initials.split(" ");
    if (parts.length === 1) {
      return initials.substring(0, 2).toUpperCase();
    } else {
      return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }
  };

  const avatarClasses = classNames(
    styles.avatar,
    styles[`avatar-${size}`],
    styles[`avatar-${shape}`],
    {
      [styles.clickable]: !!onClick,
    },
    className
  );

  const randomColors = [
    "#f87171", // 빨강
    "#fb923c", // 주황
    "#facc15", // 노랑
    "#4ade80", // 초록
    "#60a5fa", // 파랑
    "#a78bfa", // 보라
    "#f472b6", // 분홍
  ];

  // 이니셜에 따라 결정적인 배경색 선택
  const getRandomColor = (text: string) => {
    if (bgColor) return bgColor;

    if (!text) return randomColors[0];

    // 문자열의 각 문자 코드 합계를 사용하여 색상 인덱스 결정
    const charCodeSum = text
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return randomColors[charCodeSum % randomColors.length];
  };

  return (
    <div className={avatarClasses} onClick={onClick}>
      {!src || imageError ? (
        <div
          className={styles.initials}
          style={{ backgroundColor: getRandomColor(initials || "") }}
          aria-label={alt}
        >
          {getInitials()}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={handleImageError}
        />
      )}

      {status !== "none" && (
        <span
          className={classNames(styles.status, styles[`status-${status}`])}
        />
      )}
    </div>
  );
};
