# 头像居中修复 - 产品需求文档

## Overview
- **Summary**: 修复用户头像中小人未居中且尺寸偏大的问题，确保小人在圆形边框内居中显示，比例协调。
- **Purpose**: 提升用户界面的美观度和专业感，确保头像显示符合预期。
- **Target Users**: 所有访问点餐系统的用户。

## Goals
- 小人头像在圆形边框内居中显示
- 小人尺寸与圆形边框比例协调
- 保持整体视觉效果的美观性

## Non-Goals (Out of Scope)
- 更改头像的整体形状或颜色
- 添加新的头像功能
- 修改其他页面的样式

## Background & Context
当前头像实现中，小人使用绝对定位，位置计算不准确，导致未居中显示，且尺寸相对于圆形边框偏大，影响视觉效果。

## Functional Requirements
- **FR-1**: 小人头像在圆形边框内水平和垂直居中
- **FR-2**: 小人尺寸与圆形边框比例协调

## Non-Functional Requirements
- **NFR-1**: 保持原有的点击效果和动画过渡
- **NFR-2**: 确保修改后的样式在不同设备上显示一致

## Constraints
- **Technical**: 仅修改CSS样式，不涉及HTML结构变更
- **Business**: 保持与现有设计风格的一致性

## Assumptions
- 圆形边框的尺寸保持不变（100px × 100px）
- 小人的颜色和形状保持不变

## Acceptance Criteria

### AC-1: 小人头像居中显示
- **Given**: 用户访问"我的"页面
- **When**: 查看用户头像
- **Then**: 小人在圆形边框内水平和垂直居中
- **Verification**: `human-judgment`

### AC-2: 小人尺寸比例协调
- **Given**: 用户访问"我的"页面
- **When**: 查看用户头像
- **Then**: 小人尺寸与圆形边框比例协调，不显得过大
- **Verification**: `human-judgment`

### AC-3: 点击效果保持
- **Given**: 用户访问"我的"页面
- **When**: 点击用户头像
- **Then**: 头像有下沉效果并弹出登录弹窗
- **Verification**: `human-judgment`

## Open Questions
- 无