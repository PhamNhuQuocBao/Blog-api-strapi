import { FC, memo } from "react";
import "./Blog.scss";

interface BlogProps {
  title: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Blog: FC<BlogProps> = ({ title, description, onEdit, onDelete }) => {
  return (
    <div className="blog__item">
      <div className="btn__group">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

Blog.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default memo(Blog);
