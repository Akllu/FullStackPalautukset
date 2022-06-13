import { TbGenderMale, TbGenderFemale, TbGenderNeutrois } from "react-icons/tb";
import { assertNever } from "../helpers";
import { Gender } from "../types";

const GenderIcon = ({ gender }: { gender: Gender}) => {
  switch(gender) {
    case Gender.Male:
      return <TbGenderMale />;
    case Gender.Female:
      return <TbGenderFemale />;      
    case Gender.Other:
      return <TbGenderNeutrois />;
    default:
      return assertNever(gender);
  }
};

export default GenderIcon;