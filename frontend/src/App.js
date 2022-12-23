/* TODO
  add remaining char count above edit field
  add cancel editing option
  don't allow blank setting
  timeout edit field (3 mins)
  remove error message if 10 mins have passed/change to timer
*/
import { useState, useEffect } from "react";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [cannotEditMessage, setCannotEditMessage] = useState(false);
  const [textContents, setTextContents] = useState(" ");

  // on load/render, get database text and set textContents
  useEffect(() => {
    fetch("https://milkwall.fly.dev/")
      .then((res) => {
        console.log("response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("backend data: ", data);
        return setTextContents(data["textBlock"]);
      })
      .catch((err) => console.log(err));
  }, []);

  // on submit click, post textContents to database
  const editHandler = () => {
    fetch("https://milkwall.fly.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textBlock: textContents }),
    });
  };

  // check if there are so few spaces, text needs to be broken up to keep it from going out of viewport
  let tooFewSpaces = textContents.slice(0, 60).indexOf(" ") === -1;

  // Ask backend if an edit happened in the past 10 mins. If so, disallow edits and change error message state. If not, allow editing.
  function handleTextClick() {
    fetch("https://milkwall.fly.dev/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textBlock: textContents }),
    }).then((res) => {
      if (res.status !== 401) {
        setIsEditing(true);
        setCannotEditMessage(false);
        return;
      }
      setCannotEditMessage(true);
      throw new Error("10 mins have not passed");
    });
  }

  return (
    <div className="App">
      <div className="menu"></div>
      <div className="menu-details">
        <p>
          Thank you
          <br />
          for
          <br />
          visiting
          <br />
          MILKWALL
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditing(false);
        }}
      >
        {cannotEditMessage && (
          <p
            className="cannot-edit"
            onClick={() => setCannotEditMessage(false)}
          >
            Try again soon. One minute must pass between visitor edits.{" "}
            <span className="close-x">ˣ</span>
          </p>
        )}
        <label>
          {isEditing ? (
            <textarea
              rows="6"
              cols="80"
              maxLength={400}
              value={textContents}
              onChange={(e) => setTextContents(e.target.value)}
            />
          ) : (
            <div
              className="text-block"
              title="edit for all visitors"
              style={{ overflowWrap: tooFewSpaces && "anywhere" }}
              onClick={handleTextClick}
            >
              {textContents}
            </div>
          )}
        </label>
        {isEditing && (
          <button type="submit" onClick={editHandler}>
            Post
          </button>
        )}
      </form>
    </div>
  );
}

export default App;
