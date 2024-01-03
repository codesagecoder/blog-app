import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {CommentFieldInput} from './CommentFieldInput';
import {CommentUnit} from './CommentUnit'
import { io } from "socket.io-client";
import "./social.css";

export default class Social extends React.Component {
  constructor(props) {
    super(props);
    const { postID, initialComments, userRequest, user } = props;

    this.currentInstance = {
      socketIDs: [],
      socket: io("/", {
        query: "postId=" + postID,
      }),
      current: null,
      input: "",
      editor(command, awaitedComment, ind) {
        const { comments } = this.props.currentThis.state;
        if (command === "edit" || command === "comment") {
          awaitedComment.userId = JSON.stringify({
            profilePic: user.profilePic,
            username: user.username,
            _id: user._id,
          });
          if (command === "edit") {
            //edit
            this.props.currentThis.setState({
              ...this.props.currentThis.state,
              comment: awaitedComment,
            });
            return;
          }
          //insert new
          comments.push(
            <CommentUnit
              parent={this.props.currentThis}
              user={user}
              key={comments.length}
              comment={awaitedComment}
              secondKey={
                this.props.currentThis.props?.secondKey
                  ? [this.props.currentThis.props.secondKey[0], comments.length]
                  : [comments.length]
              }
              currentInstance={
                this.props.currentThis?.currentInstance ||
                this.props.currentInstance
              }
            />
          );
          this.props.currentThis.setState({
            ...this.props.currentThis.state,
            comments: comments,
          });
        } else {
          //delete  
          this.props.currentThis.props.parent.state.comment?.subcomments?.splice(ind,1)
         let firstTemp = this.props.currentThis.props.parent.state.comments.slice(
            0,
            ind
          );
          let lastTemp = this.props.currentThis.props.parent.state.comments.slice(
            ++ind
          );
          
          for (let commentUnit of lastTemp) {
            commentUnit.props.secondKey.length === 1 &&
            (commentUnit.props.secondKey[0] -= 1);
            commentUnit.props.secondKey.length === 2 &&
            (commentUnit.props.secondKey[1] -= 1);
          }
          this.props.currentThis.props.parent.setState({
            comment:this.props.currentThis.props.parent.state.comment,
            comments: [...firstTemp, ...lastTemp],
          });
        }
      },
      async submitComment(main) {
        let res;
        if (main?.toString()) {
          res = await userRequest().post(
            `/posts/comment/${postID}/?main=${main}`,
            {
              comment: this.props.currentInstance.input,
            }
          );
        } else {
          res = await userRequest().post(`/posts/comment/${postID}`, {
            comment: this.props.currentInstance.input,
          });
        }
        this.props.currentInstance.editor.bind(this)("comment", res.data);
        this.props.currentInstance.socket.emit("editor", {
          command: "comment",
          comment: res.data,
          location: [main],
        });
      },
      async editComment(main, sub) {
        let res;
        if (sub?.toString()) {
          res = await userRequest().put(
            `/posts/comment/${postID}/?main=${main}&sub=${sub}`,
            {
              comment: this.props.currentInstance.input,
            }
          );
          this.props.currentInstance.editor.bind(this)("edit", res.data, sub);
        } else {
          res = await userRequest().put(
            `/posts/comment/${postID}/?main=${main}`,
            {
              comment: this.props.currentInstance.input,
            }
          );
          this.props.currentInstance.editor.bind(this)("edit", res.data, main);
        }
        this.props.currentInstance.socket.emit("editor", {
          command: "edit",
          comment: res.data,
          location: [main, sub],
        });
      },
      async deleteComment(main, sub) {
        if (sub?.toString()) {
          await userRequest().delete(
            `/posts/comment/${postID}/?main=${main}&sub=${sub}`
          );
          this.props.currentInstance.editor.bind(this)("delete", null, sub);
        } else {
          await userRequest().delete(`/posts/comment/${postID}/?main=${main}`);
          this.props.currentInstance.editor.bind(this)("delete", null, main);
        }
        this.props.currentInstance.socket.emit("editor", {
          command: "delete",
          location: [main, sub],
        });
      },
    };

    this.state = {
      comments: initialComments.map((main, i) => (
        <CommentUnit
          user={user}
          key={i}
          comment={main}
          secondKey={[i]}
          currentInstance={this.currentInstance}
          parent={this}
        />
      )),
    };
    this.editor = this.currentInstance.editor;
  }

