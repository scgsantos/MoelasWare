//import correct from "correct.png";
import checkmark from "assets/SGV/checkmark.svg";
import "pages/create_test/number_only/NumberOnly.css";

import {
  CREATE_TEST_URL,
  MENU_URL,
  PREVIEW_URL,
  CREATE_TEST_WITH_TAGS_URL,
  TEST_PUBLISHED_URL,
} from "urls.js";

function CreateTestLastPage() {
  document.documentElement.style.setProperty("--base", "var(--pink)");

  return (
    <div className="lastPageOfCreatePage">
      <h1 className="NumberOnly-title">Create a Test</h1>
      <h2 className="NumberOnly-subTitle" style={{ marginTop: "1.5em" }}>
        Congratulations, your test has been published!
      </h2>

      <img
        src={checkmark}
        className="req2-lastPage-checkmarkImage"
        alt="checkmark"
      />
    </div>
  );
}

export default CreateTestLastPage;
