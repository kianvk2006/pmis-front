import MachineMarker from "./MachineMarker";
import SkippedMarker from "./SkippedMarker";

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function clampPercent(value) {
  return Math.min(100, Math.max(0, normalizeNumber(value)));
}

export default function RailwayLine({
  progress = 0,
  activityMarkers = [],
  delayMarkers = [],
}) {
  const safeProgress = clampPercent(progress);

  return (
    <div dir="ltr" className="relative mt-14">
      {/* خط اصلی پیشرفت */}

      <div className="relative">
        <div className="h-5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-green-500
              via-green-500
              to-orange-500
              transition-all
              duration-700
            "
            style={{
              width: `${safeProgress}%`,
            }}
          />
        </div>

        {/* موقعیت ماشین */}

        <div
          className="
            absolute
            -top-10
            -translate-x-1/2
            transition-all
            duration-700
          "
          style={{
            left: `${safeProgress}%`,
          }}
        >
          <MachineMarker />
        </div>
      </div>

      {/* Marker فعالیت‌ها و تأخیرها */}

      <div className="relative mt-8 h-20">
        {activityMarkers.map((item) => {
          const position = clampPercent(item.progress ?? item.position);

          return (
            <div
              key={item.id}
              className="
                absolute
                -translate-x-1/2
              "
              style={{
                left: `${position}%`,
              }}
            >
              {/* وضعیت فعالیت */}

              <div
                className={`
                  mx-auto
                  h-3
                  w-3
                  rounded-full

                  ${
                    item.progress >= 100
                      ? "bg-green-500"
                      : item.progress > 0
                        ? "bg-orange-500"
                        : "bg-slate-300"
                  }
                `}
              />

              {/* نام فعالیت */}

              <span
                dir="rtl"
                title={item.name}
                className="
                  mt-3
                  block
                  w-32
                  -translate-x-1/2
                  text-center
                  text-xs
                  text-slate-500
                "
              >
                {item.name}
              </span>
            </div>
          );
        })}

        {/* تأخیرها */}

        {delayMarkers.map((item) => (
          <div
            key={item.id}
            className="
              absolute
              -translate-x-1/2
            "
            style={{
              left: `${clampPercent(item.position)}%`,
            }}
          >
            <SkippedMarker label={item.label} reason={item.reason} />
          </div>
        ))}
      </div>
    </div>
  );
}
