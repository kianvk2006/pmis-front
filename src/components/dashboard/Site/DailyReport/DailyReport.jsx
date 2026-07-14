import Header from "./Header";
import GenelarInfo from "./GeneralInfo";
import WeatherSection from "./WeatherSection";
import SupervisorSection from "./SupervisorSection";
import Description from "./Description";
import SaveDraftButton from "./SaveDraftButton";

import { useSiteReport } from "../store";

export default function DailyReport() {
  const { report, updateGeneralInfo } = useSiteReport();

  const generalInfo = report.generalInfo;

  const handleSaveDraft = () => {
    const draftPayload = {
      status: "draft",

      generalInfo: {
        ...generalInfo,

        temperature:
          generalInfo.temperature === ""
            ? null
            : Number(generalInfo.temperature),
      },
    };

    console.log("DAILY_REPORT_DRAFT", draftPayload);
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <Header status={report.status} />

      <div className="mt-8 space-y-8">
        <GenelarInfo generalInfo={generalInfo} onChange={updateGeneralInfo} />

        <div className="border-t border-slate-100" />

        <WeatherSection
          generalInfo={generalInfo}
          onChange={updateGeneralInfo}
        />

        <div className="border-t border-slate-100" />

        <SupervisorSection
          generalInfo={generalInfo}
          onChange={updateGeneralInfo}
        />

        <div className="border-t border-slate-100" />

        <Description generalInfo={generalInfo} onChange={updateGeneralInfo} />

        <div className="flex justify-end border-t border-slate-100 pt-6">
          <SaveDraftButton onClick={handleSaveDraft} />
        </div>
      </div>
    </section>
  );
}
