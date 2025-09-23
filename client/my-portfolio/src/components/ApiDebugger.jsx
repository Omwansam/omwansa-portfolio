import React, { useState } from 'react';
import apiService from '../services/api';

const ApiDebugger = () => {
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDebugTest = async () => {
    setLoading(true);
    setDebugInfo(null);

    const results = {
      timestamp: new Date().toISOString(),
      environment: {
        hostname: window.location.hostname,
        protocol: window.location.protocol,
        port: window.location.port,
        mode: import.meta.env.MODE,
        prod: import.meta.env.PROD,
      },
      apiConfig: {
        baseURL: apiService.baseURL,
        staticBaseURL: apiService.staticBaseURL,
      },
      tests: {}
    };

    try {
      // Test 1: Health check
      console.log('🔍 Testing health endpoint...');
      const healthOk = await apiService.healthCheck();
      results.tests.healthCheck = {
        success: healthOk,
        endpoint: `${apiService.baseURL.replace('/api', '')}/health`
      };

      // Test 2: Education API
      console.log('🔍 Testing education endpoint...');
      try {
        const educationData = await apiService.getEducations();
        results.tests.educationAPI = {
          success: true,
          dataLength: educationData ? educationData.length : 0,
          endpoint: `${apiService.baseURL}/education`,
          sampleData: educationData && educationData.length > 0 ? educationData[0] : null
        };
      } catch (error) {
        results.tests.educationAPI = {
          success: false,
          error: error.message,
          endpoint: `${apiService.baseURL}/education`
        };
      }

      // Test 3: Direct fetch test
      console.log('🔍 Testing direct fetch...');
      try {
        const directResponse = await fetch(`${apiService.baseURL}/education`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        results.tests.directFetch = {
          success: directResponse.ok,
          status: directResponse.status,
          statusText: directResponse.statusText,
          headers: Object.fromEntries(directResponse.headers.entries())
        };
      } catch (error) {
        results.tests.directFetch = {
          success: false,
          error: error.message,
          errorType: error.name
        };
      }

    } catch (error) {
      results.generalError = error.message;
    }

    setDebugInfo(results);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md">
      <h3 className="font-bold text-lg mb-2">🔧 API Debugger</h3>
      
      <button
        onClick={runDebugTest}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
      >
        {loading ? 'Testing...' : 'Run API Test'}
      </button>

      {debugInfo && (
        <div className="text-xs">
          <h4 className="font-semibold mb-2">Debug Results:</h4>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-64">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiDebugger;
