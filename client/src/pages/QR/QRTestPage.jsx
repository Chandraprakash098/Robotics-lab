"use client"

import { useState } from "react"
import { studentAPI } from "../../services/api"
import { Button, Card } from "../../styles/GlobalStyles"
import styled from "styled-components"

const TestContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const TestSection = styled(Card)`
  margin-bottom: 20px;
  
  h3 {
    color: #007bff;
    margin-bottom: 15px;
  }
  
  .test-result {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin-top: 15px;
    
    pre {
      background: #e9ecef;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
    }
  }
`

const QRTestPage = () => {
  const [testResults, setTestResults] = useState({})
  const [loading, setLoading] = useState({})

  const runTest = async (testName, testFunction) => {
    setLoading((prev) => ({ ...prev, [testName]: true }))
    try {
      const result = await testFunction()
      setTestResults((prev) => ({ ...prev, [testName]: { success: true, data: result } }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [testName]: {
          success: false,
          error: error.response?.data?.message || error.message,
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, [testName]: false }))
    }
  }

  const testAPIConnection = async () => {
    const response = await studentAPI.getAll({ limit: 1 })
    return response.data
  }

  const testStudentSearch = async () => {
    const studentId = prompt("Enter student ID to search:")
    if (!studentId) throw new Error("No student ID provided")

    const response = await studentAPI.getAll({ search: studentId })
    return response.data
  }

  const testQRDataFormat = () => {
    const sampleQRData = JSON.stringify({
      studentId: "STU001",
      timestamp: Date.now(),
    })

    return {
      sampleQRData,
      parsed: JSON.parse(sampleQRData),
    }
  }

  return (
    <TestContainer>
      <h2>🧪 QR Scanner Test Page</h2>
      <p>Use this page to test the QR scanning functionality before deploying.</p>

      <TestSection>
        <h3>1. API Connection Test</h3>
        <p>Test if the frontend can connect to your backend API.</p>
        <Button onClick={() => runTest("apiConnection", testAPIConnection)} disabled={loading.apiConnection}>
          {loading.apiConnection ? "Testing..." : "Test API Connection"}
        </Button>

        {testResults.apiConnection && (
          <div className="test-result">
            <strong>Result:</strong> {testResults.apiConnection.success ? "✅ Success" : "❌ Failed"}
            {testResults.apiConnection.success ? (
              <pre>{JSON.stringify(testResults.apiConnection.data, null, 2)}</pre>
            ) : (
              <p style={{ color: "red" }}>{testResults.apiConnection.error}</p>
            )}
          </div>
        )}
      </TestSection>

      <TestSection>
        <h3>2. Student Search Test</h3>
        <p>Test searching for a student by ID (simulates QR code scanning).</p>
        <Button onClick={() => runTest("studentSearch", testStudentSearch)} disabled={loading.studentSearch}>
          {loading.studentSearch ? "Searching..." : "Test Student Search"}
        </Button>

        {testResults.studentSearch && (
          <div className="test-result">
            <strong>Result:</strong> {testResults.studentSearch.success ? "✅ Success" : "❌ Failed"}
            {testResults.studentSearch.success ? (
              <pre>{JSON.stringify(testResults.studentSearch.data, null, 2)}</pre>
            ) : (
              <p style={{ color: "red" }}>{testResults.studentSearch.error}</p>
            )}
          </div>
        )}
      </TestSection>

      <TestSection>
        <h3>3. QR Data Format Test</h3>
        <p>Test the QR code data format that your backend generates.</p>
        <Button onClick={() => runTest("qrFormat", testQRDataFormat)}>Test QR Format</Button>

        {testResults.qrFormat && (
          <div className="test-result">
            <strong>Sample QR Data:</strong>
            <pre>{JSON.stringify(testResults.qrFormat.data, null, 2)}</pre>
          </div>
        )}
      </TestSection>

      <TestSection>
        <h3>📱 Mobile Testing Instructions</h3>
        <div style={{ background: "#e7f3ff", padding: "15px", borderRadius: "6px" }}>
          <h4>To test on mobile after deployment:</h4>
          <ol>
            <li>Deploy your backend to a service like Railway, Render, or Heroku</li>
            <li>
              Update the <code>VITE_API_URL</code> environment variable in Vercel
            </li>
            <li>Deploy this frontend to Vercel</li>
            <li>Open the deployed URL on your mobile device</li>
            <li>Login as faculty</li>
            <li>Go to "Mobile Scanner" page</li>
            <li>Test with a student's QR code</li>
          </ol>

          <h4>Environment Variable Setup:</h4>
          <p>In Vercel, add this environment variable:</p>
          <code>VITE_API_URL = https://your-backend-url.com/api</code>
        </div>
      </TestSection>
    </TestContainer>
  )
}

export default QRTestPage