  componentWillUnmount() {
    this.currentInstance.socket.emit("unmount");
  }
  componentDidUpdate(prevProps) {
    if (this.props.postID !== prevProps.postID) {
      this.currentInstance.socket.emit("unmount");
      this.currentInstance.socket = io("/", {
        query: "postId=" + this.props.postID,
      });
    }
  }

  render() {
    return (
      <Container style={{ marginBottom: "10px" }} maxWidth="lg">
        <h2>comments</h2>
        <CommentFieldInput
          currentInstance={this.currentInstance}
          currentThis={this}
        />
        <Box>{this.state.comments}</Box>
      </Container>
    );
  }
  componentDidMount() {
    this.currentInstance.socket.on(
      "editor",
      ({ command, comment, location }) => {
        let [first, second] = location;
        if (command === "comment") {
          if (first?.toString()) {
            this.currentInstance.socketIDs[first].state.comments === null &&
              this.currentInstance.socketIDs[
                first
              ].state.comment.subcomments.push(comment);
            this.currentInstance.socketIDs[first].state.comments !== null &&
              this.currentInstance.socketIDs[first].state.comments.push(
                <CommentUnit
                  user={this.props.user}
                  key={this.state.comments.length}
                  comment={comment}
                  secondKey={[
                    first,
                    this.currentInstance.socketIDs[first].state.comments.length,
                  ]}
                  currentInstance={this.currentInstance}
                  parent={this.currentInstance.socketIDs[first]}
                />
              );
            this.currentInstance.socketIDs[first].setState({
              ...this.currentInstance.socketIDs[first].state,
            });
          } else {
            this.state.comments.push(
              <CommentUnit
                user={this.props.user}
                key={this.state.comments.length}
                comment={comment}
                secondKey={[this.state.comments.length]}
                currentInstance={this.currentInstance}
                parent={this}
              />
            );
            this.setState({ comments: this.state.comments });
          }
        } else if (command === "edit") {
          if (second?.toString()) {
            this.currentInstance.socketIDs[first].state.comments === null &&
              (this.currentInstance.socketIDs[first].state.comment.subcomments[
                second
              ] = comment);
            this.currentInstance.socketIDs[first].state.comments !== null &&
              (this.currentInstance.socketIDs[first].state.comments[second] = (
                <CommentUnit
                  user={this.props.user}
                  key={second}
                  comment={comment}
                  secondKey={[first, second]}
                  currentInstance={this.currentInstance}
                  parent={this.currentInstance.socketIDs[first]}
                />
              ));
            this.currentInstance.socketIDs[first].setState({
              ...this.currentInstance.socketIDs[first].state,
            });
          } else {
            this.currentInstance.socketIDs[first].setState({
              comment: comment,
            });
          }
        } else {
          //delete
          let firstTemp;
          let lastTemp ;

          if (second?.toString()) {
            this.currentInstance.socketIDs[first].state.comments === null &&
              this.currentInstance.socketIDs[
                first
              ].state.comment.subcomments.splice(second, 1);
            if (this.currentInstance.socketIDs[first].state.comments !== null) {
              firstTemp = this.currentInstance.socketIDs[
                first
              ].state.comments.slice(0, second);
              lastTemp = this.currentInstance.socketIDs[
                first
              ].state.comments.slice(++second);
              for (let commentUnit of lastTemp) {
                commentUnit.props.secondKey[1] -= 1;
              }
              this.currentInstance.socketIDs[first].state.comments = [
                ...firstTemp,
                lastTemp,
              ];
            }
            this.currentInstance.socketIDs[first].setState({
              comment: this.currentInstance.socketIDs[first].state.comment,
            });
          } else {
            firstTemp = this.state.comments.slice(0, first);
            lastTemp = this.state.comments.slice(++first);
            for (let commentUnit of lastTemp) {
              commentUnit.props.secondKey[0] -= 1;
            }
            this.currentInstance.socketIDs.splice(--first, 1);
            this.setState({ comments: [...firstTemp, ...lastTemp] });
          }
        }
      }
    );
  }
}