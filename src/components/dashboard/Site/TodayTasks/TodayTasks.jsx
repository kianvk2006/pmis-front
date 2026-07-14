import { useState } from "react";

import TaskCard from "./taskcard";
import TaskDetailsModal from "./taskdetailsmodal";

const tasks = [
  {
    id: "ACT-001",
    title: "ریل گذاری",
    km: "KM 328+200",
    progress: 0,
    status: "not_started",
  },
  {
    id: "ACT-002",
    title: "خاکبرداری",
    km: "KM 329+000",
    progress: 45,
    status: "in_progress",
  },
  {
    id: "ACT-004",
    title: "بتن ریزی",
    km: "KM 331+400",
    progress: 100,
    status: "completed",
  },
];

export default function TodayTasks() {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleRegisterProgress = (task) => {
    window.dispatchEvent(
      new CustomEvent("site:register-progress", {
        detail: {
          activityId: task.id,
          activityTitle: task.title,
          km: task.km,
        },
      }),
    );

    requestAnimationFrame(() => {
      document.getElementById("site-progress-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleDetails = (task) => {
    setSelectedTask(task);
  };

  const closeDetails = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-900">
            فعالیت‌های امروز
          </h2>

          <p className="mt-2 text-slate-500">
            فعالیت‌هایی که امروز باید ثبت شوند.
          </p>
        </div>

        <div className="space-y-5">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onRegisterProgress={handleRegisterProgress}
              onDetails={handleDetails}
            />
          ))}
        </div>
      </section>

      <TaskDetailsModal task={selectedTask} onClose={closeDetails} />
    </>
  );
}
