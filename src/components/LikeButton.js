import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";

import MyPopup from "../util/MyPopup";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost, { error }] = useMutation(LIKE_POST_MUTATION, {
    onError(err) {
      console.log(err);
    },
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="green">
        <Icon name="thumbs up outline" />
      </Button>
    ) : (
      <Button color="green" basic>
        <Icon name="thumbs up outline" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="green" basic>
      <Icon name="thumbs up outline" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup content={liked ? "Unlike" : "Like"}>{likeButton}</MyPopup>
      <Label basic color="green" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;