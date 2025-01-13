import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaWallet } from "react-icons/fa";
import { FaBowlFood, FaTruckFast, FaUsers } from "react-icons/fa6";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
} from "recharts";
import { Helmet } from "react-helmet-async";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const RADIAN = Math.PI / 180;

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: adminStats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      //   console.log(res.data);
      return res.data;
    },
  });
  const { data: orderStats = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      //   console.log(res.data);
      return res.data;
    },
  });
  // CustomShapeBarChart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  //PieChartWithCustomizedLabel
  const pieChartData = orderStats.map((data) => {
    return { name: data.category, value: data.revenue };
  });
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  //
  return (
    <>
      <Helmet>
        <title>Dashboard | {import.meta.env.VITE_NAME}</title>
      </Helmet>
      <section className="my-10 px-5">
        <h2 className="text-3xl font-cinzel">
          <span>Hi, Welcome </span>
          {user?.displayName ? user.displayName : "Back"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-2 my-5 gap-3">
          <div className="stat shadow-sm bg-white rounded-xl p-4">
            <div className="stat-figure text-primary">
              <FaWallet className="text-xl sm:text-2xl md:text-4xl" />
            </div>
            <div className="stat-title text-xl text-primary">Revenue</div>
            <div className="stat-value text-primary">
              {adminStats.revenue} $
            </div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
          <div className="stat shadow-sm bg-white rounded-xl p-4">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-xl sm:text-2xl md:text-4xl" />
            </div>
            <div className="stat-title text-xl text-secondary">Customers</div>
            <div className="stat-value text-secondary">{adminStats.users}</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
          <div className="stat shadow-sm bg-white rounded-xl p-4">
            <div className="stat-figure text-emerald-700">
              <FaBowlFood className="text-xl sm:text-2xl md:text-4xl" />
            </div>
            <div className="stat-title text-xl text-emerald-700">
              Menu Items
            </div>
            <div className="stat-value text-emerald-700">
              {adminStats.menuItems}
            </div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
          <div className="stat shadow-sm bg-white rounded-xl p-4">
            <div className="stat-figure text-secondary">
              <FaTruckFast className="text-xl sm:text-2xl md:text-4xl" />
            </div>
            <div className="stat-title text-xl text-secondary">Orders</div>
            <div className="stat-value text-secondary">{adminStats.orders}</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
        </div>

        <div className="p-5 bg-white mx-2 my-5 rounded-md flex">
          <div>
            <BarChart
              width={500}
              height={300}
              data={orderStats}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar
                dataKey="quantity"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {orderStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </div>
          <div>
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminHome;
