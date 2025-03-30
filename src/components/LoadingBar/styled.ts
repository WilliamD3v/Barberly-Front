import styled from "styled-components";

interface ProgressProps {
  progress: number;
}

export const StyledLoadingBar = styled.div<ProgressProps>`
  position: relative;
  bottom: 25px;
  height: 4px;
  border-radius: 10px;
  background-color: #5BBE5B;
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease-in-out;
`;