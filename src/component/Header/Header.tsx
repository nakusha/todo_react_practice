import { useQuery } from "@tanstack/react-query";
import AuthAPI, { UserInfo } from "../../api/Auth";
import { useCookies } from "react-cookie";
import { USER_COOKIE_KEY } from "../../constant/constants";
import * as S from "./Header.style";
import Selector from "../Selector/Selector";
import { useEffect, useState } from "react";

const Header = () => {
  const [userCookie] = useCookies([USER_COOKIE_KEY]);
  const [selectUser, setSelectUser] = useState<number>();

  useEffect(() => {
    if (userCookie.user) {
      setSelectUser(userCookie.user);
    }
  }, [userCookie]);

  const { data } = useQuery({
    queryKey: ["getUsers"],
    queryFn: AuthAPI.getUser,
    refetchOnWindowFocus: false,
    select: (data): { label: string; value: number }[] => {
      return data.map((item: UserInfo) => ({
        label: item.username,
        value: item.id,
      }));
    },
  });

  const onChangeUser = (userInfo: number) => {
    setSelectUser(userInfo);
  };
  return (
    <S.HeaderContainer>
      <Selector<number>
        defaultValue={userCookie.user}
        options={data || []}
        onChange={onChangeUser}
      />
    </S.HeaderContainer>
  );
};

export default Header;
