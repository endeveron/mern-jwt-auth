export default class DialogError extends Error {
  constructor (message, title) {
    super(message);
    this.dialogData = {
      title,
      message
    };
  }
}