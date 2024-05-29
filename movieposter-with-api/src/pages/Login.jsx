import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  width: 500px;
  flex-direction: column;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: 300px;
  border-radius: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: ${(props) => (props.isValid ? 'yellow' : 'white')};
  color: black;
  border: none;
  border-radius: 20px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
    setIsValid(validateForm()); // 입력값이 바뀔 때마다 유효성 검사
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('로그인 성공!');
        localStorage.setItem('token', data.token); // 토큰을 로컬 스토리지에 저장
        window.location.href = '/'; // 메인 페이지로 리디렉션
      } else {
        // 로그인 실패 처리
        alert(data.message); // 에러 메시지 표시
      }
    } catch (error) {
      console.error('Error:', error);
      // 에러 처리
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = validateForm();
    setIsValid(formIsValid);
    if (formIsValid) {
      handleLogin(); // 로그인 함수 호출
    } else {
      // 유효성 검사 실패 시 에러 메시지 표시
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: formData.username.trim() ? '' : '아이디를 입력해주세요.',
        password: formData.password.trim() ? '' : '비밀번호를 입력해주세요.',
      }));
    }
  };

  // 유효성 검사
  const validateForm = () => {
    for (const key in errors) {
      if (errors[key]) {
        return false; // 에러가 있으면 유효성 검사 실패
      }
    }
    return true; // 모든 필드가 유효하면 유효성 검사 성공
  };
  //에러메세지
  const validateField = (fieldName, value) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'id':
        if (!value.trim()) {
          errorMessage = '아이디를 입력해주세요.';
        }
        break;
      case 'password':
        if (!value.trim()) {
          errorMessage = '비밀번호를 입력해주세요.';
        } else if (value.trim().length < 4) {
          errorMessage = '최소 4자리 이상 입력해주세요.';
        } else if (value.trim().length > 12) {
          errorMessage = '최대 12자리까지 입력 가능합니다.';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
          errorMessage = '영어, 숫자, 특수문자를 포함해주세요.';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  return (
    <Container>
      <h2>로그인 페이지</h2>
      <Form onSubmit={handleSubmit}>
        <Label></Label>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}

        <Label></Label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <br />
        <Button type="submit" isValid={isValid}>
          로그인
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
