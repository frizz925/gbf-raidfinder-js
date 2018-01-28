export default interface Tweet {
  text: string;
  source: string;
  user: {
    name: string,
    screen_name: string
  }
}
