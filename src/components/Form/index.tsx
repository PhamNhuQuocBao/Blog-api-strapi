import { memo, FC, useState, useCallback, ChangeEvent, useEffect } from "react";
import "./Form.scss";
import { useBlogContext } from "../../hooks/useBlogContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { OpenAI } from "openai";

interface FormProps {
  id: number;
  onOk?: () => void;
  onCancel?: () => void;
}

export interface DataBlog {
  title: string;
  description: string;
  content: string;
}

const Form: FC<FormProps> = ({ id, onCancel }) => {
  const { blogs, handleCreate, handleUpdate } = useBlogContext();
  const [dataForm, setdataForm] = useState<DataBlog>({
    title: "",
    description: "",
    content: "",
  });

  const [ckeditor, setCkeditor] = useState("");

  useEffect(() => {
    if (id) {
      const [data] = blogs.filter((blog) => {
        return blog.id === id;
      });

      const { attributes } = data;
      setdataForm(attributes);
    }
  }, []);

  const handleAutoGenerate = useCallback(() => {
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
      timeout: 5000
    });

    const res = openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "what your name?" }],
    });

    console.log(res);
  }, []);

  const handleDataChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdataForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleOk = useCallback(() => {
    id ? handleUpdate(id, dataForm) : handleCreate(dataForm);

    if (onCancel) {
      onCancel();
    }
  }, [dataForm, handleCreate, handleUpdate, id, onCancel]);

  return (
    <div className="wrapper_form">
      <form id="form_blog">
        <div className="form__group">
          <label htmlFor="name" className="label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={dataForm.title}
            className="input"
            onChange={handleDataChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="price" className="label">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="input"
            value={dataForm.description}
            onChange={handleDataChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="price" className="label">
            Content
          </label>
          <input
            type="text"
            name="content"
            id="content"
            value={dataForm.content}
            className="input"
            onChange={handleDataChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="price" className="label">
            Blog
          </label>
          <button type="button" onClick={handleAutoGenerate}>
            GPT
          </button>
          <div className="ckeditor__item">
            <CKEditor editor={ClassicEditor} data={ckeditor} />
          </div>
        </div>
        <div className="form__group btn__group">
          <button type="button" className="btn" onClick={handleOk}>
            OK
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

Form.defaultProps = {
  onOk: () => {},
  onCancel: () => {},
};

export default memo(Form);
