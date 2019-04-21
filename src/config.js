const serverTemp = {
  ip: '172.20.0.1',
  port: 4001,
  hostHttp: 'http://',
  path: 'graphql',
  hostWS: 'ws://'
}
const server = {
  ...serverTemp,
  urlHttp: `${serverTemp.hostHttp}${serverTemp.ip}:${serverTemp.port}/${serverTemp.path}`,
  urlWS: `${serverTemp.hostWS}${serverTemp.ip}:${serverTemp.port}/${serverTemp.path}`
}

export {
  server
}