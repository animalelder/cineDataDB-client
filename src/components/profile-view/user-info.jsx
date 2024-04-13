import React from "react";

export const UserInfo = ({ email, name }) => {
  return (
    <dl>
      <dt>Username: </dt>
      <dd>{name}</dd>
      <dt>Email:</dt>
      <dd> {email}</dd>
    </dl>
  );
};
