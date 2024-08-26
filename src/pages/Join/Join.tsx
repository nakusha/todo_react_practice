import { useNavigate } from "react-router-dom";
import * as S from "./Join.style";
import Postcode from "@actbase/react-daum-postcode";
import { useState } from "react";
import Modal from "../../Modal";
import Portal from "../../Portal";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
const Join = () => {
  const [showPostSearch, setShowPostSearch] = useState(false);
  const navigate = useNavigate();

  const onClickJoin = () => {
    navigate("/");
  };

  const getAddressData = (data: OnCompleteParams) => {
    console.log(data.roadAddress, data.zonecode);
    setShowPostSearch(false);
  };

  return (
    <S.JoinContainer onSubmit={onClickJoin}>
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
        <S.RowLeftItem>이름</S.RowLeftItem>
        <S.RowRightItem>
          <input />
        </S.RowRightItem>
      </S.RowItem>
      <S.RowItem>
        <S.RowLeftItem>이메일</S.RowLeftItem>
        <S.RowRightItem>
          <input />
        </S.RowRightItem>
      </S.RowItem>
      <S.NoMBRowItem>
        <S.RowLeftItem>주소</S.RowLeftItem>
        <S.RowRightItem>
          <input />
          <button type="button" onClick={() => setShowPostSearch(true)}>
            주소검색
          </button>
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.NoMBRowItem>
        <S.RowLeftItem></S.RowLeftItem>
        <S.RowRightItem>
          <input />
        </S.RowRightItem>
      </S.NoMBRowItem>
      <S.RowItem>
        <S.RowLeftItem></S.RowLeftItem>
        <S.RowRightItem>
          <input />
        </S.RowRightItem>
      </S.RowItem>
      <S.NoMBRowItem>
        <S.Button type="submit">회원가입</S.Button>
      </S.NoMBRowItem>
      {showPostSearch && (
        <Portal>
          <Modal>
            <Postcode
              style={{ flex: 1, width: "100%", zIndex: 999 }}
              jsOptions={{ animation: true }}
              onSelected={(data) => getAddressData(data)}
              onError={function (error: unknown): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Modal>
        </Portal>
      )}
    </S.JoinContainer>
  );
};

export default Join;
