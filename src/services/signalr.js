// src/services/signalr.js
import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:7075/notificationHub', {
    accessTokenFactory: () => localStorage.getItem('accessToken'),
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

export const startConnection = async () => {
  try {
    await connection.start();
    console.log('SignalR Connected');
  } catch (err) {
    console.error('SignalR Connection Error: ', err);
  }
};

export const onNotification = (callback) => {
  connection.on('ReceiveNotification', callback);
};