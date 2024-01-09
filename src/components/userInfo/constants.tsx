import { TbGenderBigender } from "react-icons/tb";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";

import { UserDataList } from "@/types/User";

const GENERAL_INFORMATION_LIST: UserDataList = [
  {
    key: "phone",
    label: "Phone",
    icon: <LuPhone size="0.9em" />,
    color: "#FEB2B2",
  },
  {
    key: "email",
    label: "Email",
    icon: <MdOutlineEmail size="0.9em" />,
    color: "#FEB2B2",
  },
  {
    key: "dateOfBirth",
    label: "Birthday",
    icon: <LiaBirthdayCakeSolid size="0.9em" />,
    type: "date",
  },
  {
    key: "gender",
    label: "Gender",
    icon: <TbGenderBigender size="0.9em" />,
  },
];

const LOCATION_INFORMATION_LIST: UserDataList = [
  { key: "location.street", label: "Street" },
  { key: "location.city", label: "City" },
  { key: "location.state", label: "State" },
  { key: "location.country", label: "Country" },
];

export { GENERAL_INFORMATION_LIST, LOCATION_INFORMATION_LIST };
