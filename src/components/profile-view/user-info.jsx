export const UserInfo = ({ email, name, birthdate }) => {
  return (
    <dl className="text-dark">
      <dt>
        <span>Username:</span>
      </dt>
      <dd>
        <span className="text-dark">{name}</span>
      </dd>
      <dt>
        <span>Email:</span>
      </dt>
      <dd>
        {" "}
        <span className="text-dark">{email}</span>
      </dd>
      <dt>
        <span>Date of Birth:</span>
      </dt>
      <dd>
        {" "}
        <span className="text-dark">{birthdate}</span>
      </dd>
    </dl>
  );
};
