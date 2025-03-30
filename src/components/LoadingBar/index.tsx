import { StyledLoadingBar } from "./styled";

interface progressProps {
  progress: number;
}

export const LoadingBar = ({ progress }: progressProps) => {
  return <StyledLoadingBar progress={progress} />;
};
