import { FC, memo, useState, useCallback } from "react";
import Blog from "../../../components/Blog";
import Modal from "../../../components/Modal";
import Form from "../../../components/Form";
import { useBlogContext } from "../../../hooks/useBlogContext";
import "./Home.scss";

interface DataBlog {
  title: string;
  description: string;
  content: string;
  image: {
    data: null | {
      attributes: {
        url: string;
      };
    };
  };
  createAt?: string;
  updateAt?: string;
  publishAt?: string;
}

export interface DataType {
  id: number;
  attributes: DataBlog;
}

const HomePage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { blogs, handleDelete } = useBlogContext();
  const [idForm, setIdForm] = useState<number>(0);

  const handlePopupModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, [isOpenModal]);

  const handleDeleteBlog = useCallback(
    (id: number) => {
      handleDelete(id);
    },
    [handleDelete]
  );

  const handleEditBlog = useCallback((id: number) => {
    setIdForm(id);
    setIsOpenModal(true);
  }, []);

  return (
    <>
      <h1>Management</h1>
      <div>
        <button className="btn" onClick={handlePopupModal}>
          Add new blog
        </button>
      </div>
      <div className="blogs__group">
        {blogs.map((blog) => {
          const { id, attributes } = blog;

          return (
            <Blog
              key={id}
              title={attributes.title}
              description={attributes.description}
              content={attributes.content}
              image={
                attributes.image.data && attributes.image.data.attributes.url
              }
              onDelete={() => {
                handleDeleteBlog(id);
              }}
              onEdit={() => {
                handleEditBlog(id);
              }}
            />
          );
        })}
      </div>
      {isOpenModal && (
        <Modal>
          <Form id={idForm} onCancel={handlePopupModal} />
        </Modal>
      )}
    </>
  );
};

export default memo(HomePage);
