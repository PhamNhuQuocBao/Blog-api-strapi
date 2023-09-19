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
  gpt?: string;
}

const Form: FC<FormProps> = ({ id, onCancel }) => {
  const { blogs, handleCreate, handleUpdate } = useBlogContext();
  const [dataForm, setDataForm] = useState<DataBlog>({
    title: "",
    description: "",
    content: "",
    gpt: "",
  });  

  useEffect(() => {
    if (id) {
      const [data] = blogs.filter((blog) => {
        return blog.id === id;
      });

      const { attributes } = data;
      setDataForm(attributes);
    }
  }, []);

  const handleAutoGenerate = useCallback(async () => {
    if (dataForm.gpt) {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const { choices } = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: dataForm.gpt }],
      });

      setDataForm((prev) => ({
        ...prev,
        content: prev.content + choices[0].message.content as string,
      }));
    } else {
      alert("You have to enter value chat");
    }
  }, []);

  const handleDataChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleEditorChange = useCallback((value: string) => {
    setDataForm((prev) => ({
      ...prev,
      content: value
    }));
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
            name="gpt"
            id="gpt"
            value={dataForm.gpt}
            className="input"
            onChange={handleDataChange}
            placeholder="auto generate from chatGPT..."
          />
          <button type="button" onClick={handleAutoGenerate}>
            GPT
          </button>
          <div className="ckeditor__item">
            <CKEditor
              editor={ClassicEditor}
              data={dataForm.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleEditorChange(data);
              }}
            />
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
