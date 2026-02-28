# 头像居中修复 - 实现计划

## [x] 任务1: 调整小人头像的尺寸
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 缩小小人头部和身体的尺寸，使其与圆形边框比例协调
  - 头部尺寸调整为40px × 40px
  - 身体尺寸调整为30px × 30px
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgment` TR-1.1: 小人尺寸与圆形边框比例协调，不显得过大
- **Notes**: 保持小人的颜色和形状不变

## [x] 任务2: 修正小人头像的位置
- **Priority**: P0
- **Depends On**: 任务1
- **Description**:
  - 调整小人头部和身体的绝对定位，确保在圆形边框内居中显示
  - 使用计算准确的top和left值
  - 头部位置：top: 15px, left: 30px
  - 身体位置：top: 55px, left: 35px
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-2.1: 小人在圆形边框内水平和垂直居中
- **Notes**: 确保小人整体在圆形边框内居中

## [x] 任务3: 验证点击效果
- **Priority**: P1
- **Depends On**: 任务2
- **Description**:
  - 测试头像的点击效果
  - 确保点击时有下沉效果
  - 确保点击后弹出登录弹窗
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-3.1: 点击头像时有下沉效果
  - `human-judgment` TR-3.2: 点击后弹出登录弹窗
- **Notes**: 保持原有的点击事件处理逻辑不变