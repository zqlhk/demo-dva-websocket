const ws = new WebSocket('wss://echo.websocket.org/');

export function listen(cb) {
  ws.onopen = event => {
    console.log('connected');
    ws.send(Date.now());
  };

  ws.onclose = event => {
    console.log('disconnected');
  };

  ws.onerror = event => {
    console.log(event.data);
  };

  ws.onmessage = event => {
    console.log(`Roundtrip time: ${Date.now() - event.data} ms`);

    setTimeout(() => {
      ws.send(Date.now());
    }, 30000);

    cb(event.data);
  };
}
