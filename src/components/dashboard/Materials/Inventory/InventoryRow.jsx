import StatusBadge from "./StatusBadge";

function formatNumber(value) {
  const number = Number(value) || 0;

  return number.toLocaleString("fa-IR", {
    maximumFractionDigits: 2,
  });
}

export default function InventoryRow({ item }) {
  return (
    <tr className="border-b transition last:border-none hover:bg-slate-50">
      <td className="px-5 py-5 font-semibold text-slate-800">{item.name}</td>

      <td className="px-5 py-5 text-slate-600">{item.unit || "-"}</td>

      <td className="px-5 py-5">{formatNumber(item.consumed)}</td>

      <td className="px-5 py-5">{formatNumber(item.requested)}</td>

      <td
        className={`px-5 py-5 font-bold ${
          item.netNeed > 0
            ? "text-red-500"
            : item.netNeed < 0
              ? "text-green-500"
              : "text-slate-500"
        }`}
      >
        {item.netNeed > 0 ? "+" : ""}

        {formatNumber(item.netNeed)}
      </td>

      <td className="px-5 py-5">
        <StatusBadge status={item.status} />
      </td>
    </tr>
  );
}
