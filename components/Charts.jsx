import React from "react";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
function Charts() {
  return (
    <div className="charts-container">
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={100}
        minHeight={300}
      >
        <BarChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="0" />
          <XAxis
            padding={{ left: 10 }}
            dataKey="month"
            tickSize={0}
            axisLine={false}
          />
          <YAxis
            padding={{ bottom: 10, top: 10 }}
            tickCount={6}
            axisLine={false}
            tickSize={0}
          />
          <Tooltip />
          <Legend
            iconType="circle"
            iconSize={10}
            verticalAlign="top"
            align="right"
          />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            activeBar={false}
            barSize={60}
            radius={[4, 4, 4, 4]}
          />
          <Bar
            dataKey="uv"
            fill="#82ca9d"
            activeBar={false}
            barSize={60}
            radius={[4, 4, 4, 4]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
