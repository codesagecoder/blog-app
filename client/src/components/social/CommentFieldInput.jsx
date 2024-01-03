import React from "react";
import TextField from "@mui/material/TextField"
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import "./social.css";

export class CommentFieldInput extends React.Component {
    render() {
      const { currentThis, currentInstance } = this.props;
  
      switch (this.props.fieldType) {
        case "edit":
          return (
            <Container className="comments-grid-full-width">
              <TextField
                id="outlined-multiline-static"
                label="Edit"
                multiline
                //   rows={4}
                defaultValue={this.props.commentToEdit}
                variant="outlined"
                fullWidth={true}
                onChange={(e) => {
                  currentInstance.input = e.target.value;
                  this.forceUpdate();
                }}
              />
              <Button
                disabled={
                  currentInstance.input === "" ||
                  currentInstance.input === this.props.commentToEdit
                }
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  currentInstance.editComment.bind(this)(
                    ...currentThis.props.secondKey
                  );
                  currentThis.exitInputField();
                }}
              >
                Apply
              </Button>
              <Button
                onClick={() => currentThis.exitInputField()}
                size="small"
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  currentInstance.deleteComment.bind(this)(
                    ...currentThis.props.secondKey
                  );
                  currentThis.exitInputField();
                }}
                size="small"
                variant="outlined"
                color="primary"
              >
                delete
              </Button>
            </Container>
          );
  
        case "reply":
          return (
            <Container className="comments-grid-full-width">
              <TextField
                id="outlined-multiline-static"
                label="Reply"
                multiline
                rows={3}
                placeholder="Type Something"
                variant="outlined"
                fullWidth={true}
                onChange={(e) => {
                  currentInstance.input = e.target.value;
                  this.forceUpdate();
                }}
              />
              <Button
                disabled={currentInstance.input === ""}
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  currentInstance.submitComment.bind(this)(
                    ...currentThis.props?.secondKey
                  );
                  currentThis.exitInputField();
                }}
              >
                Reply
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => currentThis.exitInputField()}
              >
                Cancel
              </Button>
            </Container>
          );
  
        default:
          return (
            <>
              {" "}
              <TextField
                disabled={!currentThis.props.user?.username}
                id="outlined-multiline-static"
                label={
                  currentThis.props.user?.username
                    ? "Comment"
                    : "Sign in to comment"
                }
                multiline
                rows={3}
                placeholder="Type Something"
                variant="outlined"
                fullWidth={true}
                onChange={(e) => {
                  this.inputText = e;
                  currentInstance.input = this.inputText.target.value;
                  this.forceUpdate();
                }}
              />
              <Button
                disabled={currentInstance.input === ""}
                variant="outlined"
                color="primary"
                style={{marginTop:'1rem'}}
                onClick={() => {
                  currentInstance.input = this.inputText.target.value;
                  currentInstance.submitComment.bind(this)();
                  this.inputText.target.value = "";
                  this.forceUpdate();
                }}
              >
                Comment
              </Button>
            </>
          );
      }
    }
  }