import { useState } from "react";

import Typography from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";

export default function LoginForm({ onChange }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (key, value) => {
    const updated = { ...form, [key]: value };
    setForm(updated);

    if (onChange) onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Username */}
      <div>
        <Typography className="mb-2 text-slate-300">
          نام کاربری
        </Typography>

        <Input
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
          placeholder="نام کاربری خود را وارد کنید"
        />
      </div>

      {/* Password */}
      <div>
        <Typography className="mb-2 text-slate-300">
          رمز عبور
        </Typography>

        <PasswordInput
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="رمز عبور"
        />
      </div>
    </div>
  );
}