import { css } from "@emotion/css";

export const antTabsContentStyles = css`
  .ant-tabs-content.ant-tabs-content-top {
    height: calc(100vh - 280px);
    padding-right: 12px;
  }
`;

export const overlayScrollbarStyles = css`
  .os-scrollbar-handle {
    background: #1890ff !important;
    border-radius: 4px !important;
    width: 8px !important;
    left: -1px !important;
    max-height: 60px !important;
    min-height: 40px !important;
    height: 60px !important;
  }

  .os-scrollbar-handle:hover {
    background: #40a9ff !important;
  }

  .os-scrollbar-handle:active {
    background: #096dd9 !important;
  }

  .os-scrollbar-track {
    background: rgba(24, 144, 255, 0.1) !important;
    width: 10px !important;
  }
`;
