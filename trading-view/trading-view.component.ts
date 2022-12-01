import { Component, OnInit } from '@angular/core';

const cleanerRgx = /~h~/g;
const splitterRgx = /~m~[0-9]{1,}~m~/g;

const parseWSPacket = (str: string) => {
  return str.replace(cleanerRgx, '').split(splitterRgx)
            .map((p) => {
              if (!p) { return false; }
              try {
                return JSON.parse(p);
              } catch (error) {
                console.warn('Cant parse', p);
                return false;
              }
            })
            .filter((p) => p);
};

const formatWSPacket = (packet: any) => {
  const msg = typeof packet === 'object'
              ? JSON.stringify(packet)
              : packet;
  return `~m~${msg.length}~m~${msg}`;
};

const genSessionID = (type = 'xs') => {
  let r = '';
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 12; i += 1) { r += c.charAt(Math.floor(Math.random() * c.length)); }
  return `${type}_${r}`;
};

const ws = new WebSocket(`wss://data.tradingview.com/socket.io/websocket`);

const sessionId = genSessionID('cs');

ws.onopen = () => {
  ws.send(formatWSPacket({
    m: 'set_auth_token', p: ['unauthorized_user_token']
  }));
  ws.send(formatWSPacket({
    m: 'chart_create_session', p: [sessionId]
  }));
  ws.send(formatWSPacket({
    m: 'resolve_symbol', p: [
      sessionId,
      `ser_1`,
      `=${JSON.stringify({
        symbol: 'BINANCE:BTCUSDT',
        adjustment: 'splits'
      })}`,
    ]
  }));
  ws.send(formatWSPacket({
    m: 'create_series', p: [
      sessionId,
      '$prices',
      's1',
      `ser_1`,
      `60`,
      100,
    ]
  }));
};

ws.onmessage = (event: MessageEvent) => {
  const data = parseWSPacket(event.data)[0];
  console.log(parseWSPacket(event.data));
  if (typeof data === 'number') {
    ws.send(formatWSPacket(`~h~${data}`));
  } else if (data.m === 'symbol_resolved') {
    console.log(data);
  }
};

@Component({
  selector: 'app-trading-view',
  templateUrl: './trading-view.component.html',
  styleUrls: ['./trading-view.component.scss']
})
export class TradingViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
