import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

function SignupForm() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    id: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formIsValid = validateForm(); // 유효성 검사 수행
    setIsValid(formIsValid); // 유효성 여부 업데이트
    if (formIsValid) {
      // 유효성 검사 통과 시 처리
      console.log('폼 데이터:', formData);
      alert('로그인 성공!');
      // 홈페이지로 이동
      setTimeout(() => {
        window.location.href = '/'; // 홈페이지 URL로 변경
      });
    } else {
      // 유효성 검사 실패 시 에러 메시지 표시
      setErrors((prevErrors) => ({
        ...prevErrors,
        id: formData.id.trim() ? '' : '아이디를 입력해주세요.',
        password: formData.password.trim() ? '' : '비밀번호를 입력해주세요.',
      }));
    }
    setIsValid(formIsValid); // 유효성 여부 업데이트
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
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
        />
        {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}

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

export default SignupForm;
