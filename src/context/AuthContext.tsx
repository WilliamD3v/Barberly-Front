"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "@/lib/axios";
import { parseCookies, setCookie } from "nookies";
import { signInData, User } from "@/types/users";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  user: User | null;
  signIn: (data: signInData) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  const getDataPrivateProfile = async () => {
    try {
      const { "nextauth.token": tokenParse } = parseCookies();
      if (!tokenParse) {
        console.warn("Token não encontrado no cookie. Dados públicos podem ser acessados.");
        return null; // Ou pode retornar um valor padrão se preferir
      }
      const { data } = await axios.get("user/users", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${tokenParse}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Erro ao obter dados do perfil privado:", error);
      return null; // Ou um valor padrão, dependendo da sua lógica
    }
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getDataPrivateProfile();
        if (data) {
          setUserData(data);
        } else {
          // Lidar com o caso quando não há token ou dados
          console.log("Dados não encontrados ou sem autenticação.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
  
    fetchUserData();
  }, []);  

  async function signIn({ email, password }: signInData) {
    try {
      const response = await axios.post("user/login", { email, password });
      const { token } = response.data;

      // Salvar o token no cookie
      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 1, // 1 hora
        path: "/",
      });

      if (token) {
        const profileData = await getDataPrivateProfile();
        setUserData(profileData);

        // Salvar o userId no cookie
        const userId = profileData?.data._id;
        if (userId) {
          setCookie(undefined, "nextauth.userId", userId, {
            maxAge: 60 * 60 * 1, // 1 hora
            path: "/",
          });
        }

        const dashboardPath = `/dashboard/${userId}`;
        router.push(dashboardPath);
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user: userData, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
