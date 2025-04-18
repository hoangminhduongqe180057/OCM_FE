import * as signalR from '@microsoft/signalr';

let connection = null;
let isConnected = false;
let isStarting = false;

export const initializeSignalR = async (onMessageReceived) => {
  if (isConnected || isStarting) {
    return;
  }

  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7075/hubs/notification', {
        accessTokenFactory: () => localStorage.getItem('accessToken'),
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  connection.off('ReceiveNotification');
  connection.on('ReceiveNotification', (message) => {
    onMessageReceived(message);
  });

  try {
    isStarting = true;
    await connection.start();
    isConnected = true;
  } catch (err) {
    console.error('Failed to start SignalR:', err);
  } finally {
    isStarting = false;
  }

  connection.onclose(() => {
    isConnected = false;
  });
};

export const stopSignalR = async () => {
  if (connection && isConnected) {
    await connection.stop();
    connection = null;
    isConnected = false;
  }
};