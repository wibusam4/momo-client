import React from "react";
interface UserProp {
  label: string;
  value: any;
}
const InforUser: React.FC<UserProp> = ({ label, value }) => {
  return (
    <div className={`mt-2`}>
      <label htmlFor="">{label}</label>
      <input
        type="text"
        value={value}
        disabled
        className="mt-1 w-full rounded bg-info bg-opacity-30 p-2"
      />
    </div>
  );
};

export default InforUser;
