import React, { useState } from 'react';
import { login } from '../services/api'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // 에러 메시지를 저장할 상태 추가
    const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지를 저장할 상태 추가

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // 이전 에러 메시지 초기화
        setSuccessMessage(''); // 이전 성공 메시지 초기화

        try {
            const response = await login(username, password); // 로그인 요청
            console.log('Login successful:', response.data);
            setSuccessMessage('Login successful!'); // 성공 메시지 설정
            // 로그인 성공 처리 (예: 토큰 저장, 리다이렉트 등)
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Login failed. Please check your username and password.'); // 에러 메시지 설정
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* 성공 메시지 표시 */}
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
