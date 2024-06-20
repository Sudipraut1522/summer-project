import { useParams } from "react-router-dom";
import { useGetAllCommentByID } from "../../Api/getCommentByID";

interface Comment {
  id: string;
  userImage: string;
  userName: string;
  comment: string;
}

const VideoComments = () => {
  const { id } = useParams<{ id: string }>();

  const { data: comments, isLoading, error } = useGetAllCommentByID(id!);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>;
  }

  return (
    <div className="p-4 max-h-96 overflow-y-auto">
      {comments && comments.length > 0 ? (
        comments.map((comment: Comment) => (
          <div
            key={comment.id}
            className="flex items-start mb-4 p-4 border-b border-gray-200"
          >
            <img
              src={comment.userImage}
              alt={comment.userName}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-gray-700">{comment.comment}</p>
              <span className="text-gray-500 text-sm">
                By: {comment.userName}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>No comments available</div>
      )}
    </div>
  );
};

export default VideoComments;
