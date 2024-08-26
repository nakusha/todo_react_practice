import { useNavigate } from "react-router-dom";
import * as S from "./Login.style";
const Login = () => {
  const navigate = useNavigate();
  const onClickSignUp = () => {
    navigate("/join");
  };

  const onClickSignIn = () => {
    navigate("/todo");
  };
  return (
    <S.LoginContainer>
      <S.RowItem>
        <S.RowLeftItem>아이디</S.RowLeftItem>
        <S.RowRightItem>
          <input />
        </S.RowRightItem>
      </S.RowItem>
      <S.RowItem>
        <S.RowLeftItem>비밀번호</S.RowLeftItem>
        <S.RowRightItem>
          <input />
        </S.RowRightItem>
      </S.RowItem>
      <S.RowItem>
        <S.Button onClick={onClickSignUp}>회원가입</S.Button>
        <S.Button onClick={onClickSignIn}>로그인</S.Button>
      </S.RowItem>
    </S.LoginContainer>
  );
};

export default Login;
