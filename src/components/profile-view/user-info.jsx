import React from "react";

export const UserInfo = ({ email, name, birthdate }) => {
  return (
    <dl>
      <dt>Username: </dt>
      <dd>{name}</dd>
      <dt>Email:</dt>
      <dd> {email}</dd>
      <dt>Date of Birth:</dt>
      <dd> {birthdate}</dd>
    </dl>
  );
};
