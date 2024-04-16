export const UserInfo = ({ email, name, birthdate }) => {
  return (
    <dl>
      <dt>
        <span>Username:</span>
      </dt>
      <dd>
        <span>{name}</span>
      </dd>
      <dt>
        <span>Email:</span>
      </dt>
      <dd>
        {" "}
        <span>{email}</span>
      </dd>
      <dt>
        <span>Date of Birth:</span>
      </dt>
      <dd>
        {" "}
        <span>{birthdate}</span>
      </dd>
    </dl>
  );
};
