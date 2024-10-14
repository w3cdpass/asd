import cliui from 'cliui';

const ui = cliui({
  wrap: false,  // Prevent wrapping of text
});

// hello
// Title and usage1
ui.div('Usage 1: asd [command] --downloading file');

// Title and usage2
ui.div('Usage 2: asd [command] [filename] --extracting file');

// Commands section
ui.div({
  text: 'Commands:',
  padding: [1, 0, 1, 0],
});

// Command: download
ui.div(
  { text: '    download', width: 30, padding: [0, 4, 0, 4] },  // Increased width
  { text: 'Download a file from the given URL', width: 60, align: 'left' }
);

// Command: extract
ui.div(
  { text: '    extract', width: 30, padding: [0, 4, 0, 4] },  // Increased width
  { text: 'Extract the specified file (supports .zip, .tar.gz)', width: 60, align: 'left' }
);

// Options section
ui.div({
  text: 'Options:',
  padding: [2, 0, 1, 0],
});

// Option: --url
ui.div(
  { text: '    --url, -u', width: 30, padding: [0, 4, 0, 4] },  // Increased width
  { text: 'Specify the URL to download the file', width: 60, align: 'left' }
);

// Option: --output
ui.div(
  { text: '    --output, -o', width: 30, padding: [0, 4, 0, 4] },  // Increased width
  { text: 'Specify the output directory for the downloaded file', width: 60, align: 'left' }
);

// Option: --extract
ui.div(
  { text: '    --extract, -e', width: 30, padding: [0, 4, 0, 4] },  // Increased width
  { text: 'Extract the downloaded file after completion', width: 60, align: 'left' }
);

console.log(ui.toString());

