// Hook for managing connection requests
// Provides easy access to connection-related functionality

import { useState, useCallback } from 'react';
import type { ConnectionRequest } from '../types';
import * as connectionsApi from '../api/connections';

export function useConnections() {
  // Force re-render when connections change
  const [, setVersion] = useState(0);
  const forceUpdate = useCallback(() => setVersion((v) => v + 1), []);

  // Send a connection request
  const sendRequest = useCallback(
    (fromId: string, toId: string, message: string): ConnectionRequest => {
      const request = connectionsApi.createConnectionRequest(fromId, toId, message);
      forceUpdate();
      return request;
    },
    [forceUpdate]
  );

  // Check if a connection request exists between two users
  const hasRequested = useCallback((fromId: string, toId: string): boolean => {
    return connectionsApi.hasConnectionRequest(fromId, toId);
  }, []);

  // Get connection request between two users
  const getRequest = useCallback(
    (fromId: string, toId: string): ConnectionRequest | undefined => {
      return connectionsApi.getConnectionRequest(fromId, toId);
    },
    []
  );

  // Get all connection requests
  const listRequests = useCallback((): ConnectionRequest[] => {
    return connectionsApi.getConnections();
  }, []);

  // Get sent requests for a user
  const getSentRequests = useCallback((userId: string): ConnectionRequest[] => {
    return connectionsApi.getSentRequests(userId);
  }, []);

  // Get received requests for a user
  const getReceivedRequests = useCallback((userId: string): ConnectionRequest[] => {
    return connectionsApi.getReceivedRequests(userId);
  }, []);

  // Update connection status
  const updateStatus = useCallback(
    (id: string, status: ConnectionRequest['status']): void => {
      connectionsApi.updateConnectionStatus(id, status);
      forceUpdate();
    },
    [forceUpdate]
  );

  // Delete connection request
  const deleteRequest = useCallback(
    (id: string): void => {
      connectionsApi.deleteConnectionRequest(id);
      forceUpdate();
    },
    [forceUpdate]
  );

  return {
    sendRequest,
    hasRequested,
    getRequest,
    listRequests,
    getSentRequests,
    getReceivedRequests,
    updateStatus,
    deleteRequest,
  };
}

