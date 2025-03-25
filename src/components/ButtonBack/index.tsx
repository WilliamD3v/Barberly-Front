import { useRouter } from "next/navigation";

import { MdArrowBack } from "react-icons/md";
import { ContainerButtonBack, ButtonBackStyled } from "./styled";

interface ButtonBackProps {
  url: string;
}

export default function ButtonBack({ url }: ButtonBackProps) {
  const router = useRouter();

  const handleButtonBack = () => {
    router.push(url);
  };

  return (
    <ContainerButtonBack>
      <ButtonBackStyled onClick={handleButtonBack}>
        <MdArrowBack />
      </ButtonBackStyled>
    </ContainerButtonBack>
  );
}
