import { useDndMonitor } from "@dnd-kit/core";

const defaultAnnouncements = {
  onDragStart() {},
  onDragMove() {},
  onDragOver() {},
  onDragEnd() {},
  onDragCancel() {},
};

export default function Announcements() {
  useDndMonitor(defaultAnnouncements);

  return null;
}
