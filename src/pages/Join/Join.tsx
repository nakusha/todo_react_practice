import { useNavigate } from "react-router-dom";
import * as S from "./Join.style";
import PostCode, { Address } from "react-daum-postcode";
import { useState } from "react";
import Modal from "../../Modal";
import Portal from "../../Portal";

import { useForm, SubmitHandler } from "react-hook-form";
import AuthAPI, { JoinParam } from "../../api/Auth";

const Join = () => {
  const [showPostSearch, setShowPostSearch] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JoinParam>();

  const navigate = useNavigate();

  const onClickJoin: SubmitHandler<JoinParam> = (data) => {
    AuthAPI.join(data).then(() => navigate("/"));
  };

  const getAddressData = (data: Address) => {
    setValue("zipcode", data.zonecode.toString());
    setValue("address1", data.roadAddress);
    setShowPostSearch(false);
  };

  return (
    <S.JoinContainer onSubmit={handleSubmit(onClickJoin)}>
      <S.NoMBRowItem>
        <S.RowLeftItem>아이디</S.RowLeftItem>
        <S.RowRightItem>
          <input
            {...register("userid", {
              required: "아이디를 입력해주세요",
              minLength: {
                value: 3,
                message: "아이디가 너무 짧습니다. 3자이상 입력해주세요",
              },
            })}
          />
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.ErrorRow>{errors.userid?.message}</S.ErrorRow>
      <S.NoMBRowItem>
        <S.RowLeftItem>비밀번호</S.RowLeftItem>
        <S.RowRightItem>
          <input
            type="password"
            {...register("userpassword", {
              required: "비밀번호를 입력해주세요",
            })}
          />
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.ErrorRow>{errors.userpassword?.message}</S.ErrorRow>
      <S.NoMBRowItem>
        <S.RowLeftItem>이름</S.RowLeftItem>
        <S.RowRightItem>
          <input {...register("username")} />
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.ErrorRow>{errors.username?.message}</S.ErrorRow>
      <S.NoMBRowItem>
        <S.RowLeftItem>이메일</S.RowLeftItem>
        <S.RowRightItem>
          <input {...register("email")} />
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.ErrorRow>{errors.email?.message}</S.ErrorRow>
      <S.NoMBRowItem>
        <S.RowLeftItem>주소</S.RowLeftItem>
        <S.RowRightItem>
          <input {...register("zipcode")} />
          <button type="button" onClick={() => setShowPostSearch(true)}>
            주소검색
          </button>
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.NoMBRowItem>
        <S.RowLeftItem></S.RowLeftItem>
        <S.RowRightItem>
          <input {...register("address1")} />
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.NoMBRowItem>
        <S.RowLeftItem></S.RowLeftItem>
        <S.RowRightItem>
          <input {...register("address2")} />
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.ErrorRow>
        {errors.zipcode?.message ||
          errors.address1?.message ||
          errors.address2?.message}
      </S.ErrorRow>
      <S.NoMBRowItem>
        <S.Button type="submit">회원가입</S.Button>
      </S.NoMBRowItem>
      {showPostSearch && (
        <Portal>
          <Modal onClickBackDrop={() => setShowPostSearch(false)}>
            <PostCode onComplete={(data) => getAddressData(data)} />
          </Modal>
        </Portal>
      )}
    </S.JoinContainer>
  );
};

export default Join;
