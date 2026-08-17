import { siteContent } from "@focar/content";
import { Container, Section, Stack } from "@focar/ui";
import Link from "next/link";

import { createPageMetadata } from "@/lib/page-metadata";
import { getContactFormConfiguration } from "@/lib/site-readiness";

import styles from "./contact.module.css";
import { ContactForm } from "./contact-form";

export const metadata = createPageMetadata({
  description: siteContent.contact.seo.description,
  path: "/contato",
  title: siteContent.contact.seo.title,
});

export default function ContactPage() {
  const { contact } = siteContent;
  const configuration = getContactFormConfiguration();
  const trustPoints = [
    "Leitura estratégica antes de qualquer proposta.",
    "Resposta com contexto, não mensagem automática.",
    "Indicação honesta mesmo quando a Focar não for o melhor caminho.",
  ];
  const contactChannels = [
    ...(contact.whatsapp.enabled && contact.whatsapp.href
      ? [{
          description: "Canal direto para conversas iniciais, alinhamentos rápidos e dúvidas comerciais.",
          href: contact.whatsapp.href,
          label: "WhatsApp",
          value: "+55 51 98247-0671",
        }]
      : []),
    {
      description: "Canal institucional principal para atendimento, privacidade e retorno da equipe.",
      href: "mailto:contato@focarforadacaixa.com.br",
      label: "E-mail institucional",
      value: "contato@focarforadacaixa.com.br",
    },
    {
      description: "Canal direto para alinhamentos comerciais e leitura inicial dos diagnósticos.",
      href: "mailto:amanda@focarforadacaixa.com.br",
      label: "Comercial",
      value: "amanda@focarforadacaixa.com.br",
    },
    {
      description: "Canal direto para operação, suporte e continuidade do atendimento.",
      href: "mailto:rick@focarforadacaixa.com.br",
      label: "Operação",
      value: "rick@focarforadacaixa.com.br",
    },
    {
      description: "Canal público para acompanhar bastidores, presença e conteúdo da Focar.",
      href: "https://instagram.com/focarforadacaixa",
      label: "Instagram",
      value: "@focarforadacaixa",
    },
  ];

  return (
    <main>
      <Section aria-labelledby="contact-title" className={styles.hero} spacing="large">
        <Container>
          <div className={styles.heroLayout}>
            <Stack data-reveal="2" gap="medium">
              <p className={styles.eyebrow}>{contact.hero.eyebrow}</p>
              <h1 className={styles.title} id="contact-title">{contact.hero.title}</h1>
              <p className={styles.description}>{contact.hero.description}</p>

              <ul className={styles.trustList}>
                {trustPoints.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className={styles.heroActions}>
                <a className={styles.primaryAnchor} href="#formulario-diagnostico">
                  Preencher diagnóstico
                </a>
                <Link className={styles.secondaryAnchor} href="/metodo">
                  Entender o método primeiro
                </Link>
              </div>
            </Stack>

            <aside className={styles.status} data-reveal="4">
              <div className={styles.statusHead}>
                <p className={styles.statusEyebrow}>
                  {configuration.enabled
                    ? "Como funciona"
                    : contact.unavailable.eyebrow}
                </p>
                <span className={styles.statusPill}>
                  {configuration.enabled ? "Canal ativo" : "Ativação pendente"}
                </span>
              </div>

              <h2>
                {configuration.enabled
                  ? contact.expectation.title
                  : contact.unavailable.title}
              </h2>

              <p>
                {configuration.enabled
                  ? "O envio é protegido, os dados são lidos com contexto e a equipe usa a solicitação apenas para analisar e responder ao próximo passo adequado."
                  : contact.unavailable.description}
              </p>

              {configuration.enabled ? (
                <ol className={styles.statusTimeline}>
                  {contact.expectation.items.slice(0, 3).map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              ) : null}
            </aside>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="form-title">
        <Container size="content">
          <div className={styles.formLayout}>
            <div className={styles.formIntro}>
              <p className={styles.eyebrow}>Solicitação</p>
              <h2 id="form-title">{contact.form.title}</h2>
              <p className={styles.formLead}>
                Quanto melhor o contexto, melhor a leitura inicial da Focar.
                Não precisa escrever bonito. Precisa escrever o que é real.
              </p>
              {!configuration.enabled ? (
                <p className={styles.configurationNotice}>
                  O formulário já está preparado. Falta apenas a configuração
                  final do envio e da proteção anti-spam em produção para
                  liberar este canal.
                </p>
              ) : null}
            </div>
            <div className={styles.formShell} id="formulario-diagnostico">
              <div className={styles.formShellHeader}>
                <p>Diagnóstico inicial</p>
                <span>
                  {configuration.enabled
                    ? "Resposta com leitura estratégica"
                    : "Aguardando ativação final"}
                </span>
              </div>
              <ContactForm
                content={contact.form}
                enabled={configuration.enabled}
                siteKey={configuration.siteKey}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="expectation-title" tone="subtle">
        <Container size="content">
          <div className={styles.expectation}>
            <h2 id="expectation-title">{contact.expectation.title}</h2>
            <ol>
              {contact.expectation.items.map((item, index) => (
                <li data-reveal-on-scroll key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="channels-title">
        <Container size="content">
          <div className={styles.channels}>
            <div className={styles.channelsIntro}>
              <p className={styles.eyebrow}>Canais institucionais</p>
              <h2 id="channels-title">Se preferir, comece por um canal mais direto.</h2>
              <p className={styles.channelsLead}>
                O diagnóstico continua sendo o melhor ponto de partida, mas os
                canais abaixo ajudam quando a empresa ainda precisa entender o
                processo ou falar com a equipe antes.
              </p>
            </div>

            <ul className={styles.channelsList}>
              {contactChannels.map((channel, index) => (
                <li key={channel.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p>{channel.label}</p>
                    <a href={channel.href}>{channel.value}</a>
                    <small>{channel.description}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </main>
  );
}
