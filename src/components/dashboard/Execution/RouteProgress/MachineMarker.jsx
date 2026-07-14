import { TrainFront } from "lucide-react";

export default function MachineMarker() {
  return (
    <div
      className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-full
      bg-white
      shadow-xl
      ring-4
      ring-orange-100
      "
    >
      <TrainFront size={24} className="text-orange-500" />
    </div>
  );
}
