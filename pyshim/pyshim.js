/* eslint-disable no-console */
const { spawn } = require('child_process');
const rp = require('request-promise-native');
const { URL } = require('url');

const startBgProcess = () => {
  const options = {
    cwd: '/opt/binaris',
    // cwd: '/tmp/euclid/euclid/tools',
    env: {
      CPP_MAX_MATCHING: 'False',
      PYTHONPATH: [
        '/tmp/euclid',
        '/tmp/venv/site-packages',
        '/tmp/venv/lib/python2.7/site-packages',
      ].join(':'),
    },
  };

  console.log('Starting background process...', JSON.stringify(options));

  // Default port is 8000
  const bg = spawn('pypy', ['-m', 'SimpleHTTPServer'], options);
  // const bg = spawn('pypy', ['experiments.py'], options);

  bg.on('error', (err) => {
    console.error('Failed to start background process.', JSON.stringify(err));
  });

  bg.stdout.pipe(process.stdout);
  bg.stderr.pipe(process.stderr);

  bg.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  console.log('Background process launched.');
};

startBgProcess();

exports.handler = async (body, request) => {
  console.log('Async handler request object', JSON.stringify(request));
  console.log('Async handler: forwarding request to background process');

  try {
    const url = new URL(request.path || '/', 'http://localhost:8000');
    const responseBody = await rp.get(url.toString());
    console.log('Async handler: background process responded with: ', responseBody);
    return responseBody;
  } catch (err) {
    console.error('Async handler: background process error', err.message);
    throw err;
  }
};
