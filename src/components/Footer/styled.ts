// styled.ts
import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #262A2F;
  color: #fff;
  padding: 2rem 1rem 1rem;
`;

export const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Brand = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  font-size: 0.85rem;
  line-height: 1.4;
  max-width: 250px;
  color: #ccc;
`;

export const Section = styled.div`
  flex: 1;
  min-width: 180px;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 0.4rem;

    a {
      font-size: 0.85rem;
      color: #ccc;
      text-decoration: none;

      &:hover {
        color: #fff;
      }
    }
  }
`;

export const ContactItem = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #ccc;

  svg {
    font-size: 1rem;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;

  a {
    color: #ccc;
    font-size: 1.1rem;

    &:hover {
      color: #fff;
    }
  }
`;

export const Copyright = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: #999;
`;
