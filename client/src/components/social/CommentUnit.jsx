import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {CommentFieldInput} from './CommentFieldInput';
import { format } from "timeago.js";
import "./social.css";

const PF = "/images/";

export class CommentUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment,
      comments: null,
      dispalySubSection: false,
      reply: false,
      edit: false,
    };
    this.props.secondKey.length === 1 &&
      this.props.currentInstance.socketIDs.push(this);
  }

  generateSub = (subcomments) => {
    // this.props.comment.subcomments
    return subcomments.map((comment, i) => (
      <CommentUnit
        parent={this}
        key={i}
        comment={comment}
        secondKey={[this.props.secondKey[0], i]}
        user={this.props.user}
        currentInstance={this.props.currentInstance}
      />
    ));
  };

  exitInputField = () => {
    this.setState({
      ...this.state,
      reply: false,
      edit: false,
    });
  };
  componentWillUnmount() {
    this === this.props.currentInstance.current &&
      (this.props.currentInstance.current = null);
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.comment.comment !== prevProps.comment.comment) {
      this.setState({ comment: this.props.comment });
    }
    return null;
  }
  render() {
    //typeof
    const userId = JSON.parse(this.props.comment.userId);
    const { secondKey, currentInstance } = this.props;
    const { comment } = this.state;
    return (
      <div className="comment-unit">
        <Avatar
          alt={userId.username}
          src={PF + userId.profilePic}
        ></Avatar>
        {/*Abel Font*/}
        <Typography style={{ fontWeight: "bold" }}>
          {userId.username}
        </Typography>

        <Typography color="textSecondary">
          <span>{format(comment.createdAt)}</span>
        </Typography>
        {this.state.edit ? (
          <CommentFieldInput
            currentInstance={currentInstance}
            currentThis={currentInstance.current}
            fieldType="edit"
            commentToEdit={comment.comment}
          />
        ) : (
          <Typography className="comments-grid-full-width">
            {" "}
            {comment.comment}{" "}
          </Typography>
        )}
        <div className="actions">
          {this.props.user?.username === userId.username && (
            <>
              <Button
                onClick={() => {
                  this.setState({
                    ...this.state,
                    edit: true,
                    reply: false,
                  });
                  this !== currentInstance.current &&
                    currentInstance.current?.exitInputField();
                  currentInstance.current = this;
                }}
                size="small"
                color="primary"
              >
                Edit
              </Button>
            </>
          )}

          {secondKey.length === 1 && (
            <>
              {this.props.user?.username && (
                <Button
                  onClick={() => {
                    this.setState({
                      comments:
                        this.state.comments !== null
                          ? this.state.comments
                          : this.generateSub(this.props.comment.subcomments),
                      reply: true,
                      edit: false,
                    });
                    this !== currentInstance.current &&
                      currentInstance.current?.exitInputField();
                    currentInstance.current = this;
                  }}
                  size="small"
                  color="primary"
                >
                  Reply
                </Button>
              )}
              {(comment?.subcomments.length > 0||
                this.state.comments?.length > 0) && (
                <Button
                  onClick={() => {
                    if (this.state.comments === null) {
                      this.setState({
                        ...this.state,
                        comments: this.generateSub(
                          this.props.comment.subcomments
                        ),
                        dispalySubSection: !this.state.dispalySubSection,
                      });
                    } else {
                      this.setState({
                        ...this.state,
                        dispalySubSection: !this.state.dispalySubSection,
                      });
                    }
                  }}
                  size="small"
                  color="primary"
                >
                  {this.state.dispalySubSection
                    ? "Hide replies"
                    : "View replies"}
                  {this.state.dispalySubSection ? (
                    <ArrowUpwardIcon fontSize="inherit" />
                  ) : (
                    <ArrowDownwardIcon fontSize="inherit" />
                  )}
                </Button>
              )}
            </>
          )}
        </div>
        {this.state.reply && (
          <CommentFieldInput
            fieldType="reply"
            currentInstance={currentInstance}
            currentThis={currentInstance.current}
          />
        )}
        {this.state.dispalySubSection && (
          <Box style={{ marginTop: "10px" }}>{this.state.comments}</Box>
        )}
      </div>
    );
  }
}