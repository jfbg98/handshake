// Mock API for connection requests using localStorage
// This will be replaced with actual API calls when backend is ready

import type { ConnectionRequest } from '../types';

const STORAGE_KEY = 'handshake_connections';

// Get all connection requests from localStorage
export function getConnections(): ConnectionRequest[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading connections from localStorage:', error);
    return [];
  }
}

// Save connections to localStorage
function saveConnections(connections: ConnectionRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(connections));
  } catch (error) {
    console.error('Error saving connections to localStorage:', error);
  }
}

// Create a new connection request
export function createConnectionRequest(
  fromId: string,
  toId: string,
  message: string
): ConnectionRequest {
  const connections = getConnections();
  
  const newRequest: ConnectionRequest = {
    id: Math.random().toString(36).substring(2, 11),
    fromId,
    toId,
    message,
    timestamp: new Date().toISOString(),
    status: 'pending',
  };
  
  connections.push(newRequest);
  saveConnections(connections);
  
  return newRequest;
}

// Check if a connection request exists between two users
export function hasConnectionRequest(fromId: string, toId: string): boolean {
  const connections = getConnections();
  return connections.some(
    (conn) => 
      (conn.fromId === fromId && conn.toId === toId) ||
      (conn.fromId === toId && conn.toId === fromId)
  );
}

// Get connection request between two users (either direction)
export function getConnectionRequest(
  fromId: string,
  toId: string
): ConnectionRequest | undefined {
  const connections = getConnections();
  return connections.find(
    (conn) =>
      (conn.fromId === fromId && conn.toId === toId) ||
      (conn.fromId === toId && conn.toId === fromId)
  );
}

// Get all connection requests sent by a user
export function getSentRequests(userId: string): ConnectionRequest[] {
  const connections = getConnections();
  return connections.filter((conn) => conn.fromId === userId);
}

// Get all connection requests received by a user
export function getReceivedRequests(userId: string): ConnectionRequest[] {
  const connections = getConnections();
  return connections.filter((conn) => conn.toId === userId);
}

// Update connection request status
export function updateConnectionStatus(
  id: string,
  status: ConnectionRequest['status']
): void {
  const connections = getConnections();
  const index = connections.findIndex((conn) => conn.id === id);
  
  if (index !== -1) {
    connections[index].status = status;
    saveConnections(connections);
  }
}

// Delete a connection request
export function deleteConnectionRequest(id: string): void {
  const connections = getConnections();
  const filtered = connections.filter((conn) => conn.id !== id);
  saveConnections(filtered);
}

