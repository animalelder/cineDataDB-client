export const UserInfo = ({ email, name, birthdate }) => {
  return (
    <dl>
      <dt>
        <h2>Username:</h2>
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
        <h2>Date of Birth:</h2>
      </dt>
      <dd>
        {" "}
        <span>{birthdate}</span>
      </dd>
    </dl>
  );
};
