import React, { useState } from 'react';
import { register } from '../services/api'; // API 호출 함수 임포트

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // 메시지를 저장할 상태 추가
  const [error, setError] = useState(''); // 에러 메시지를 저장할 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration attempt with:', username, password);
    setMessage(''); // 이전 메시지 초기화
    setError(''); // 이전 에러 메시지 초기화
    
    try {
      const response = await register(username, password);
      console.log('Registration successful:', response);
      setMessage('Registration successful!'); // 성공 메시지 설정
    } catch (error) {
      // 에러 핸들링 개선
      if (error.response) {
        console.error('Registration failed:', error.response.data);
        setError('Registration failed: ' + error.response.data.message || 'An error occurred.'); // 에러 메시지 설정
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response received from the server.');
      } else {
        console.error('Error setting up the request:', error.message);
        setError('Error: ' + error.message);
      }
    }
  };
  
  return (
    <div>
      <h2>Register</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>} {/* 성공 메시지 표시 */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

/*import React, { useState } from 'react';
import { register } from '../services/api'; // API 호출 함수 임포트

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration attempt with:', username, password);
    
    try {
      const response = await register(username, password);
      console.log('Registration successful:', response);
    } catch (error) {
      // 에러 핸들링 개선
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx가 아닌 경우
        console.error('Registration failed:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // 요청이 이루어졌지만 응답이 없는 경우
        console.error('No response received:', error.request);
      } else {
        // 요청을 설정하는 중에 발생한 에러
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
*/