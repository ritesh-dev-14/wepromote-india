const fs = require('fs');
// Let's search all chunks for 'thread-layer' and see how scroll is connected
const scriptMatches = [...fs.readFileSync('thread_bundle.js', 'utf8')]; // already deleted daksh.html? wait, let's check what files we have
