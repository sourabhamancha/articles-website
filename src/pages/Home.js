import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
// components
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";
// sem-ui
import { Grid, Transition } from "semantic-ui-react";
// css
import "../App.css";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group duration={1000}>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 30 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
