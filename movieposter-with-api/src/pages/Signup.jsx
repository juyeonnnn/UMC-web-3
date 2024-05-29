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

const Haveid = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 12px;

  .active {
    margin-left: 10px;
    text-decoration: none;
    color: white;
    &:hover {
      font-weight: bold;
    }
  }
`;

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    password: '',
    passwordCheck: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    password: '',
    passwordCheck: '',
  });

  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
    setIsValid(Object.values(formData).every((value) => value.trim() !== '')); // 입력값이 바뀔 때마다 유효성 검사
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = validateForm(); // 폼 유효성 검사
    setIsValid(formIsValid); // 유효성 여부 업데이트
    if (formIsValid) {
      try {
        const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        // 성공적으로 회원가입한 경우
        if (response.ok) {
          alert('회원가입 성공!');
          // 로그인 페이지로 이동
          window.location.href = '/login';
        } else {
          // 이미 존재하는 아이디인 경우
          if (response.status === 409) {
            alert(data.message);
          }
          // 비밀번호가 일치하지 않는 경우
          else if (response.status === 400) {
            alert(data.message);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      // 폼 유효성 검사 실패 시 에러 메시지 표시
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: formData.name.trim() ? '' : '이름을 입력해주세요.',
        username: formData.username.trim() ? '' : '아이디를 입력해주세요.',
        email: formData.email.trim() ? '' : '이메일을 입력해주세요.',
        age: formData.age.trim() ? '' : '나이를 입력해주세요.',
        password: formData.password.trim() ? '' : '비밀번호를 입력해주세요.',
        passwordCheck: formData.passwordCheck.trim()
          ? ''
          : '비밀번호를 다시 입력해주세요.',
      }));
    }
  };

  //유효성 검사
  const validateForm = () => {
    for (const key in errors) {
      if (errors[key]) {
        return false; // 하나라도 에러가 있으면 유효성 검사 실패
      }
    }
    return Object.values(formData).every((value) => value.trim() !== ''); // 모든 필드가 비어있지 않아야 유효성 검사 성공
  };

  //에러메세지
  const validateField = (fieldName, value) => {
    let errorMessage = '';
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          errorMessage = '이름을 입력해주세요.';
        }
        break;
      case 'username':
        if (!value.trim()) {
          errorMessage = '아이디를 입력해주세요.';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMessage = '이메일을 입력해주세요.';
        } else if (!/@/.test(value)) {
          errorMessage = '이메일 형식에 맞게 다시 입력해주세요.';
        }
        break;
      case 'age':
        const ageNum = parseFloat(value);
        if (!value.trim()) {
          errorMessage = '나이를 입력해주세요.';
        } else if (isNaN(ageNum)) {
          errorMessage = '나이는 숫자로 입력해주세요.';
        } else if (ageNum < 0) {
          errorMessage = '나이는 양수여야합니다.';
        } else if (ageNum % 1 !== 0) {
          errorMessage = '나이는 실수로 입력할 수 없습니다';
        } else if (ageNum < 19) {
          errorMessage = '우리 사이트는 19세 이상만 가입 가능합니다.';
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
      case 'passwordCheck':
        if (!value.trim()) {
          errorMessage = '비밀번호를 다시 입력해주세요.';
        } else if (value.trim() !== formData.password) {
          errorMessage = '비밀번호가 일치하지 않습니다.';
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
      <h2>회원가입 페이지</h2>
      <Form onSubmit={handleSubmit}>
        <Label></Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력해주세요."
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

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
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요."
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Label></Label>
        <Input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="나이를 입력해주세요."
        />
        {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}

        <Label></Label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Label></Label>
        <Input
          type="password"
          name="passwordCheck"
          value={formData.passwordCheck}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
        />
        {errors.passwordCheck && (
          <ErrorMessage>{errors.passwordCheck}</ErrorMessage>
        )}
        <br />
        <Button type="submit">제출하기</Button>
      </Form>
      <Haveid>
        <div>아이디가 이미 있으신가요?</div>
        <Link to="/login" className="active">
          로그인 페이지로 이동하기
        </Link>
      </Haveid>
    </Container>
  );
}

export default SignupForm;
