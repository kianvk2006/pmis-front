import LoginWidget from "./LoginWidget";
import MilestonesWidget from "./MilestonesWidget";
import StatusWidget from "./StatusWidget";

export default function LeftSidebar() {
  return (
    <div className="sticky top-6 space-y-6">

      <LoginWidget />

      <MilestonesWidget />

      <StatusWidget />

    </div>
  );
}