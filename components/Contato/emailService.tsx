import emailjs from "@emailjs/browser";

export interface ContactFormData {
  nome: string;
  email: string;
  nomeEmpresa: string;
  mensagem: string;
}

export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("EmailJS: Variáveis de ambiente não configuradas.");
    throw new Error("Configuração do serviço de e-mail ausente.");
  }

  const templateParams = {
    from_name: data.nome,
    from_email: data.email,
    company_name: data.nomeEmpresa,
    message: data.mensagem,
    to_email: "zenite.estoque@gmail.com",
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail via EmailJS:", error);
    throw error;
  }
};