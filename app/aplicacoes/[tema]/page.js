import { notFound } from "next/navigation";
import { DamaDetail, ToolDetail } from "@/components/ApplicationTopicContent";
import DetailPage from "@/components/DetailPage";
import { applicationTopics, findApplicationTopic } from "@/data/applications";
import { pageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return applicationTopics.map(({ slug }) => ({ tema: slug }));
}

export async function generateMetadata({ params }) {
  const topic = findApplicationTopic((await params).tema);
  if (!topic) notFound();
  return pageMetadata(topic.title, topic.description, `/aplicacoes/${topic.slug}`);
}

export default async function ApplicationDetailPage({ params }) {
  const topic = findApplicationTopic((await params).tema);
  if (!topic) notFound();
  return (
    <DetailPage title={topic.title} intro={topic.description} backHref="/aplicacoes" backLabel="Voltar a Aplicações de IA">
      {topic.slug === "dama-universe" ? <DamaDetail /> : <ToolDetail />}
    </DetailPage>
  );
}
