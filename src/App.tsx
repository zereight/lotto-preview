import { useState } from "react";
import "./App.css";
import guideImage from "./guide_img.png";
import useGA from "./useGA";

function App() {
  const [numbers, setNumbers] = useState("");

  useGA();

  const handleClickButton = () => {
    if (numbers.length === 0) {
      alert("복권번호를 입력해주세요.");

      return;
    }

    window.location.assign(
      `https://www.dhlottery.co.kr/myPage.do?method=lotto645Detail&orderNo=20200411&barcode=${numbers}&issueNo=1 `
    );
  };

  const handleClickNavigate동행복권 = () => {
    window.open("https://www.dhlottery.co.kr/", "_blank");
  };

  return (
    <div className="container">
      <div className="topBanner" />

      <header>
        <h1>{"복권당첨 미리보기"}</h1>
      </header>

      <div className="body">
        <label className="label">
          {"선택번호/복권번호 입력하기"}

          <div style={{ height: 30 }} />

          <input
            type="number"
            className="input"
            value={numbers}
            onChange={(event) => setNumbers(event.target.value)}
            placeholder="동행복권에서 복권번호를 복사해오세요"
          />
        </label>

        <div style={{ height: 30 }} />

        <button className="button" type="button" onClick={handleClickButton}>
          {"당첨확인"}
        </button>
      </div>

      <div style={{ height: 100 }} />

      <div className="guide_container">
        <button
          className="go_dhlottery"
          type="button"
          onClick={handleClickNavigate동행복권}
        >
          {"동행복권 바로가기"}
        </button>

        <div style={{ height: 30 }} />

        <img src={guideImage} alt="가이드" className="guide_image" />
      </div>
    </div>
  );
}

export default App;
