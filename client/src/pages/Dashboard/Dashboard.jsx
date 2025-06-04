"use client";

import { useState, useEffect } from "react";
import { Card } from "../../styles/GlobalStyles";
import { attendanceAPI, studentAPI, behaviorAPI } from "../../services/api";
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const DashboardContainer = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%);
  min-height: 100vh;
`;

const DashboardHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }

  p {
    color: #6c757d;
    font-size: 1.1rem;
    font-weight: 400;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const StatCard = styled(Card)`
  background: linear-gradient(135deg, #fff 0%, #f8f9ff 100%);
  border: none;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => props.gradient};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 16px;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  h3 {
    font-size: 3rem;
    font-weight: 800;
    background: ${(props) => props.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  p {
    color: #6c757d;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const RecentActivity = styled(Card)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;

    &::before {
      content: "📊";
      font-size: 1.5rem;
    }
  }
`;

const ActivityItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(102, 126, 234, 0.05) 0%,
      transparent 100%
    );
    padding-left: 16px;
    margin: 0 -16px;
    border-radius: 12px;
  }

  .student-info {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
  }

  .name {
    font-weight: 600;
    color: #2d3748;
    font-size: 1.1rem;
  }

  .session {
    color: #4a5568;
    font-weight: 500;
  }

  .time {
    color: #718096;
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: "🕒";
      font-size: 0.8rem;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  flex-direction: column;
  gap: 20px;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  p {
    color: #6c757d;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;

  .icon {
    font-size: 4rem;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    todayAttendance: 0,
    recentReports: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [studentsRes, attendanceRes, reportsRes] = await Promise.all([
        studentAPI.getAll({ limit: 1 }),
        attendanceAPI.getToday(),
        behaviorAPI.getAll({ limit: 5 }),
      ]);

      setStats({
        totalStudents: studentsRes.data.total || 0,
        todayAttendance: attendanceRes.data.length || 0,
        recentReports: reportsRes.data.total || 0,
      });

      setRecentActivity(attendanceRes.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </LoadingContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening in your robotics lab today.</p>
      </DashboardHeader>

      <DashboardGrid>
        <StatCard gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          <div className="icon">👥</div>
          <h3>{stats.totalStudents}</h3>
          <p>Total Students</p>
        </StatCard>

        <StatCard gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
          <div className="icon">✅</div>
          <h3>{stats.todayAttendance}</h3>
          <p>Today's Attendance</p>
        </StatCard>

        <StatCard gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
          <div className="icon">📋</div>
          <h3>{stats.recentReports}</h3>
          <p>Behavior Reports</p>
        </StatCard>
      </DashboardGrid>

      <RecentActivity>
        <h3>Recent Activity</h3>
        {recentActivity.length > 0 ? (
          recentActivity.map((activity, index) => (
            <ActivityItem key={index}>
              <div className="student-info">
                <div className="avatar">
                  {getInitials(
                    activity.studentId?.personalDetails?.firstName,
                    activity.studentId?.personalDetails?.lastName
                  )}
                </div>
                <div>
                  <div className="name">
                    {activity.studentId?.personalDetails?.firstName}{" "}
                    {activity.studentId?.personalDetails?.lastName}
                  </div>
                  <div className="session">
                    Lab Session: {activity.labSession}
                  </div>
                </div>
              </div>
              <div className="time">
                {new Date(activity.timeIn).toLocaleString()}
              </div>
            </ActivityItem>
          ))
        ) : (
          <EmptyState>
            <div className="icon">📊</div>
            <p>No recent activity to display</p>
          </EmptyState>
        )}
      </RecentActivity>
    </DashboardContainer>
  );
};

export default Dashboard;
