import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../commonApi/todoApi";

const BoardWrite = () => {
  const [inputs, setInputs] = useState({
    writer: "",
    email: "",
    subject: "",
    content: "",
    filename: null,
  });

  const navigator = useNavigate();

  const { currentPage, num, ref, re_step, re_level } = useParams();

  //구조분해할당
  const { writer, email, subject, content, filename } = inputs;

  const handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    console.log(nextState);
    //setInputs((prev) => {
    // return { ...prev, ...nextState };
    //});
    setInputs({ ...inputs, ...nextState });
    //setInputs({...inputs, e.target.name:e.target.value});
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    console.log("files:" + e.target.files[0]);
    setInputs({ ...inputs, filename: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("writer", writer);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("content", content);
    console.log("filename", filename);
    if (filename !== null) formData.append("filename", filename);

    //답변글이면...
    if (num !== undefined) {
      formData.append("num", num);
      formData.append("ref", ref);
      formData.append("re_step", re_step);
      formData.append("re_level", re_level);
      //navigator(`/board/list/${response.data}`); 밑에 이거 사용시 필요함
      formData.append("currentPage", currentPage);
    }

    const config = {
      headers: { "Content-type": "multipart/form-data" },
    };

    await axios
      .post(`${baseUrl}/board/write`, formData, config)
      .then((response) => {
        console.log(response.data);
        setInputs({
          writer: "",
          email: "",
          subject: "",
          content: "",
          filename: null,
        });
        // navigator(`/board/list/${currentPage ? currentPage : 1}`);
        navigator(`/board/list/${response.data}`);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  //////////////////////////////////////////////////////////////////////
  return (
    <>
      <form onSubmit={onSubmit}>
        {" "}
        <table>
          <tbody>
            <tr>
              <td width="20%" align="center">
                글쓴이
              </td>
              <td>
                <input
                  type="text"
                  name="writer"
                  size="10"
                  maxLength="10"
                  value={writer}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <td width="20%" align="center">
                Email
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  size="30"
                  maxLength="30"
                  value={email}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <td width="20%" align="center">
                제목
              </td>
              <td>
                <input
                  type="text"
                  name="subject"
                  size="40"
                  value={subject}
                  placeholder={num !== undefined ? "답변" : null}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <td width="20%" align="center">
                내용
              </td>
              <td>
                <textarea
                  name="content"
                  rows="13"
                  cols="40"
                  value={content}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>

            <tr>
              <td width="20%" align="center">
                첨부파일
              </td>
              <td>
                <input
                  type="file"
                  name="filename"
                  id="filepath"
                  onChange={handleFileChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Link className="btn btn-primary" to={`/board/list/${currentPage}`}>
          리스트
        </Link>
        <input type="submit" className="btn btn-primary" value="등록" />
      </form>
    </>
  );
};

export default BoardWrite;
