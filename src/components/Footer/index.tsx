import { Link, MapPin, Phone, Mail } from "lucide-react";
import {
  FooterContainer,
  FooterContent,
  Brand,
  Description,
  SectionTitle,
  LinkList,
  ContactItem,
  SocialIcons,
  Copyright,
  Section,
} from "./styled";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Section>
          <Brand>Barbearia Premium</Brand>
          <Description>
            Transformando estilo em experiência. Profissionais prontos para
            valorizar sua imagem.
          </Description>
        </Section>

        <Section>
          <SectionTitle>Links Rápidos</SectionTitle>
          <LinkList>
            <li>
              <Link href="/">
                <a>Início</a>
              </Link>
            </li>
            <li>
              <Link href="/servicos">
                <a>Serviços</a>
              </Link>
            </li>
            <li>
              <Link href="/contato">
                <a>Contato</a>
              </Link>
            </li>
            <li>
              <Link href="/agendamentos">
                <a>Agendar Horário</a>
              </Link>
            </li>
          </LinkList>
        </Section>

        <Section>
          <SectionTitle>Contato</SectionTitle>
          <ContactItem>
            <MapPin size={18} /> Rua dos Barbeiros, 123 - Centro
          </ContactItem>
          <ContactItem>
            <Phone size={18} /> (11) 91234-5678
          </ContactItem>
          <ContactItem>
            <Mail size={18} /> contato@barbeariapremium.com
          </ContactItem>
          <SocialIcons>
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/5511912345678"
              target="_blank"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </SocialIcons>
        </Section>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} Barbearia Premium. Todos os direitos
        reservados.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
