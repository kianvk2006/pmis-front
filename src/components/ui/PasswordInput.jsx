import { useState } from "react";
import Input from "./Input";

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? "text" : "password"}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-300"
      >
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}