import useTimelineDrop from "@/hooks/useTimelineDrop";

export default function DropLayer() {
  const { onDragOver, onDrop } = useTimelineDrop();

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="
      absolute
      inset-0
      z-20
      "
    />
  );
}
