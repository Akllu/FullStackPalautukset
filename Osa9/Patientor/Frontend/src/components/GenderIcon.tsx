import { TbGenderMale, TbGenderFemale, TbGenderNeutrois } from "react-icons/tb";
import { Gender } from "../types";

const GenderIcon = ({ gender }: { gender: Gender}) => {
  switch(gender) {
    case Gender.Male:
      return <TbGenderMale />;
    case Gender.Female:
      return <TbGenderFemale />;      
    default:
      return <TbGenderNeutrois />;
  }
};

export default GenderIcon;