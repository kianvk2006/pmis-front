import Card from "@/components/ui/Card";

import UserAvatar from "./UserAvatar";
import UserInfo from "./UserInfo";
import LoginButton from "./LoginButton";

export default function LoginWidget() {
  return (
    <Card>
      <div className="space-y-6">

        <UserAvatar />

        <UserInfo />

        <LoginButton />

      </div>
    </Card>
  );
}