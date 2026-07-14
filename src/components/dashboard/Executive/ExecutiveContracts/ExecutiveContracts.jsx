import ContractCard from "./ContractCard";

const contracts = [
  {
    title: "قرارداد EPC",
    contractor: "شرکت مپنا",
    progress: 68,
    amount: "۲,۴۵۰ میلیارد",
    paid: "۱,۶۸۰ میلیارد",
  },
  {
    title: "تجهیزات برقی",
    contractor: "زیمنس",
    progress: 52,
    amount: "۹۸۰ میلیارد",
    paid: "۴۲۰ میلیارد",
  },
  {
    title: "سیگنالینگ",
    contractor: "Thales",
    progress: 81,
    amount: "۷۴۰ میلیارد",
    paid: "۶۵۰ میلیارد",
  },
];

export default function ExecutiveContracts() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">وضعیت قراردادها</h3>

      <div className="space-y-5">
        {contracts.map((contract, index) => (
          <ContractCard key={index} {...contract} />
        ))}
      </div>
    </div>
  );
}
