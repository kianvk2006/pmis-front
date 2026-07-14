const colors = {
  pending: "bg-slate-200 text-slate-700",

  running: "bg-orange-100 text-orange-600",

  done: "bg-green-100 text-green-700",

  stopped: "bg-red-100 text-red-600",
};

const names = {
  pending: "شروع نشده",

  running: "درحال اجرا",

  done: "انجام شد",

  stopped: "متوقف",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${colors[status]}
        `}
    >
      {names[status]}
    </span>
  );
}
