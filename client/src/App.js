import {gql} from "@apollo/client";
import "./App.css";
import {BookList} from "./components/BookList";

const getBooks = gql`
  {
    books {
      title
    }
  }
`;

function App() {
  console.log(getBooks);
  return (
    <div>
      <BookList />
    </div>
  );
}

export default App;
