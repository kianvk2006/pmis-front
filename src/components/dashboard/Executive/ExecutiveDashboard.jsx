import ExecutiveHeader from "./ExecutiveHeader";
import { KPIBox } from "./ExecutiveCards";
import { ExecutivePerformanceChart, PerformanceCard } from "./Charts";
import { GaugeCard } from "./ExecutiveCards";
import { Activity, Wallet, CalendarClock, ShieldAlert } from "lucide-react";
import ExecutiveRisks from "./ExecutiveRisks";
import ExecutiveActivities from "./ExecutiveActivities";
import ExecutiveContracts from "./ExecutiveContracts";
import ExecutiveMilestones from "./ExecutiveMilestones";

export default function ExecutiveDashboard() {
  return (
    <div className="space-y-8">
      <ExecutiveHeader />

      <section className="grid grid-cols-4 gap-6">
        <KPIBox
          title="پیشرفت کل پروژه"
          value={68}
          unit="%"
          percent={8}
          color="orange"
          icon={Activity}
        />

        <KPIBox
          title="سلامت بودجه"
          value={92}
          unit="%"
          percent={5}
          color="green"
          icon={Wallet}
        />

        <KPIBox
          title="سلامت زمان‌بندی"
          value={87}
          unit="%"
          percent={2}
          color="blue"
          icon={CalendarClock}
        />

        <KPIBox
          title="ریسک پروژه"
          value={14}
          unit=""
          percent={4}
          color="red"
          trend="down"
          icon={ShieldAlert}
        />
      </section>
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <PerformanceCard title="عملکرد پروژه">
            <ExecutivePerformanceChart />
          </PerformanceCard>
        </div>

        <div className="col-span-4">
          <PerformanceCard title="خلاصه وضعیت">
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between">
                  <span>زمان‌بندی</span>
                  <span>87%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[87%] rounded-full bg-orange-500"></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span>بودجه</span>
                  <span>92%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[92%] rounded-full bg-emerald-500"></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span>کیفیت</span>
                  <span>95%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[95%] rounded-full bg-sky-500"></div>
                </div>
              </div>
            </div>
          </PerformanceCard>
        </div>
      </section>
      <section className="grid grid-cols-4 gap-6">
        <GaugeCard title="سلامت پروژه" value={92} color="#10B981" />

        <GaugeCard title="سلامت زمان" value={87} color="#3B82F6" />

        <GaugeCard title="سلامت بودجه" value={81} color="#F97316" />

        <GaugeCard title="شاخص کیفیت" value={96} color="#8B5CF6" />
      </section>
      <section>
        <ExecutiveRisks />
      </section>
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <ExecutiveActivities />
        </div>

        <div className="col-span-5">
          <PerformanceCard title="تصمیمات مدیریت">
            <div className="space-y-5">
              <div className="rounded-xl bg-slate-100 p-4">
                افزایش شیفت کاری ایستگاه مرکزی
              </div>

              <div className="rounded-xl bg-slate-100 p-4">
                خرید تجهیزات برق تا پایان هفته
              </div>

              <div className="rounded-xl bg-slate-100 p-4">
                بررسی مجدد برنامه زمان‌بندی
              </div>
            </div>
          </PerformanceCard>
        </div>
      </section>
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <ExecutiveContracts />
        </div>

        <div className="col-span-5">
          <PerformanceCard title="وضعیت مالی">
            <div className="space-y-6">
              <div className="flex justify-between">
                <span>بودجه کل</span>
                <strong>۳,۵۰۰ میلیارد</strong>
              </div>

              <div className="flex justify-between">
                <span>هزینه واقعی</span>
                <strong>۲,۷۸۰ میلیارد</strong>
              </div>

              <div className="flex justify-between">
                <span>CPI</span>
                <strong className="text-green-600">1.08</strong>
              </div>

              <div className="flex justify-between">
                <span>SPI</span>
                <strong className="text-orange-500">0.94</strong>
              </div>
            </div>
          </PerformanceCard>
        </div>
      </section>
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <ExecutiveMilestones />
        </div>

        <div className="col-span-7">
          <PerformanceCard title="شاخص‌های کلیدی پروژه">
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-slate-500">Earned Value</p>

                <h2 className="mt-3 text-3xl font-bold">2.41T</h2>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-slate-500">Planned Value</p>

                <h2 className="mt-3 text-3xl font-bold">2.58T</h2>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-slate-500">Actual Cost</p>

                <h2 className="mt-3 text-3xl font-bold">2.33T</h2>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-slate-500">BAC</p>

                <h2 className="mt-3 text-3xl font-bold">3.50T</h2>
              </div>
            </div>
          </PerformanceCard>
        </div>
      </section>
    </div>
  );
}
