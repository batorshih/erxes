import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import Notifications from '../../components/notifications/List';
import {
  IUser,
  NotificationsCountQueryResponse,
  NotificationsQueryResponse
} from '../../../types';

type Props = {
  count: number;
  currentUser: IUser;
  requireRead?: boolean;
};

const notificationsQuery = gql`
  query ClientPortalNotifications(
    $endDate: String
    $limit: Int
    $notifType: NotificationType
    $page: Int
    $perPage: Int
    $requireRead: Boolean
    $search: String
    $startDate: String
  ) {
    clientPortalNotifications(
      endDate: $endDate
      limit: $limit
      notifType: $notifType
      page: $page
      perPage: $perPage
      requireRead: $requireRead
      search: $search
      startDate: $startDate
    ) {
      _id
      createdAt
      isRead
      title
      content
      createdUser {
        username
        details {
          fullName
          avatar
        }
      }
    }
  }
`;

const markAsReadMutation = gql`
  mutation ClientPortalNotificationsMarkAsRead(
    $ids: [String]
    $markAll: Boolean
  ) {
    clientPortalNotificationsMarkAsRead(_ids: $ids, markAll: $markAll)
  }
`;

function NotificationsContainer(props: Props) {
  const [markAsReadMutaion] = useMutation(markAsReadMutation);

  const markAsRead = (ids: string[]) => {
    markAsReadMutaion({
      variables: {
        ids
      }
    });
  };

  const markAllAsRead = () => {
    markAsReadMutaion({
      variables: {
        markAll: true
      }
    });
  };

  const notificationsResponse = useQuery<NotificationsQueryResponse>(
    notificationsQuery,
    {
      skip: !props.currentUser,
      variables: {
        page: 1,
        perPage: 10
      },
      fetchPolicy: 'network-only'
    }
  );

  const showNotifications = (requireRead: boolean) => {
    notificationsResponse.refetch({ requireRead });
  };

  const notifications =
    (notificationsResponse.data &&
      notificationsResponse.data.clientPortalNotifications) ||
    [];

  const refetch = () => {
    notificationsResponse.refetch();
  };

  const updatedProps = {
    ...props,
    notifications,
    loading: notificationsResponse.loading,
    markAsRead,
    showNotifications,
    markAllAsRead,
    refetch
  };

  return <Notifications {...updatedProps} />;
}

export default NotificationsContainer;
