export const UserInfo = ({ email, name, birthdate }) => {
  return (
    <dl>
      <dt>
        <h2>Username:</h2>
      </dt>
      <dd>
        <h4>{name}</h4>
      </dd>
      <dt>
        <h2>Email:</h2>
      </dt>
      <dd>
        {" "}
        <h4>{email}</h4>
      </dd>
      <dt>
        <h2>Date of Birth:</h2>
      </dt>
      <dd>
        {" "}
        <h4>{birthdate}</h4>
      </dd>
    </dl>
  );
};
