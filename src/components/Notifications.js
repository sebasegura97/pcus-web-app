import React from "react";
import {
  Typography,
  Card,
  CircularProgress,
  CardContent,
  CardHeader,
  CardActionArea,
  Button,
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_NOTIFICATIONS } from "../gql/queries/users";
import { READ_NOTIFICATION } from "../gql/mutations/users";
import formatDate from "../utilities/formatDate";

const Notification = ({ notification, children }) => {
  const { createdAt, message, reason } = notification;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        borderRadius: 4,
        maxWidth: 600,
        margin: "auto",
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 8,
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <Typography align="right"> {formatDate(createdAt)} </Typography>
        <Typography variant="h6"> {reason} </Typography>
        <Typography variant="body1"> {message} </Typography>
      </div>
      {children}
    </div>
  );
};

export default function Notifications() {
  const { data: notifications, loading: loading_notifications } = useQuery(
    GET_NOTIFICATIONS,
    {
      fetchPolicy: "network-only",
      onCompleted(data) {
        console.log(data);
      },
    }
  );
  const [read] = useMutation(READ_NOTIFICATION, {
    refetchQueries: [
      {
        query: GET_NOTIFICATIONS,
        variables: { readed: false },
      },
    ],
  });

  const handleReadNotification = (id) => {
    read({ variables: { id } });
  };

  if (notifications && notifications.getNotifications.notifications.length) {
    return (
      <>
        <Typography variant="h5" align="center" color="primary">
          Notificaciones
        </Typography>
        {notifications.getNotifications.notifications.map((notification) => (
          <Notification key={notification.id} notification={notification}>
            <Button
              onClick={() => handleReadNotification(notification.id)}
              color="primary"
              variant="text"
              style={{ marginLeft: "auto" }}
            >
              LEIDA
            </Button>
          </Notification>
        ))}
      </>
    );
  } else {
    return <CircularProgress />;
  }
}
