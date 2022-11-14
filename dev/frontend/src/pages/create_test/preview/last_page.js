import correct from "correct.png";
import "../req_2_1.css";

import {
  CREATE_TEST_URL,
  MENU_URL,
  PREVIEW_URL,
  CREATE_TEST_WITH_TAGS_URL,
  PUBLISHED_URL,
} from "urls.js";

function CreateTestLastPage() {
  document.body.style = "background: var(--pink)";
  return (
    <div className="lastPageOfCreatePage">
      <h1 className="req-2-1-title">Create a Test</h1>
      <h2 className="req-2-1-subTitle" style={{ marginTop: "1.5em" }}>
        Congratulations, your test has been published!
      </h2>

      <img src={correct} className="req2-lastPage-correctImage" alt="logo" />
    </div>
  );
}

export default CreateTestLastPage;
