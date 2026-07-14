import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import { progressChart } from "@/mocks/dashboard";

export default function ProgressChart() {
    return (
        <div className="h-[330px]">

            <ResponsiveContainer width="100%" height="100%">

                <LineChart data={progressChart}>

                    <CartesianGrid strokeDasharray="4 4" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        dataKey="planned"
                        stroke="#2563eb"
                        strokeWidth={3}
                    />

                    <Line
                        dataKey="actual"
                        stroke="#f97316"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}