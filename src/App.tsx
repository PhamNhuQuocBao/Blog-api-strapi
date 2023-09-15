import { BlogProvider } from "./hooks/useBlogContext";
import HomePage from "./views/pages/Home";

function App() {
  return (
    <>
      <BlogProvider>
        <HomePage />
      </BlogProvider>
    </>
  );
}

export default App;
