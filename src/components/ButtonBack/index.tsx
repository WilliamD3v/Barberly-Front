import { useRouter } from "next/navigation";

import { MdArrowBack } from "react-icons/md";
import { ContainerButtonBack, ButtonBackStyled } from "./styled";

interface ButtonBackProps {
  url: string;
  disabledStatus?: boolean
}

export default function ButtonBack({ url, disabledStatus }: ButtonBackProps) {
  const router = useRouter();

  const handleButtonBack = () => {
    router.push(url);
  };

  return (
    <ContainerButtonBack>
      <ButtonBackStyled onClick={handleButtonBack} disabled={disabledStatus}>
        <MdArrowBack />
      </ButtonBackStyled>
    </ContainerButtonBack>
  );
}
