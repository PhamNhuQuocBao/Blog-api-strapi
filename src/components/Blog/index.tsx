import { FC, memo } from "react";
import "./Blog.scss";

interface BlogProps {
  title: string;
  description: string;
  content: string;
  image?: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Blog: FC<BlogProps> = ({
  title,
  description,
  content,
  image,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="blog__item">
      <div className="btn__group">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {image && (
        <img
          className="blog__image"
          src={`http://localhost:1337${image}`}
          alt=""
        />
      )}
      <section>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </section>
    </div>
  );
};

Blog.defaultProps = {
  image: "",
  onEdit: () => {},
  onDelete: () => {},
};

export default memo(Blog);
