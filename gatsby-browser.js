const Buffer = require("buffer/").Buffer // note: the trailing slash is important!

exports.onClientEntry = () => {
  if (!("Buffer" in window)) {
    window.Buffer = Buffer
  }
}
