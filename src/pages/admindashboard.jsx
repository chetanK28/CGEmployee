import React from "react";
import { Card, CardContent, Typography, Grid, Container, Button } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admindashboard.css";

const dashboardStats = [
  { title: "Total Balance", value: "$12,750", change: "+5% this month", icon: "💰" },
  { title: "Income", value: "$5,600", change: "+8% from last month", icon: "📈" },
  { title: "Expenses", value: "$3,460", change: "-3% from last month", icon: "📉" },
  { title: "Total Saving", value: "$7,920", change: "+12% growth", icon: "🏦" },
];

const transactions = [
  { id: 1, name: "Spotify Subscription", type: "Shopping", status: "Pending", amount: -150, date: "Jan 25, 2024" },
  { id: 2, name: "Mobile Service", type: "Service", status: "Completed", amount: -340, date: "Jan 25, 2024" },
  { id: 3, name: "Emily Wilson", type: "Transfer", status: "Completed", amount: 780, date: "Jan 25, 2024" },
];

const chartData = [
  { name: "Apr", value: 200 },
  { name: "May", value: 300 },
  { name: "Jun", value: 400 },
  { name: "Jul", value: 500 },
  { name: "Aug", value: 450 },
  { name: "Sep", value: 480 },
  { name: "Oct", value: 550 },
  { name: "Nov", value: 520 },
  { name: "Dec", value: 600 },
];

const debitCreditData = [
  { day: "Sat", debit: 2000, credit: 1500 },
  { day: "Sun", debit: 3000, credit: 2200 },
  { day: "Mon", debit: 2500, credit: 1800 },
  { day: "Tue", debit: 4000, credit: 3200 },
  { day: "Wed", debit: 4500, credit: 3500 },
  { day: "Thu", debit: 3800, credit: 3000 },
  { day: "Fri", debit: 5000, credit: 4100 },
];

const Dashboard = () => {
  return (
    <Container fluid className="dashboard-container">
      <Typography variant="h4" className="dashboard-title text-center mt-3">Banking Dashboard</Typography>

      {/* Stats Section */}
      <Grid container spacing={3} className="mt-4">
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="stat-card text-center">
              <CardContent>
                <Typography variant="h5">{stat.icon} {stat.value}</Typography>
                <Typography variant="subtitle1">{stat.title}</Typography>
                <Typography variant="caption" className="stat-change">{stat.change}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} className="mt-4">
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Daily Sales</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Transactions</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Debit & Credit Overview */}
      <Grid container className="mt-4">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Debit & Credit Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={debitCreditData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="debit" fill="#ff6b6b" />
                  <Bar dataKey="credit" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Grid container className="mt-4">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Transactions</Typography>
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Transaction</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.name}</td>
                      <td>{tx.type}</td>
                      <td>
                        <span className={`badge ${tx.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className={tx.amount < 0 ? "text-danger" : "text-success"}>
                        ${Math.abs(tx.amount)}
                      </td>
                      <td>{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="contained" color="primary" className="mt-2">View All Transactions</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
