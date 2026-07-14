import { useState } from "react";

import Card from "@/components/ui/Card";

import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginActions from "./LoginActions";
import QuickLogin from "./QuickLogin";
import Button from "@/components/ui/Button";

export default function LoginCard() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      console.log("LOGIN DATA:", form);
      setLoading(false);
    }, 1500);
  };

  const isDisabled = !form.username || !form.password;

  return (
    <Card className="w-full max-w-xl rounded-3xl bg-slate-800 p-10 shadow-2xl">
      <LoginHeader />

      <LoginForm onChange={setForm} />

      <LoginActions />

      <div className="mt-6">
        <Button
          loading={loading}
          disabled={isDisabled}
          onClick={handleLogin}
        >
          ورود به سیستم
        </Button>
      </div>

      <QuickLogin />
    </Card>
  );
}