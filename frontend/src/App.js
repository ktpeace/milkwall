/* TODO
  add remaining char count above edit field
  add cancel editing option
  don't allow blank
  timeout edit field (3 mins)
*/
import { useState, useEffect } from "react";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [textContents, setTextContents] = useState(" ");
  const [editingText, setEditingText] = useState(textContents);
  const [cannotEditMessage, setCannotEditMessage] = useState(false);

  // update text states with data from backend
  useEffect(() => {
    fetch("https://milkwall-backend.fly.dev/")
      .then((res) => res.json())
      .then((data) => setTextContents(data["textBlock"]));
    setEditingText(textContents);
  }, [textContents]);

  // post text edits to backend & update frontend text states
  const editHandler = () => {
    fetch("https://milkwall-backend.fly.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textBlock: editingText }),
    });
    setTextContents(editingText);
  };

  // check if there are so few spaces, text needs to be broken up to keep it from going out of viewport
  let tooFewSpaces = textContents.slice(0, 60).indexOf(" ") === -1;

  // Ask backend if an edit happened in the past 10 mins. If so, disallow edits and change error message state. If not, allow editing.
  function handleTextClick() {
    fetch("https://milkwall-backend.fly.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textBlock: editingText }),
    })
      .then((res) => {
        if (res.status !== 401) {
          return res.json();
        }
        throw new Error("10 mins have not passed");
      })
      .then((data) => setIsEditing(true))
      .catch((err) => setCannotEditMessage(true));
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
            Try again soon. Ten minutes must pass between visitor edits.{" "}
            <span className="close-x">ˣ</span>
          </p>
        )}
        <label>
          {isEditing ? (
            <textarea
              rows="6"
              cols="80"
              maxLength={400}
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
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
