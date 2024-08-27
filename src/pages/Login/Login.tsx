import { useNavigate } from "react-router-dom";
import * as S from "./Login.style";
import { useCookies } from "react-cookie";
import AuthAPI from "../../api/Auth";
import { useEffect, useState } from "react";
import { USER_COOKIE_KEY } from "../../constant/constants";
import { userStore } from "../../stores/userStore";

const Login = () => {
  const [userCookie, setUserCookie] = useCookies([USER_COOKIE_KEY]);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const { setUserInfo } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userCookie.user) {
      AuthAPI.getUser(userCookie.user).then((resp) => {
        setUserInfo(resp);
        navigate("/todo");
      });
    }
  }, []);

  const handleSetCookie = (userId: string) => {
    setUserCookie(USER_COOKIE_KEY, userId.toString());
  };

  const onClickSignUp = () => {
    navigate("/join");
  };

  const onClickSignIn = () => {
    AuthAPI.login({ userid: userId, userpassword: password }).then((resp) => {
      handleSetCookie(resp.id);
      navigate("/todo");
    });
  };

  return (
    <S.LoginContainer>
      <S.RowItem>
        <S.RowLeftItem>아이디</S.RowLeftItem>
        <S.RowRightItem>
          <input onChange={(e) => setUserId(e.target.value)} />
        </S.RowRightItem>
      </S.RowItem>
      <S.RowItem>
        <S.RowLeftItem>비밀번호</S.RowLeftItem>
        <S.RowRightItem>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
