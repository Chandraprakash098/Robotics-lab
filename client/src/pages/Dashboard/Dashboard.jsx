"use client"

import { useState, useEffect } from "react"
import { Card } from "../../styles/GlobalStyles"
import { attendanceAPI, studentAPI, behaviorAPI } from "../../services/api"
import styled from "styled-components"

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`

const StatCard = styled(Card)`
  text-align: center;
  
  h3 {
    font-size: 2rem;
    color: #007bff;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`

const RecentActivity = styled(Card)`
  h3 {
    margin-bottom: 20px;
    color: #333;
  }
`

const ActivityItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  .time {
    color: #666;
    font-size: 0.9rem;
  }
`

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    todayAttendance: 0,
    recentReports: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [studentsRes, attendanceRes, reportsRes] = await Promise.all([
        studentAPI.getAll({ limit: 1 }),
        attendanceAPI.getToday(),
        behaviorAPI.getAll({ limit: 5 }),
      ])

      setStats({
        totalStudents: studentsRes.data.total || 0,
        todayAttendance: attendanceRes.data.length || 0,
        recentReports: reportsRes.data.total || 0,
      })

      setRecentActivity(attendanceRes.data.slice(0, 5))
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>Dashboard</h2>

      <DashboardGrid>
        <StatCard>
          <h3>{stats.totalStudents}</h3>
          <p>Total Students</p>
        </StatCard>

        <StatCard>
          <h3>{stats.todayAttendance}</h3>
          <p>Today's Attendance</p>
        </StatCard>

        <StatCard>
          <h3>{stats.recentReports}</h3>
          <p>Behavior Reports</p>
        </StatCard>
      </DashboardGrid>

      <RecentActivity>
        <h3>Recent Activity</h3>
        {recentActivity.length > 0 ? (
          recentActivity.map((activity, index) => (
            <ActivityItem key={index}>
              <div>
                <strong>
                  {activity.studentId?.personalDetails?.firstName} {activity.studentId?.personalDetails?.lastName}
                </strong>{" "}
                - {activity.labSession}
              </div>
              <div className="time">{new Date(activity.timeIn).toLocaleString()}</div>
            </ActivityItem>
          ))
        ) : (
          <p>No recent activity</p>
        )}
      </RecentActivity>
    </div>
  )
}

export default Dashboard
