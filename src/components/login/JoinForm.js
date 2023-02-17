import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../commonApi/todoApi";

const JoinForm = () => {
  const navigator = useNavigate();

  //멤버
  // const [user, setUser] = useState();
  // const [input, setInput] = useState();

  const [member, setMember] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
    birth: "",
    gender: "",
    authRole: "ROLE_MEMBER",
  });

  //오류메세지
  const [message, setMessage] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
    birth: "",
    gender: "",
    authRole: "ROLE_MEMBER",
  });

  //유효성
  const [effect, setEffect] = useState({
    username: false,
    password: false,
    passwordConfirm: false,
    nickName: false,
    birth: false,
    gender: false,
    authRole: "ROLE_MEMBER",
  });

  const onSubmit = async (e) => {
    if (!userValidator()) return;

    e.preventDefault();
    await axios
      .post(`${baseUrl}/join`, member, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setMember({
          username: "",
          password: "",
          nickName: "",
          birth: "",
          gender: "",
          authRole: "ROLE_MEMBER",
        });
      })
      .then((response) => {
        setMessage({
          username: "",
          password: "",
          passwordConfirm: "",
          nickName: "",
          birth: "",
          gender: "",
          authRole: "ROLE_MEMBER",
        });
      })
      .then((response) => {
        setEffect({
          username: false,
          password: false,
          passwordConfirm: false,
          nickName: false,
          birth: false,
          gender: false,
          authRole: "ROLE_MEMBER",
        });
      })
      .then((response) => {
        navigator("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onChangeName = (e) => {
    const currentUsername = e.target.value;
    setMessage({ username: currentUsername });
    const idRegExp = /^[0-9a-zA-Z]+$/;
    if (idRegExp.test(e.target.value)) {
      setMember({ ...member, username: e.target.value });
      setMessage({ ...message, username: e.target.value });
      console.log(e.target.value);
      setEffect({ username: false });
    } else {
      setMessage({ ...message, username: "사용가능한 아이디" });
      setEffect({ ...effect, username: true });
      // setInput({ ...member.username, username: e.target.value });
    }
  };
  const userValidator = () => {
    let valid = true;
    if (member.password !== member.passwordConfirm) {
      valid = false;
      alert("비밀번호가 일치하지 않습니다.");
    }
    return valid;
  };

  const userChangeNick = (e) => {
    const currentNickName = e.target.value;
    setMessage({ nickName: currentNickName });
    const nickRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
  };

  const handleValueChange = (e) => {
    // radio 버튼에서는 preventDefault()를 하면 더블클릭을 해줘야 한다.
    // e.preventDefault();
    setMember({ ...member, [e.target.name]: e.target.value });

    if (e.target.name === member.passwordConfirm) {
      userValidator();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <span>아이디</span>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="???"
              value={member.username}
              onChange={onChangeName}
            />
            <span></span>
          </div>
          <div className="form-group mb-1">
            <span>비밀번호</span>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="영어, 숫자, 특수문자를 조합하여 8~12자 안으로 입력"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <span>비밀번호 확인</span>
            <input
              type="password"
              className="form-control"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              onChange={handleValueChange}
            />
          </div>
          <span></span>

          <div className="form-group mb-1">
            <span>닉네임</span>
            <input
              type="nickName"
              className="form-control"
              name="nickName"
              placeholder="영어,한글,숫자 상관없이 2~7자 안으로 입력"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <span>출생년도</span>
            <input
              type="birth"
              className="form-control"
              name="birth"
              placeholder="출생년도 4자리 입력 "
              onChange={handleValueChange}
            />
          </div>
          <label className="form-group mb-1">
            <span>성별</span>
            <br />
            <input type="radio" name="gender" className="genchk" value="남" />남
          </label>
          <label className="form-group mb-1">
            <input type="radio" name="gender" className="genchk" value="여" />여
          </label>
          <hr className="my-3" />
          <div className="form-group mb-3 mb-1">
            <div
              className="form-check form-check-inline  form-group"
              onChange={handleValueChange}
            >
              <label className="mx-5">
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_ADMIN"
                  className="form-check-input"
                />
                관리자
              </label>
              <label className="mx-5">
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_MANAGER"
                  className="form-check-input"
                />
                매니저
              </label>
              <label className="mx-5">
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_MEMBER"
                  className="form-check-input"
                  // 기본으로 사용하기 위해 defaultChecked={true} 사용
                  defaultChecked={true}
                />
                일반 사용자
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;
