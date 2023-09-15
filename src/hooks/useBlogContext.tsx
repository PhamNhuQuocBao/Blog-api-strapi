import {
  FC,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
  useState,
} from "react";
import { add, getAllBlog, remove, update } from "../services/api";
import { DataBlog } from "../components/Form";
import { DataType } from "../views/pages/Home";

interface BlogProvidersProps {
  children: ReactNode;
}

interface Context {
  blogs: DataType[];
  handleCreate: (blog: DataBlog) => void;
  handleUpdate: (id: number, blog: DataBlog) => void;
  handleDelete: (id: number) => void;
}

const BlogContext = createContext<Context | undefined>(undefined);

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("Context is undefined");
  return context;
};

export const BlogProvider: FC<BlogProvidersProps> = ({ children }) => {
  const [blogs, setBlogs] = useState<DataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllBlog();
      setBlogs(data);
    };

    getData();
  }, []);

  const handleCreate = useCallback(async (blog: DataBlog) => {
    const { data } = await add(blog);
    setBlogs((prev) => [...prev, data]);
  }, []);

  const handleUpdate = useCallback(
    async (id: number, blog: DataBlog) => {
      const { data } = await update(id, blog);
      const newBlogs = blogs.map((oldBlog) =>
        oldBlog.id === id ? data : oldBlog
      );

      setBlogs(newBlogs);
    },
    [blogs]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      const { data } = await remove(id);
      const newBlogs = blogs.filter((blog) => blog.id !== data.id);

      setBlogs(newBlogs);
    },
    [blogs]
  );

  const valueContext = useMemo(() => {
    return { blogs, setBlogs, handleCreate, handleUpdate, handleDelete };
  }, [blogs, handleCreate, handleDelete, handleUpdate]);

  return (
    <BlogContext.Provider value={valueContext}>{children}</BlogContext.Provider>
  );
};
